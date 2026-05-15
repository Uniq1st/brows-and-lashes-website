// ─── Google Business Profile Publisher ────────────────────────────────────────
// Posts "What's New" updates to your Google Business Profile.
// These appear in Google Search and Google Maps results.
//
// Setup: Google Cloud Console → Enable "My Business API" → Create Service Account
// Download the service account JSON → paste contents into GOOGLE_SERVICE_ACCOUNT_JSON secret

import { google } from "googleapis"
import { STORES } from "./config.mjs"

const SCOPES = ["https://www.googleapis.com/auth/business.manage"]

/**
 * Get authenticated Google API client
 */
async function getGoogleClient() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON

  if (!serviceAccountJson) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON secret is missing.\n" +
      "See setup guide in scripts/social-automation/README.md"
    )
  }

  const credentials = JSON.parse(serviceAccountJson)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  })

  return auth.getClient()
}

/**
 * Post a "What's New" update to Google Business Profile
 */
export async function postToGoogleBusiness(storeId, caption, imageUrl = null) {
  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}`)

  const locationName = store.googleLocationName
  if (!locationName) {
    throw new Error(
      `GOOGLE_${storeId.toUpperCase()}_LOCATION_NAME is not set.\n` +
      "Format: accounts/{account_id}/locations/{location_id}\n" +
      "Find yours at: business.google.com → Info → Advanced → Location ID"
    )
  }

  console.log(`\n📍 Posting to Google Business Profile for ${store.name}...`)

  const client = await getGoogleClient()

  // Build the post body
  // Google Business "What's New" post
  const postBody = {
    languageCode: "en",
    summary: caption.slice(0, 1500), // GBP limit is 1500 chars
    callToAction: {
      actionType: "BOOK",
      url: store.bookingUrl,
    },
    topicType: "STANDARD",
  }

  // Add photo if provided
  if (imageUrl) {
    postBody.media = [
      {
        mediaFormat: "PHOTO",
        sourceUrl: imageUrl,
      },
    ]
  }

  const apiUrl = `https://mybusiness.googleapis.com/v4/${locationName}/localPosts`

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(await client.getAccessToken()).token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  })

  const data = await response.json()

  if (data.error) {
    throw new Error(`Google Business API error: ${JSON.stringify(data.error)}`)
  }

  console.log(`✅ Posted to Google Business Profile: ${data.name}`)
  return data
}
