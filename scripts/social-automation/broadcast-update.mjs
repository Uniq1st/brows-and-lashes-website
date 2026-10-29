// ─── Broadcast a New Service Everywhere ─────────────────────────────────────
// One command to add a new service to Square, list it on Google Business
// Profile, and post about it on Instagram + Facebook.
//
// Usage:
//   node broadcast-update.mjs --store=ues --name="Nose Polishing" --price=25 \
//     --duration=20 --category="Facials & More" \
//     --description="Deep-cleansing nose treatment that gently clears blackheads." \
//     [--confirm]
//
// Without --confirm, every step runs in dry-run / preview mode — nothing is
// written to Square, Google, Instagram, or Facebook. Always do a dry run
// first, read the output, then re-run with --confirm once it looks right.

import { createSquareService } from "./update-square-catalog.mjs"
import { addServicesToGoogleBusiness } from "./update-google-services.mjs"
import { postToInstagram } from "./post-instagram.mjs"
import { postToFacebook } from "./post-facebook.mjs"
import { postToGoogleBusiness } from "./post-google-business.mjs"
import { createPostImage } from "./create-image.mjs"
import { generateCaption } from "./generate-caption.mjs"
import { STORES } from "./config.mjs"

function parseArgs() {
  const args = {}
  for (const arg of process.argv.slice(2)) {
    if (arg === "--confirm") {
      args.confirm = true
      continue
    }
    const match = arg.match(/^--([\w-]+)=(.*)$/)
    if (match) args[match[1]] = match[2]
  }
  return args
}

async function main() {
  const args = parseArgs()
  const { store: storeId, name, price, duration, category, description, confirm } = args

  if (!storeId || !name || !price) {
    console.error(
      'Usage: node broadcast-update.mjs --store=ues --name="Nose Polishing" --price=25 ' +
      '[--duration=20] [--category="Facials & More"] [--description="..."] [--confirm]'
    )
    process.exit(1)
  }

  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}. Use "ues" or "ridgewood".`)

  const priceCents = Math.round(parseFloat(price) * 100)
  const durationMinutes = duration ? parseInt(duration, 10) : 30
  const desc = description || `New service now available at ${store.name}.`

  console.log("═".repeat(60))
  console.log(`📣 Broadcasting new service: "${name}" — $${price} — ${store.name}`)
  console.log(
    confirm
      ? "   MODE: LIVE — this will write real changes everywhere"
      : "   MODE: DRY RUN — preview only, nothing will be written"
  )
  console.log("═".repeat(60))

  const results = {}

  // 1) Square — the system of record for bookings/pricing
  try {
    results.square = await createSquareService(
      storeId,
      { name, description: desc, priceCents, durationMinutes, categoryName: category },
      { confirm }
    )
  } catch (err) {
    console.error(`❌ Square step failed: ${err.message}`)
    results.square = { error: err.message }
  }

  // 2) Google Business Profile services list
  try {
    results.googleServices = await addServicesToGoogleBusiness(storeId, [name], { confirm })
  } catch (err) {
    console.error(`❌ Google Business services step failed: ${err.message}`)
    results.googleServices = { error: err.message }
  }

  // 3) Generate a caption for the social posts (falls back to a simple
  //    template if the Claude API is unavailable — see generate-caption.mjs)
  let caption
  try {
    const theme = {
      theme: "new_service_launch",
      focus: `announcing our new service, ${name}: ${desc}`,
      service: name,
    }
    const generated = await generateCaption(storeId, { theme })
    caption = generated.caption
  } catch (err) {
    console.warn(`⚠️  Caption generation failed, using a simple fallback: ${err.message}`)
    caption = `✨ New at ${store.name}: ${name}! ${desc}\n\nBook at ${store.bookingUrl}`
  }

  console.log("\n📝 Caption:\n" + "─".repeat(40) + `\n${caption}\n` + "─".repeat(40))

  if (!confirm) {
    console.log("\n🔍 DRY RUN — skipping image creation and social posts.")
    console.log("Re-run with --confirm to write everything live once this looks right.")
    console.log("\nResult summary:", JSON.stringify(results, null, 2))
    return
  }

  // 4) Branded image (shared across Instagram + Facebook + the GBP post)
  let imagePath
  let imageUrl
  try {
    imagePath = await createPostImage(storeId, caption)
  } catch (err) {
    console.warn(`⚠️  Image creation failed, continuing without an image: ${err.message}`)
  }

  // 5) Instagram
  if (imagePath) {
    try {
      const ig = await postToInstagram(storeId, imagePath, caption)
      results.instagram = ig
      imageUrl = ig.imageUrl
    } catch (err) {
      console.error(`❌ Instagram step failed: ${err.message}`)
      results.instagram = { error: err.message }
    }
  } else {
    console.log("Skipping Instagram (no image).")
  }

  // 6) Facebook
  if (imageUrl) {
    try {
      results.facebook = await postToFacebook(storeId, imageUrl, caption)
    } catch (err) {
      console.error(`❌ Facebook step failed: ${err.message}`)
      results.facebook = { error: err.message }
    }
  } else {
    console.log("Skipping Facebook (no image URL).")
  }

  // 7) Google Business "What's New" post
  try {
    const gbpCaption = caption.split("#")[0].trim()
    await postToGoogleBusiness(storeId, gbpCaption, imageUrl || null)
    results.googlePost = { posted: true }
  } catch (err) {
    console.error(`❌ Google Business post step failed: ${err.message}`)
    results.googlePost = { error: err.message }
  }

  console.log("\n" + "═".repeat(60))
  console.log("📊 Final summary:")
  console.log(JSON.stringify(results, null, 2))
  console.log("═".repeat(60))
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
