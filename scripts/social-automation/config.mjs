// ─── UniqSwek Social Automation Config ────────────────────────────────────────
// Edit this file to change captions, hashtags, themes, and store settings.

export const STORES = {
  ues: {
    name: "Brows & Lashes by UniqSwek",
    shortName: "Brows & Lashes",
    location: "Upper East Side, New York",
    handle: "@browsandlashesnyc",
    bookingUrl: "https://uniqswek.com/manhattan",
    services: [
      "eyebrow threading",
      "lash extensions",
      "lash lift & tint",
      "waxing",
      "facials",
      "eyebrow tinting",
    ],
    // From Meta Developer App
    instagramUserId: process.env.META_UES_IG_USER_ID,
    instagramToken: process.env.META_UES_ACCESS_TOKEN,
    // From Google Cloud / Business Profile API
    googleLocationName: process.env.GOOGLE_UES_LOCATION_NAME, // e.g. "accounts/123/locations/456"
  },
  ridgewood: {
    name: "Eyebrow Shape by UniqSwek",
    shortName: "Eyebrow Shape",
    location: "Ridgewood, Queens",
    handle: "@eyebrowshapenyc",
    bookingUrl: "https://uniqswek.com/ridgewood",
    services: [
      "eyebrow threading",
      "eyebrow waxing",
      "lash extensions",
      "lash lift & tint",
      "eyebrow tinting",
    ],
    instagramUserId: process.env.META_RIDGEWOOD_IG_USER_ID,
    instagramToken: process.env.META_RIDGEWOOD_ACCESS_TOKEN,
    googleLocationName: process.env.GOOGLE_RIDGEWOOD_LOCATION_NAME,
  },
}

// ─── Hashtag pools — script picks 8–12 per post ───────────────────────────────
export const HASHTAGS = {
  threading: [
    "#eyebrowthreading", "#threadingnyc", "#browthreading", "#browgoals",
    "#eyebrowsonfleek", "#browshaping", "#threadingbrows", "#nycthreading",
    "#perfectbrows", "#browsofinstagram",
  ],
  lashes: [
    "#lashextensions", "#lashlift", "#lashgoals", "#lashliftandtint",
    "#volumelashes", "#classiclashes", "#nyclashes", "#lashtech",
    "#lashesfordays", "#lashartist",
  ],
  facials: [
    "#facial", "#skincare", "#glowingskin", "#nycfacial", "#skincarenyc",
    "#hydrafacial", "#skingoals", "#glowup",
  ],
  waxing: [
    "#waxing", "#browwax", "#smoothskin", "#waxingnyc", "#summerwaxing",
  ],
  local: [
    "#uniqswek", "#nycbeauty", "#beautystudio", "#nycsalon",
    "#uppereastside", "#uesnyc", "#ridgewoodqueens", "#queensnyc",
    "#nycbeautyblogger", "#nycmakeupartist", "#beautynyc",
  ],
  general: [
    "#beforeandafter", "#transformationtuesday", "#beautytransformation",
    "#selfcare", "#selfcaresunday", "#treatyourself", "#glowup",
    "#beautygoals", "#salonlife", "#beautylovers",
  ],
}

// ─── Weekly content rotation ──────────────────────────────────────────────────
// The script picks the theme based on the day of the week.
export const WEEKLY_THEMES = [
  { day: 0, theme: "sunday_self_care", focus: "self-care and relaxation", service: "facials" },
  { day: 1, theme: "monday_motivation", focus: "starting the week looking your best", service: "eyebrow threading" },
  { day: 2, theme: "transformation_tuesday", focus: "before and after transformation", service: "lash extensions" },
  { day: 3, theme: "wednesday_offer", focus: "current promotion or membership deal", service: "membership" },
  { day: 4, theme: "thursday_tips", focus: "beauty tip or aftercare advice", service: "lash lift" },
  { day: 5, theme: "friday_glam", focus: "weekend-ready look", service: "waxing" },
  { day: 6, theme: "saturday_vibes", focus: "behind the scenes or team spotlight", service: "lash extensions" },
]

// ─── Caption templates for fallback ───────────────────────────────────────────
// Used if the Claude API is unavailable. Edit these to match your voice.
export const FALLBACK_CAPTIONS = {
  threading: [
    "Perfect brows start here. ✨ Book your threading appointment at {bookingUrl} — walk-ins welcome too!\n\n{hashtags}",
    "Your brows deserve expert hands. 🧵 Threading done right, every time. Link in bio to book.\n\n{hashtags}",
    "We shape brows, not just clean them up. Come see the difference. Book at {bookingUrl}\n\n{hashtags}",
  ],
  lashes: [
    "Wake up like this. 👁️ Our lash extensions last 4–6 weeks and look completely natural. Book at {bookingUrl}\n\n{hashtags}",
    "New lashes, new confidence. ✨ Classic to Volume — we do it all. Book your set at {bookingUrl}\n\n{hashtags}",
    "Lash extensions that actually look natural. No clumps, no drama. Just beautiful lashes. Book at {bookingUrl}\n\n{hashtags}",
  ],
  membership: [
    "Unlimited eyebrow threading for $29.99/month. 🤯 Yes, really. Sign up at {bookingUrl} — link in bio.\n\n{hashtags}",
    "Our threading membership pays for itself after 2 visits. $29.99/month, cancel anytime. Link in bio. ✨\n\n{hashtags}",
  ],
  general: [
    "Beauty is our art. Your face is our canvas. Book an appointment at {bookingUrl} ✨\n\n{hashtags}",
    "Come in looking good. Leave looking amazing. Walk-ins welcome or book online at {bookingUrl}\n\n{hashtags}",
  ],
}

// ─── Brand overlay settings (added to photos) ─────────────────────────────────
export const BRAND_OVERLAY = {
  logoText: "UniqSwek",
  tagline: "Beauty Studios · NYC",
  backgroundColor: "rgba(26, 26, 26, 0.75)", // dark semi-transparent
  textColor: "#ffffff",
  accentColor: "#c9a97a", // gold from your site
  fontFamily: "sans-serif",
}

// ─── Posting schedule ─────────────────────────────────────────────────────────
// These are the times GitHub Actions triggers posts (UTC)
// 9am ET = 13:00 UTC, 6pm ET = 22:00 UTC
export const POST_TIMES_UTC = ["13:00", "22:00"]
