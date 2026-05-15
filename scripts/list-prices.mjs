/**
 * Dump the full service price list for both stores.
 * Run: node scripts/list-prices.mjs
 */

import { readFileSync } from "fs"
import { resolve } from "path"

try {
  const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf8")
  for (const line of env.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const [key, ...rest] = trimmed.split("=")
    process.env[key.trim()] = rest.join("=").trim()
  }
} catch { process.exit(1) }

const BASE = "https://connect.squareup.com/v2"

const STORES = {
  "Brows & Lashes (UES)": process.env.SQUARE_UES_ACCESS_TOKEN,
  "Eyebrow Shape (Ridgewood)": process.env.SQUARE_RIDGEWOOD_ACCESS_TOKEN,
}

async function fetchAll(token, path) {
  const items = []
  let cursor
  do {
    const url = `${BASE}${path}${cursor ? `&cursor=${cursor}` : ""}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, "Square-Version": "2024-06-04" },
    })
    const data = await res.json()
    items.push(...(data.objects ?? []))
    cursor = data.cursor
  } while (cursor)
  return items
}

for (const [name, token] of Object.entries(STORES)) {
  console.log(`\n${"═".repeat(55)}`)
  console.log(`  ${name}`)
  console.log("═".repeat(55))

  const items = await fetchAll(token, "/catalog/list?types=ITEM,CATEGORY&limit=200")
  const categories = {}
  for (const obj of items) {
    if (obj.type === "CATEGORY") categories[obj.id] = obj.category_data?.name ?? "Uncategorized"
  }

  // Group by category
  const byCategory = {}
  for (const obj of items) {
    if (obj.type !== "ITEM") continue
    const cat = categories[obj.item_data?.category_id] ?? "Uncategorized"
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(obj)
  }

  for (const [cat, catItems] of Object.entries(byCategory).sort()) {
    console.log(`\n  ── ${cat} ──`)
    for (const item of catItems.sort((a, b) => (a.item_data?.name ?? "").localeCompare(b.item_data?.name ?? ""))) {
      const vars = item.item_data?.variations ?? []
      for (const v of vars) {
        const price = v.item_variation_data?.price_money
        const dur = v.item_variation_data?.service_duration
        const priceStr = price ? `$${(price.amount / 100).toFixed(0)}` : "no price"
        const durStr = dur ? ` (${Math.round(dur / 60000)} min)` : ""
        const varName = v.item_variation_data?.name
        const label = varName && varName !== "Regular" && varName !== item.item_data?.name
          ? `${item.item_data?.name} — ${varName}`
          : item.item_data?.name
        console.log(`    ${priceStr.padEnd(8)} ${label}${durStr}`)
      }
    }
  }
}
console.log("\n")
