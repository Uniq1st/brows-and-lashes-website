// ─── Connection Tester — run this first to check all credentials ───────────────
// Usage: node test-connection.mjs
// Shows exactly what's configured and what's missing.

import { STORES } from "./config.mjs"

function checkEnv(key) {
  const val = process.env[key]
  if (!val || val === "undefined") return { ok: false, hint: "Not set" }
  if (val === "#" || val === "YOUR_VALUE_HERE") return { ok: false, hint: "Still a placeholder" }
  return { ok: true, hint: `Set (${val.slice(0, 8)}...)` }
}

console.log("\n🔍 UniqSwek Social Automation — Environment Check")
console.log("═".repeat(55))

const checks = [
  // Content generation
  { group: "Content Generation", key: "ANTHROPIC_API_KEY", note: "console.anthropic.com → API Keys" },

  // Image hosting
  { group: "Image Hosting", key: "CLOUDINARY_CLOUD_NAME", note: "cloudinary.com → Dashboard" },
  { group: "Image Hosting", key: "CLOUDINARY_API_KEY", note: "cloudinary.com → Dashboard" },
  { group: "Image Hosting", key: "CLOUDINARY_API_SECRET", note: "cloudinary.com → Dashboard" },

  // Instagram — UES
  { group: "Instagram (UES)", key: "META_UES_IG_USER_ID", note: "See README Step 2" },
  { group: "Instagram (UES)", key: "META_UES_ACCESS_TOKEN", note: "See README Step 2" },

  // Instagram — Ridgewood
  { group: "Instagram (Ridgewood)", key: "META_RIDGEWOOD_IG_USER_ID", note: "See README Step 2" },
  { group: "Instagram (Ridgewood)", key: "META_RIDGEWOOD_ACCESS_TOKEN", note: "See README Step 2" },

  // Google Business
  { group: "Google Business", key: "GOOGLE_SERVICE_ACCOUNT_JSON", note: "See README Step 3" },
  { group: "Google Business", key: "GOOGLE_UES_LOCATION_NAME", note: "accounts/xxx/locations/yyy" },
  { group: "Google Business", key: "GOOGLE_RIDGEWOOD_LOCATION_NAME", note: "accounts/xxx/locations/yyy" },
]

let allGood = true
let currentGroup = ""

for (const check of checks) {
  if (check.group !== currentGroup) {
    console.log(`\n  ${check.group}`)
    currentGroup = check.group
  }
  const { ok, hint } = checkEnv(check.key)
  const icon = ok ? "✅" : "❌"
  if (!ok) allGood = false
  console.log(`    ${icon}  ${check.key.padEnd(38)} ${hint}`)
  if (!ok) console.log(`         → Get it from: ${check.note}`)
}

console.log("\n" + "─".repeat(55))
if (allGood) {
  console.log("✅ All credentials configured! Run: node run-daily.mjs both")
} else {
  console.log("⚠️  Some credentials missing — see setup guide in README.md")
  console.log("   Run this check again after adding them to your .env file.")
}
console.log("")
