// ─── Square Catalog Writer ──────────────────────────────────────────────────
// Creates a new bookable service in Square's Catalog for a given store.
// Reuses the same SQUARE_UES_ACCESS_TOKEN / SQUARE_RIDGEWOOD_ACCESS_TOKEN
// already used by the website (lib/square.ts) — same accounts, write instead
// of read.
//
// This touches your REAL Square catalog, tied to real bookings and payments.
// Defaults to a dry run (prints what would be created, writes nothing) unless
// { confirm: true } / --confirm is passed. If the write fails with a
// permission error, your Square access token may only have read scopes —
// check Square Developer Dashboard → your app → OAuth scopes.

import { randomUUID } from "crypto"

const SQUARE_API_BASE = "https://connect.squareup.com/v2"

const SQUARE_STORE_CONFIG = {
  ues: { accessToken: process.env.SQUARE_UES_ACCESS_TOKEN },
  ridgewood: { accessToken: process.env.SQUARE_RIDGEWOOD_ACCESS_TOKEN },
}

async function squareFetch(storeId, path, options = {}) {
  const config = SQUARE_STORE_CONFIG[storeId]
  if (!config?.accessToken) {
    throw new Error(
      `Missing Square access token for store: ${storeId} (SQUARE_${storeId.toUpperCase()}_ACCESS_TOKEN)`
    )
  }

  const res = await fetch(`${SQUARE_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Square-Version": "2024-06-04",
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  })
  const data = await res.json()
  if (data.errors?.length) {
    throw new Error(`Square API error: ${JSON.stringify(data.errors)}`)
  }
  return data
}

async function findCategoryIdByName(storeId, categoryName) {
  const data = await squareFetch(storeId, "/catalog/list?types=CATEGORY&limit=200")
  const match = (data.objects ?? []).find(
    (obj) => obj.category_data?.name?.toLowerCase() === categoryName.toLowerCase()
  )
  return match?.id ?? null
}

/**
 * Creates a new bookable service in Square's Catalog.
 *
 * @param {string} storeId - "ues" | "ridgewood"
 * @param {object} service
 * @param {string} service.name
 * @param {string} [service.description]
 * @param {number} service.priceCents
 * @param {number} [service.durationMinutes]
 * @param {string} [service.categoryName] - matched against existing category names; created without one if not found
 * @param {{ confirm?: boolean }} [options]
 */
export async function createSquareService(storeId, service, { confirm = false } = {}) {
  const { name, description = "", priceCents, durationMinutes = 30, categoryName } = service

  if (!name || !priceCents) {
    throw new Error("createSquareService requires at least { name, priceCents }")
  }

  console.log(
    `\n🗂️  Preparing Square catalog item for ${storeId}: "${name}" — $${(priceCents / 100).toFixed(2)}`
  )

  let categoryId = null
  if (categoryName) {
    categoryId = await findCategoryIdByName(storeId, categoryName)
    if (!categoryId) {
      console.warn(`   ⚠️  Category "${categoryName}" not found in Square — creating without a category.`)
    }
  }

  if (!confirm) {
    console.log("🔍 DRY RUN — nothing was written. Pass { confirm: true } / --confirm to apply.")
    return { dryRun: true, wouldCreate: { name, priceCents, durationMinutes, categoryId } }
  }

  const body = {
    idempotency_key: randomUUID(),
    object: {
      type: "ITEM",
      id: "#new-item",
      item_data: {
        name,
        description,
        product_type: "APPOINTMENTS_SERVICE",
        ...(categoryId ? { category_id: categoryId } : {}),
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "#new-item-variation",
            item_variation_data: {
              item_id: "#new-item",
              name: "Regular",
              pricing_type: "FIXED_PRICING",
              price_money: { amount: priceCents, currency: "USD" },
              service_duration: durationMinutes * 60 * 1000,
            },
          },
        ],
      },
    },
  }

  const data = await squareFetch(storeId, "/catalog/object", {
    method: "POST",
    body: JSON.stringify(body),
  })

  console.log(`✅ Created in Square: ${data.catalog_object?.id}`)
  return { id: data.catalog_object?.id, dryRun: false }
}

// ─── CLI entry ──────────────────────────────────────────────────────────────
// Usage: node update-square-catalog.mjs ues "Nose Polishing" 2500 20 "Facials & More" --confirm
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , storeId, name, priceCentsArg, durationArg, categoryArg] = process.argv
  const confirm = process.argv.includes("--confirm")

  if (!storeId || !name || !priceCentsArg) {
    console.error(
      'Usage: node update-square-catalog.mjs <ues|ridgewood> "Service Name" <priceCents> [durationMinutes] [categoryName] [--confirm]'
    )
    process.exit(1)
  }

  createSquareService(
    storeId,
    {
      name,
      priceCents: parseInt(priceCentsArg, 10),
      durationMinutes: durationArg && durationArg !== "--confirm" ? parseInt(durationArg, 10) : 30,
      categoryName: categoryArg && categoryArg !== "--confirm" ? categoryArg : undefined,
    },
    { confirm }
  )
    .then((result) => console.log("\nResult:", result))
    .catch((err) => {
      console.error("❌", err.message)
      process.exit(1)
    })
}
