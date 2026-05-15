// ─── Instagram Publisher — posts via Meta Graph API ───────────────────────────
// Requires: META_{STORE}_IG_USER_ID and META_{STORE}_ACCESS_TOKEN in .env
// Get these from: developers.facebook.com → your app → Instagram API

import fetch from "node-fetch"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import FormData from "form-data"
import { STORES } from "./config.mjs"

const GRAPH_API = "https://graph.instagram.com/v21.0"

/**
 * Upload an image to Instagram and get a container ID
 * Instagram requires the image at a public URL.
 * We use Cloudinary (free) to host the image temporarily.
 */
async function uploadImageToCloudinary(imagePath) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary credentials missing.\n" +
      "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to GitHub Secrets.\n" +
      "Free account at: cloudinary.com"
    )
  }

  const imageBuffer = await readFile(imagePath)
  const form = new FormData()
  form.append("file", imageBuffer, { filename: "post.jpg", contentType: "image/jpeg" })
  form.append("upload_preset", "uniqswek_social") // Create this preset in Cloudinary dashboard

  const timestamp = Math.round(Date.now() / 1000)
  form.append("timestamp", timestamp)
  form.append("api_key", apiKey)

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const res = await fetch(uploadUrl, { method: "POST", body: form })
  const data = await res.json()

  if (!data.secure_url) {
    throw new Error(`Cloudinary upload failed: ${JSON.stringify(data)}`)
  }

  console.log(`✅ Image uploaded to Cloudinary: ${data.secure_url}`)
  return data.secure_url
}

/**
 * Step 1: Create Instagram media container
 */
async function createMediaContainer(storeId, imageUrl, caption) {
  const store = STORES[storeId]
  const userId = store.instagramUserId
  const token = store.instagramToken

  if (!userId || !token) {
    throw new Error(
      `Instagram credentials missing for ${storeId}.\n` +
      `Add META_${storeId.toUpperCase()}_IG_USER_ID and META_${storeId.toUpperCase()}_ACCESS_TOKEN to GitHub Secrets.`
    )
  }

  const params = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: token,
  })

  const res = await fetch(`${GRAPH_API}/${userId}/media`, {
    method: "POST",
    body: params,
  })
  const data = await res.json()

  if (!data.id) {
    throw new Error(`Failed to create media container: ${JSON.stringify(data)}`)
  }

  console.log(`✅ Instagram container created: ${data.id}`)
  return data.id
}

/**
 * Step 2: Publish the container
 */
async function publishContainer(storeId, containerId) {
  const store = STORES[storeId]
  const userId = store.instagramUserId
  const token = store.instagramToken

  const params = new URLSearchParams({
    creation_id: containerId,
    access_token: token,
  })

  const res = await fetch(`${GRAPH_API}/${userId}/media_publish`, {
    method: "POST",
    body: params,
  })
  const data = await res.json()

  if (!data.id) {
    throw new Error(`Failed to publish container: ${JSON.stringify(data)}`)
  }

  console.log(`✅ Published to Instagram! Post ID: ${data.id}`)
  return data.id
}

/**
 * Full Instagram post flow
 */
export async function postToInstagram(storeId, imagePath, caption) {
  console.log(`\n📸 Posting to Instagram for ${STORES[storeId]?.name}...`)

  if (!existsSync(imagePath)) {
    throw new Error(`Image not found: ${imagePath}`)
  }

  // 1. Upload image to get a public URL
  const imageUrl = await uploadImageToCloudinary(imagePath)

  // 2. Create container
  const containerId = await createMediaContainer(storeId, imageUrl, caption)

  // 3. Wait 5 seconds (Instagram recommendation for container processing)
  console.log("   Waiting for container to process...")
  await new Promise((r) => setTimeout(r, 5000))

  // 4. Publish
  const postId = await publishContainer(storeId, containerId)

  return { postId, imageUrl }
}
