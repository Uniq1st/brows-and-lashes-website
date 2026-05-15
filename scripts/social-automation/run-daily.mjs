// ─── Daily Automation Runner ───────────────────────────────────────────────────
// Called by GitHub Actions twice per day.
// Usage: node run-daily.mjs [ues|ridgewood|both]
//
// What it does:
// 1. Generates a caption with Claude
// 2. Picks a random photo and adds brand overlay
// 3. Posts to Instagram
// 4. Posts to Google Business Profile
// 5. Logs a summary

import { generateCaption } from "./generate-caption.mjs"
import { createPostImage } from "./create-image.mjs"
import { postToInstagram } from "./post-instagram.mjs"
import { postToGoogleBusiness } from "./post-google-business.mjs"
import { STORES } from "./config.mjs"

const DRY_RUN = process.env.DRY_RUN === "true" // Set to true to preview without posting

async function runForStore(storeId) {
  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}`)

  console.log("\n" + "═".repeat(60))
  console.log(`🌸 UniqSwek Social Automation — ${store.name}`)
  console.log(`   ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET`)
  console.log("═".repeat(60))

  const results = { storeId, store: store.name, success: false, errors: [] }

  try {
    // Step 1: Generate caption
    console.log("\n[1/4] Generating caption...")
    const { caption, service, theme } = await generateCaption(storeId)
    results.caption = caption
    results.theme = theme
    results.service = service

    if (DRY_RUN) {
      console.log("\n🔍 DRY RUN — Caption preview:")
      console.log("─".repeat(40))
      console.log(caption)
      console.log("─".repeat(40))
      console.log("(Set DRY_RUN=false to actually post)")
      return results
    }

    // Step 2: Create branded image
    console.log("\n[2/4] Creating branded image...")
    let imagePath = null
    try {
      imagePath = await createPostImage(storeId, caption)
    } catch (imgError) {
      console.warn(`⚠️  Image creation failed: ${imgError.message}`)
      console.warn("   Continuing without image (caption only for GBP)...")
      results.errors.push(`Image: ${imgError.message}`)
    }

    // Step 3: Post to Instagram
    if (imagePath) {
      console.log("\n[3/4] Posting to Instagram...")
      try {
        const igResult = await postToInstagram(storeId, imagePath, caption)
        results.instagramPostId = igResult.postId
        results.imageUrl = igResult.imageUrl
      } catch (igError) {
        console.error(`❌ Instagram failed: ${igError.message}`)
        results.errors.push(`Instagram: ${igError.message}`)
      }
    } else {
      console.log("\n[3/4] Skipping Instagram (no image)")
    }

    // Step 4: Post to Google Business
    console.log("\n[4/4] Posting to Google Business Profile...")
    try {
      // Strip hashtags from Google post (they don't index well on Google)
      const gbpCaption = caption.split("#")[0].trim()
      await postToGoogleBusiness(storeId, gbpCaption, results.imageUrl || null)
      results.googlePosted = true
    } catch (gbpError) {
      console.error(`❌ Google Business failed: ${gbpError.message}`)
      results.errors.push(`Google Business: ${gbpError.message}`)
    }

    results.success = results.errors.length === 0

  } catch (error) {
    console.error(`\n❌ Fatal error for ${storeId}: ${error.message}`)
    results.errors.push(error.message)
  }

  // Summary
  console.log("\n" + "─".repeat(60))
  console.log(`📊 Summary for ${store.name}:`)
  console.log(`   Instagram: ${results.instagramPostId ? "✅ Posted" : "❌ Failed"}`)
  console.log(`   Google Business: ${results.googlePosted ? "✅ Posted" : "❌ Failed"}`)
  if (results.errors.length > 0) {
    console.log(`   Errors: ${results.errors.join(" | ")}`)
  }
  console.log("─".repeat(60))

  return results
}

// ─── Main entry ───────────────────────────────────────────────────────────────
const target = process.argv[2] || "both"

const storeIds =
  target === "both" ? ["ues", "ridgewood"]
  : target === "ues" ? ["ues"]
  : target === "ridgewood" ? ["ridgewood"]
  : [target]

const allResults = []

for (const storeId of storeIds) {
  try {
    const result = await runForStore(storeId)
    allResults.push(result)
    // Wait 10 seconds between stores to avoid rate limits
    if (storeIds.indexOf(storeId) < storeIds.length - 1) {
      await new Promise((r) => setTimeout(r, 10000))
    }
  } catch (error) {
    console.error(`Failed for ${storeId}:`, error.message)
  }
}

console.log("\n✨ Done! Check Instagram and Google Business Profile.")

// Exit with error code if all posts failed (for GitHub Actions to flag)
const allFailed = allResults.every((r) => !r.success)
if (allFailed && !DRY_RUN) process.exit(1)
