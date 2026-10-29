// ─── Facebook Page Publisher — posts via Meta Graph API ───────────────────────
// Requires: META_{STORE}_FB_PAGE_ID and META_{STORE}_FB_PAGE_TOKEN in .env
//
// IMPORTANT: this is a Facebook PAGE access token — different from the
// Instagram access token already configured (Instagram here authenticates
// via graph.instagram.com with an Instagram-login token, which has no
// Facebook Page posting permission).
//
// To get a Page token:
//   1. developers.facebook.com → your app → Graph API Explorer
//   2. Select your app, then select the Facebook Page (not your user account)
//      from the "User or Page" dropdown
//   3. Add permissions: pages_manage_posts, pages_read_engagement
//   4. Generate the token, then exchange it for a long-lived token:
//      https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived
//      (Page tokens derived from a long-lived user token don't expire)
//   5. Find your Page ID at: your Page → About → Page ID

import fetch from "node-fetch"
import { STORES } from "./config.mjs"

const GRAPH_API = "https://graph.facebook.com/v21.0"

/**
 * Posts an image + caption to a Facebook Page.
 * imageUrl must be a publicly reachable URL (the same Cloudinary URL used for Instagram).
 */
export async function postToFacebook(storeId, imageUrl, caption) {
  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}`)

  const pageId = store.facebookPageId
  const pageToken = store.facebookPageToken

  if (!pageId || !pageToken) {
    throw new Error(
      `META_${storeId.toUpperCase()}_FB_PAGE_ID / META_${storeId.toUpperCase()}_FB_PAGE_TOKEN is not set.\n` +
      "See setup guide in scripts/social-automation/README.md"
    )
  }

  console.log(`\n📘 Posting to Facebook Page for ${store.name}...`)

  const url = new URL(`${GRAPH_API}/${pageId}/photos`)
  url.searchParams.set("url", imageUrl)
  url.searchParams.set("caption", caption)
  url.searchParams.set("access_token", pageToken)

  const res = await fetch(url.toString(), { method: "POST" })
  const data = await res.json()

  if (data.error) {
    throw new Error(`Facebook API error: ${data.error.message} (code ${data.error.code})`)
  }

  console.log(`✅ Posted to Facebook: post ID ${data.post_id ?? data.id}`)
  return { postId: data.post_id ?? data.id }
}

/**
 * Checks whether the configured Page token actually has posting permission.
 * Run this once after setup — or whenever Facebook posting fails — to see
 * exactly what scope is missing instead of guessing from a generic error.
 */
export async function checkFacebookPermissions(storeId) {
  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}`)

  const pageToken = store.facebookPageToken
  if (!pageToken) {
    return { ok: false, reason: "No Facebook Page token configured" }
  }

  const res = await fetch(`${GRAPH_API}/me/permissions?access_token=${pageToken}`)
  const data = await res.json()

  if (data.error) {
    return { ok: false, reason: data.error.message }
  }

  const granted = (data.data ?? [])
    .filter((p) => p.status === "granted")
    .map((p) => p.permission)
  const required = ["pages_manage_posts", "pages_read_engagement"]
  const missing = required.filter((p) => !granted.includes(p))

  return { ok: missing.length === 0, granted, missing }
}

// ─── CLI entry — check permissions without posting anything ─────────────────
// Usage: node post-facebook.mjs check ues
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , cmd, storeId] = process.argv
  if (cmd === "check" && storeId) {
    checkFacebookPermissions(storeId)
      .then((result) => {
        console.log(`\nFacebook permissions for ${storeId}:`)
        console.log(result)
        if (!result.ok) process.exit(1)
      })
      .catch((err) => {
        console.error("❌", err.message)
        process.exit(1)
      })
  } else {
    console.error("Usage: node post-facebook.mjs check <ues|ridgewood>")
    process.exit(1)
  }
}
