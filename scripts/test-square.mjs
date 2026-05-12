/**
 * Test Square API connections for both stores.
 * Run from the project root:
 *   node scripts/test-square.mjs
 *
 * Requires .env.local to be present.
 */

import { readFileSync } from "fs"
import { resolve } from "path"

// Load .env.local manually
try {
  const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf8")
  for (const line of env.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const [key, ...rest] = trimmed.split("=")
    process.env[key.trim()] = rest.join("=").trim()
  }
  console.log("✓ Loaded .env.local\n")
} catch {
  console.error("✗ Could not load .env.local — make sure it exists\n")
  process.exit(1)
}

const SQUARE_API_BASE = "https://connect.squareup.com/v2"

const STORES = {
  "Brows & Lashes (UES)": {
    token: process.env.SQUARE_UES_ACCESS_TOKEN,
    locationId: process.env.SQUARE_UES_LOCATION_ID,
  },
  "Eyebrow Shape (Ridgewood)": {
    token: process.env.SQUARE_RIDGEWOOD_ACCESS_TOKEN,
    locationId: process.env.SQUARE_RIDGEWOOD_LOCATION_ID,
  },
}

async function testStore(name, { token, locationId }) {
  console.log(`── ${name} ──────────────────────────`)
  console.log(`   Token:      ${token?.slice(0, 12)}...`)
  console.log(`   LocationId: ${locationId}`)

  // 1. Test locations endpoint
  const locRes = await fetch(`${SQUARE_API_BASE}/locations/${locationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Square-Version": "2024-06-04",
    },
  })
  if (!locRes.ok) {
    console.log(`   ✗ Locations: ${locRes.status} ${locRes.statusText}`)
    const body = await locRes.text()
    console.log(`     ${body.slice(0, 200)}`)
    return
  }
  const locData = await locRes.json()
  const loc = locData.location
  console.log(`   ✓ Location: "${loc?.name}" (${loc?.address?.address_line_1 ?? "no address"})`)

  // 2. Fetch catalog items
  const catRes = await fetch(
    `${SQUARE_API_BASE}/catalog/list?types=ITEM&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": "2024-06-04",
      },
    }
  )
  if (!catRes.ok) {
    console.log(`   ✗ Catalog: ${catRes.status} ${catRes.statusText}`)
    return
  }
  const catData = await catRes.json()
  const items = catData.objects ?? []
  console.log(`   ✓ Catalog: ${items.length} items returned (limit 10)`)
  for (const item of items.slice(0, 5)) {
    const vars = item.item_data?.variations ?? []
    const price = vars[0]?.item_variation_data?.price_money
    const priceStr = price
      ? `$${(price.amount / 100).toFixed(0)}`
      : "no price"
    console.log(`     • ${item.item_data?.name ?? "?"} — ${priceStr}`)
  }

  // 3. Check for subscription plans + variations (newer Square uses variations for pricing)
  const planRes = await fetch(
    `${SQUARE_API_BASE}/catalog/list?types=SUBSCRIPTION_PLAN,SUBSCRIPTION_PLAN_VARIATION&limit=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": "2024-06-04",
      },
    }
  )
  if (planRes.ok) {
    const planData = await planRes.json()
    const allObjs = planData.objects ?? []
    const plans = allObjs.filter(o => o.type === "SUBSCRIPTION_PLAN")
    const variations = allObjs.filter(o => o.type === "SUBSCRIPTION_PLAN_VARIATION")

    if (plans.length > 0) {
      console.log(`   ✓ Subscription plans: ${plans.length} found, ${variations.length} variation(s)`)

      // Build variation lookup by parent plan ID
      const varByPlan = {}
      for (const v of variations) {
        const pid = v.subscription_plan_variation_data?.subscription_plan_id
        if (pid) { varByPlan[pid] = varByPlan[pid] ?? []; varByPlan[pid].push(v) }
      }

      for (const p of plans) {
        const planName = p.subscription_plan_data?.name ?? "?"
        const vars = varByPlan[p.id] ?? []

        if (vars.length > 0) {
          // New format: price lives in variations
          for (const v of vars) {
            const phase = v.subscription_plan_variation_data?.phases?.[0]
            const price =
              phase?.pricing?.price_money ??
              phase?.pricing?.price ??
              phase?.recurring_price_money
            const priceStr = price ? `$${(price.amount / 100).toFixed(0)}/mo` : "⚠ no price"
            const varName = v.subscription_plan_variation_data?.name
            console.log(`     • ${planName}${varName ? ` (${varName})` : ""} — ${priceStr}`)
          }
        } else {
          // Old format: price in plan phases
          const phase = p.subscription_plan_data?.phases?.[0]
          const price = phase?.recurring_price_money
          const priceStr = price ? `$${(price.amount / 100).toFixed(0)}/mo` : "⚠ no price"
          console.log(`     • ${planName} — ${priceStr}`)
        }
      }
    } else {
      console.log(`   ℹ  No subscription plans set up yet in Square`)
    }
  }

  console.log()
}

console.log("Testing Square API connections...\n")
for (const [name, config] of Object.entries(STORES)) {
  await testStore(name, config)
}
console.log("Done.")
