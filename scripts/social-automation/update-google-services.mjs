// ─── Google Business Profile — Services Manager ────────────────────────────────
// Adds services to the "Services" list shown on your Google Business Profile.
// Reuses the same GOOGLE_SERVICE_ACCOUNT_JSON already set up for posts.
//
// IMPORTANT: Google's API replaces the ENTIRE serviceItems list on write, so
// this always reads the current list first and merges new services into it —
// it never overwrites what's already there. It also defaults to a dry run
// (prints what would change, writes nothing) unless { confirm: true } /
// --confirm is explicitly passed, since this edits a live public listing.
//
// This is the newest capability in this toolkit and hasn't been exercised
// against a live Business Profile yet — do a dry run first, read the output,
// then run with --confirm.

import { google } from "googleapis"
import { STORES } from "./config.mjs"

const SCOPES = ["https://www.googleapis.com/auth/business.manage"]
const API_BASE = "https://mybusinessbusinessinformation.googleapis.com/v1"

async function getGoogleClient() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!serviceAccountJson) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON secret is missing.\n" +
      "See setup guide in scripts/social-automation/README.md"
    )
  }
  const credentials = JSON.parse(serviceAccountJson)
  const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES })
  return auth.getClient()
}

async function googleFetch(client, path, options = {}) {
  const token = (await client.getAccessToken()).token
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  })
  const data = await res.json()
  if (data.error) {
    throw new Error(`Google Business Information API error: ${JSON.stringify(data.error)}`)
  }
  return data
}

/** Fetches the location's current serviceItems and its primary category ID. */
async function getCurrentServices(client, locationName) {
  const data = await googleFetch(client, `/${locationName}?readMask=serviceItems,categories`)
  return {
    serviceItems: data.serviceItems ?? [],
    primaryCategoryId: data.categories?.primaryCategory?.name ?? null,
  }
}

/**
 * Adds one or more free-form services to a location's Business Profile,
 * without removing any services already listed there.
 *
 * @param {string} storeId - "ues" | "ridgewood"
 * @param {string[]} serviceNames - e.g. ["Sugar Wax", "Hard Wax"]
 * @param {{ confirm?: boolean }} [options] - pass { confirm: true } to actually write
 */
export async function addServicesToGoogleBusiness(storeId, serviceNames, { confirm = false } = {}) {
  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}`)

  const locationName = store.googleLocationName
  if (!locationName) {
    throw new Error(
      `GOOGLE_${storeId.toUpperCase()}_LOCATION_NAME is not set.\n` +
      "Format: accounts/{account_id}/locations/{location_id}"
    )
  }

  console.log(`\n🛎️  Checking current Google Business services for ${store.name}...`)

  const client = await getGoogleClient()
  const { serviceItems, primaryCategoryId } = await getCurrentServices(client, locationName)

  if (!primaryCategoryId) {
    throw new Error(
      "Could not read a primary category for this location — free-form services " +
      "need one. Check the location has a category set at business.google.com."
    )
  }

  const existingNames = new Set(
    serviceItems.map((item) => item.freeFormServiceItem?.label?.displayName).filter(Boolean)
  )

  const toAdd = serviceNames.filter((name) => !existingNames.has(name))

  if (toAdd.length === 0) {
    console.log("✅ All requested services are already listed — nothing to add.")
    return { added: [], skipped: serviceNames }
  }

  const newItems = toAdd.map((name) => ({
    freeFormServiceItem: {
      category: primaryCategoryId,
      label: { displayName: name, languageCode: "en" },
    },
  }))

  const mergedServiceItems = [...serviceItems, ...newItems]

  console.log(`\n📋 Will add ${toAdd.length} service(s) to ${store.name}: ${toAdd.join(", ")}`)
  console.log(`   (${existingNames.size} existing service(s) left untouched)`)

  if (!confirm) {
    console.log("\n🔍 DRY RUN — nothing was written. Pass { confirm: true } / --confirm to apply.")
    return { dryRun: true, wouldAdd: toAdd, skipped: serviceNames.filter((n) => existingNames.has(n)) }
  }

  await googleFetch(client, `/${locationName}?updateMask=serviceItems`, {
    method: "PATCH",
    body: JSON.stringify({ serviceItems: mergedServiceItems }),
  })

  console.log(`✅ Added to Google Business Profile: ${toAdd.join(", ")}`)
  return { added: toAdd, skipped: serviceNames.filter((n) => existingNames.has(n)) }
}

// ─── CLI entry ──────────────────────────────────────────────────────────────
// Usage: node update-google-services.mjs ues "Sugar Wax,Hard Wax,Ear Candling" [--confirm]
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , storeId, servicesArg] = process.argv
  const confirm = process.argv.includes("--confirm")

  if (!storeId || !servicesArg) {
    console.error(
      'Usage: node update-google-services.mjs <ues|ridgewood> "Service One,Service Two" [--confirm]'
    )
    process.exit(1)
  }

  const serviceNames = servicesArg.split(",").map((s) => s.trim()).filter(Boolean)

  addServicesToGoogleBusiness(storeId, serviceNames, { confirm })
    .then((result) => console.log("\nResult:", result))
    .catch((err) => {
      console.error("❌", err.message)
      process.exit(1)
    })
}
