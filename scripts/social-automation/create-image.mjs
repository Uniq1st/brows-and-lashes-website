// ─── Image Creator — adds brand overlay to your photos ────────────────────────
// Uses Sharp (image processing) to overlay your brand onto real photos.
// Drop photos into: content/photos/ues/ or content/photos/ridgewood/
// Supported formats: .jpg .jpeg .png .webp

import sharp from "sharp"
import { readdir } from "fs/promises"
import { existsSync, mkdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { BRAND_OVERLAY, STORES } from "./config.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "../..")

/**
 * Get a random photo from the content/photos/{storeId}/ folder
 */
async function getRandomPhoto(storeId) {
  const dir = path.join(ROOT, "content", "photos", storeId)

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
    throw new Error(
      `No photos folder found. Created: ${dir}\n` +
      `→ Add your before/after photos there (JPG, PNG, or WEBP).`
    )
  }

  const files = (await readdir(dir)).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  )

  if (files.length === 0) {
    throw new Error(
      `No photos found in content/photos/${storeId}/\n` +
      `→ Drop some before/after or service photos in that folder.`
    )
  }

  // Pick a random photo
  const file = files[Math.floor(Math.random() * files.length)]
  return path.join(dir, file)
}

/**
 * Build the SVG overlay with brand text
 */
function buildOverlaySvg(width, height, store, captionFirstLine) {
  const { logoText, tagline, textColor, accentColor } = BRAND_OVERLAY
  const barHeight = Math.round(height * 0.18)
  const y = height - barHeight

  // Truncate caption preview to fit
  const preview = captionFirstLine?.slice(0, 55) || store.shortName

  return Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark gradient bar at bottom -->
  <defs>
    <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0)" />
      <stop offset="100%" stop-color="rgba(26,26,26,0.88)" />
    </linearGradient>
  </defs>
  <rect x="0" y="${y - 20}" width="${width}" height="${barHeight + 20}" fill="url(#bar)" />

  <!-- Brand name -->
  <text
    x="24" y="${height - barHeight + 28}"
    font-family="Georgia, serif"
    font-size="${Math.round(width * 0.052)}"
    font-weight="400"
    fill="${accentColor}"
    letter-spacing="2"
  >${logoText}</text>

  <!-- Tagline -->
  <text
    x="24" y="${height - barHeight + 52}"
    font-family="-apple-system, sans-serif"
    font-size="${Math.round(width * 0.028)}"
    font-weight="300"
    fill="${textColor}"
    opacity="0.7"
    letter-spacing="3"
  >${tagline.toUpperCase()}</text>

  <!-- Caption preview (first line) -->
  <text
    x="24" y="${height - 22}"
    font-family="-apple-system, sans-serif"
    font-size="${Math.round(width * 0.031)}"
    font-weight="300"
    fill="${textColor}"
    opacity="0.9"
  >${preview}</text>
</svg>`)
}

/**
 * Create a branded post image from a photo
 * Returns the path to the output image
 */
export async function createPostImage(storeId, caption = "", outputName = null) {
  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}`)

  const photoPath = await getRandomPhoto(storeId)
  const outputDir = path.join(ROOT, "content", "output")
  mkdirSync(outputDir, { recursive: true })

  const filename = outputName || `post-${storeId}-${Date.now()}.jpg`
  const outputPath = path.join(outputDir, filename)

  // Get source image dimensions
  const metadata = await sharp(photoPath).metadata()
  const { width, height } = metadata

  // Resize to Instagram square (1080×1080) or portrait (1080×1350)
  const targetW = 1080
  const targetH = 1080 // square — change to 1350 for portrait

  const captionFirstLine = caption.split("\n")[0].replace(/[#@]/g, "").trim()

  const overlay = buildOverlaySvg(targetW, targetH, store, captionFirstLine)

  await sharp(photoPath)
    .resize(targetW, targetH, { fit: "cover", position: "top" })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(outputPath)

  console.log(`✅ Image created: content/output/${filename}`)
  console.log(`   Source photo: ${path.basename(photoPath)}`)

  return outputPath
}

// ─── Run standalone to test image creation ────────────────────────────────────
if (process.argv[1].includes("create-image")) {
  const storeId = process.argv[2] || "ues"
  const testCaption = "Perfect brows, every visit. Threading done right."
  const result = await createPostImage(storeId, testCaption)
  console.log(`\nOutput saved to: ${result}`)
  console.log("Open content/output/ to preview the image.")
}
