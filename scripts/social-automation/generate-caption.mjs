// ─── Caption Generator — uses Claude to write Instagram captions ───────────────
import Anthropic from "@anthropic-ai/sdk"
import { STORES, HASHTAGS, WEEKLY_THEMES, FALLBACK_CAPTIONS } from "./config.mjs"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

/**
 * Pick hashtags for a given service category
 */
function pickHashtags(service, count = 10) {
  const serviceMap = {
    "eyebrow threading": [...HASHTAGS.threading, ...HASHTAGS.local],
    "lash extensions": [...HASHTAGS.lashes, ...HASHTAGS.local],
    "lash lift": [...HASHTAGS.lashes, ...HASHTAGS.local],
    "lash lift & tint": [...HASHTAGS.lashes, ...HASHTAGS.local],
    "waxing": [...HASHTAGS.waxing, ...HASHTAGS.local],
    "facials": [...HASHTAGS.facials, ...HASHTAGS.local],
    "membership": [...HASHTAGS.general, ...HASHTAGS.local],
  }
  const pool = serviceMap[service] || [...HASHTAGS.general, ...HASHTAGS.local]
  const shuffled = pool.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).join(" ")
}

/**
 * Get today's content theme
 */
function getTodayTheme() {
  const dayOfWeek = new Date().getDay()
  return WEEKLY_THEMES.find((t) => t.day === dayOfWeek) || WEEKLY_THEMES[1]
}

/**
 * Generate a caption using Claude
 */
export async function generateCaption(storeId, options = {}) {
  const store = STORES[storeId]
  if (!store) throw new Error(`Unknown store: ${storeId}`)

  const theme = options.theme || getTodayTheme()
  const service = options.service || theme.service
  const hashtags = pickHashtags(service)

  const prompt = `You are a social media expert writing for a luxury beauty studio in New York City.

Business: ${store.name}
Location: ${store.location}
Instagram: ${store.handle}
Today's theme: ${theme.focus}
Featured service: ${service}
Booking link: ${store.bookingUrl}

Write a compelling Instagram caption that:
- Is 2–4 sentences maximum (short and punchy)
- Has a warm, confident, luxurious tone — like a friend who's also an expert
- Mentions the featured service naturally
- Ends with ONE clear call to action (book, DM us, link in bio)
- Does NOT use generic phrases like "amazing" or "stunning" or excessive emojis
- Uses 1–2 relevant emojis maximum
- Is written for a local NYC audience

After the caption, on a new line, add exactly these hashtags:
${hashtags}

Return ONLY the caption + hashtags. No quotes, no commentary.`

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001", // Fast + cheap for automation
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    })

    const caption = message.content[0].text.trim()
    console.log(`✅ Caption generated for ${store.name} (${theme.theme})`)
    return { caption, service, theme: theme.theme, hashtags }
  } catch (error) {
    console.warn(`⚠️  Claude API failed, using fallback caption: ${error.message}`)
    return useFallbackCaption(service, store, hashtags)
  }
}

/**
 * Fallback caption when Claude is unavailable
 */
function useFallbackCaption(service, store, hashtags) {
  const { FALLBACK_CAPTIONS } = await import("./config.mjs")
  const serviceKey = service.includes("lash") ? "lashes"
    : service.includes("thread") ? "threading"
    : service.includes("member") ? "membership"
    : "general"

  const templates = FALLBACK_CAPTIONS[serviceKey] || FALLBACK_CAPTIONS.general
  const template = templates[Math.floor(Math.random() * templates.length)]
  const caption = template
    .replace("{bookingUrl}", store.bookingUrl)
    .replace("{hashtags}", hashtags)

  return { caption, service, theme: "fallback", hashtags }
}

// ─── Run standalone to preview captions ───────────────────────────────────────
if (process.argv[1].includes("generate-caption")) {
  const storeId = process.argv[2] || "ues"
  console.log(`\nGenerating caption for: ${storeId}\n`)
  const result = await generateCaption(storeId)
  console.log("─".repeat(60))
  console.log(result.caption)
  console.log("─".repeat(60))
  console.log(`Theme: ${result.theme} | Service: ${result.service}`)
}
