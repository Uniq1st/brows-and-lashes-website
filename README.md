# ✨ UniqSwek Beauty Studios

**Two NYC beauty studios under one brand — threading, lashes, waxing & facials**

> Live site → [uniqswek.com](https://uniqswek.com)

---

## Our Studios

| | Brows & Lashes | Eyebrow Shape |
|---|---|---|
| **Location** | 1240 Lexington Ave, New York, NY 10028 | 59-15 71st Ave, Ridgewood, NY 11385 |
| **Neighborhood** | Upper East Side, Manhattan | Ridgewood, Queens |
| **Phone** | [+1 (917) 388-2434](tel:+19173882434) | [(347) 889-5027](tel:+13478895027) |
| **Instagram** | [@browsandlashesnyc](https://www.instagram.com/browsandlashesnyc) | [@eyebrowshapenyc](https://www.instagram.com/eyebrowshapenyc) |
| **Booking** | Square Appointments | Square Appointments |

---

## About

UniqSwek Beauty Studios is founded and owned by **Swekchha Luitel**. What started as a single studio on the Upper East Side has grown into two NYC locations. Both studios specialize in eyebrow threading, lash extensions, waxing, facials, and henna tattoos.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + shadcn/ui + Radix UI |
| Fonts | Cormorant Garamond + Montserrat (Google Fonts) |
| Deployment | [Vercel](https://vercel.com) — auto-deploys on push to `main` |
| Analytics | Google Analytics 4 (G-0WNZS7QG0N) + Vercel Analytics |
| Booking | Square Appointments (external) |
| Memberships | Square Subscriptions (external checkout links) |
| Payments | Square (processed externally — no card data on site) |
| Forms | [Formspree](https://formspree.io) (endpoint: `xbdwbldn`) |
| Instagram Feed | [Behold.so](https://behold.so) web component (UES only) |
| Social Automation | Claude API + Meta Graph API + Google Business Profile API |

---

## Project Structure

```
brows-and-lashes-website/
│
├── app/                            # Next.js App Router pages
│   ├── layout.tsx                  # Root layout — fonts, GA4, metadata
│   ├── page.tsx                    # Home page
│   ├── manhattan/page.tsx          # UES location page
│   ├── ridgewood/page.tsx          # Ridgewood location page
│   ├── memberships/page.tsx        # Memberships page (pulls from Square API)
│   ├── bridal/page.tsx             # Bridal & group bookings + inquiry form
│   ├── privacy/page.tsx            # Privacy Policy (/privacy)
│   └── terms/page.tsx              # Terms of Service (/terms)
│
├── components/                     # Reusable UI components
│   ├── navigation.tsx              # Fixed top nav + mobile menu + Book dropdown
│   ├── hero-section.tsx            # Full-screen hero with CTA
│   ├── promo-banner.tsx            # Top banner — reads from lib/promotions.ts
│   ├── services-section.tsx        # Tabbed service menu
│   ├── before-after-section.tsx    # Before/after photo gallery
│   ├── testimonials-section.tsx    # Google reviews carousel
│   ├── instagram-section.tsx       # Behold.so live Instagram feed
│   ├── booking-section.tsx         # Booking CTA — both stores
│   ├── contact-section.tsx         # Map + contact details (tab per store)
│   ├── footer.tsx                  # Footer with links + socials
│   └── ui/                         # shadcn/ui component library
│
├── lib/                            # Data and API clients
│   ├── stores.ts                   # ⭐ Single source of truth for both stores
│   ├── memberships.ts              # ⭐ Membership tiers + Square checkout URLs
│   ├── promotions.ts               # ⭐ Promo banner system (set active: true to show)
│   ├── services.ts                 # Service catalog (prices, descriptions)
│   └── square.ts                   # Square API client (per-store, server-side)
│
├── scripts/                        # Standalone scripts (not part of the website)
│   ├── social-automation/          # ⭐ Auto-posts to Instagram + Google Business
│   │   ├── README.md               # Full setup guide for social automation
│   │   ├── config.mjs              # Stores, hashtags, themes, brand settings
│   │   ├── generate-caption.mjs    # Claude API — generates captions
│   │   ├── create-image.mjs        # Sharp — adds brand overlay to photos
│   │   ├── post-instagram.mjs      # Meta Graph API — posts to Instagram
│   │   ├── post-google-business.mjs# Google Business Profile API
│   │   ├── run-daily.mjs           # Main orchestrator (called by GitHub Actions)
│   │   ├── test-connection.mjs     # Check all credentials before going live
│   │   └── .env.example            # Template for local .env file
│   └── list-prices.mjs             # Utility: list Square catalog prices
│
├── content/                        # Content for social automation
│   └── photos/
│       ├── ues/                    # Drop photos here → auto-posted for UES
│       └── ridgewood/              # Drop photos here → auto-posted for Ridgewood
│
├── .github/
│   └── workflows/
│       └── social-post.yml         # ⭐ Runs social automation at 9am + 6pm ET daily
│
├── public/
│   └── images/                     # Static images (hero, gallery, before/after)
│
├── UniqSwek-Project-Plan.html      # Interactive project plan — open in browser
└── .env.local                      # API keys (never committed — see below)
```

---

## Key Files — Quick Reference

### `lib/stores.ts` — Edit Store Info
Single source of truth for both locations. Edit this file to update addresses, phone numbers, booking URLs, Instagram handles, and review links. Every component reads from here.

```ts
// Changing the Ridgewood phone? Edit it ONCE here — updates everywhere.
export const STORES = [
  { id: "brows-and-lashes", phone: "+1 (917) 388-2434", ... },
  { id: "eyebrow-shape",    phone: "(347) 889-5027",    ... },
]
```

### `lib/memberships.ts` — Membership Tiers + Square Links
Defines the membership plans shown on `/memberships`. Update `squareUrl` with the Square subscription checkout link for each plan.

```ts
// UES plans (Square links are live)
export const UES_MEMBERSHIPS = [
  { name: "Unlimited Threading", price: 29.99, squareUrl: "https://square.link/u/yHVmuqxb" },
  { name: "Unlimited Facials",   price: 100,   squareUrl: "https://square.link/u/n7ijmZS8" },
]

// Ridgewood plans (add Square links when plans are created in Square Dashboard)
export const RIDGEWOOD_MEMBERSHIPS = [
  { name: "Unlimited Threading", price: 29.99, squareUrl: "#" }, // ← paste URL here
  { name: "Unlimited Facials",   price: 100,   squareUrl: "#" }, // ← paste URL here
]
```

### `lib/promotions.ts` — Promo Banner
Controls the banner that appears at the top of every page. Only the **first** `active: true` entry shows. Switch promos by toggling `active`.

```ts
export const PROMOTIONS = [
  { id: "summer", active: true,  message: "☀️ Summer Glow — 15% off waxing this month" },
  { id: "welcome", active: false, message: "New clients: 10% off your first visit" },
  // Add new promos here — set active: true to show them
]
```

**Monthly promo calendar:** Jan=New Year, Feb=Valentine's, Mar=Spring, Apr=Wedding season, May=Mother's Day, Jun–Aug=Summer, Sep=Fall refresh, Oct=Halloween, Nov=Holiday prep, Dec=Gift cards

---

## Environment Variables

Stored in `.env.local` (never committed to git). Required for the Square API integration.

```bash
# Square — UES (Brows & Lashes)
SQUARE_UES_ACCESS_TOKEN=...
SQUARE_UES_LOCATION_ID=LJDRXPJBMD5Y2

# Square — Ridgewood (Eyebrow Shape)
SQUARE_RIDGEWOOD_ACCESS_TOKEN=...
SQUARE_RIDGEWOOD_LOCATION_ID=LPT50K5SGRJTC
```

For social automation, secrets live in **GitHub Secrets** (Settings → Secrets → Actions). See `scripts/social-automation/README.md` for the full list.

---

## Features

### Promotions System
Edit `lib/promotions.ts` → set `active: true` → push to GitHub → deploys in ~60 seconds.
> Ask Claude: *"Switch the promo to [X]"* — takes 2 minutes.

### Memberships
Live Square subscription checkout links for UES. Ridgewood links pending (create plans in Square Dashboard → paste URLs into `lib/memberships.ts`).

### Bridal & Group Bookings
Inquiry form at `/bridal` submits via Formspree (`xbdwbldn`). Submissions land in `browsandlashesbyuniqswek@gmail.com`.

### Google Analytics 4
Tracking page views + these custom events:
- `book_appointment` — fires when "Book Now" is clicked
- `generate_lead` — fires when email signup form is submitted

Check GA4 → Realtime → Events to verify.

### Behold Instagram Feed
Live `@browsandlashesnyc` feed on the UES location page via Behold.so web component.
> Ridgewood feed pending: add `@eyebrowshapenyc` to Behold → get feed ID → tell Claude.

### Social Media Automation
GitHub Actions posts to Instagram and Google Business Profile **twice daily** (9am + 6pm ET) using your real photos with branded overlays. Captions are AI-generated by Claude.

See **`scripts/social-automation/README.md`** for full setup.

Quick start:
1. Drop photos into `content/photos/ues/` and `content/photos/ridgewood/`
2. Add 11 secrets to GitHub (Meta, Cloudinary, Google, Anthropic)
3. GitHub → Actions → Social Media Auto-Post → Run workflow → `dry_run: true` to preview

---

## Common Tasks

### Switch the promo banner
```ts
// lib/promotions.ts — set active: true on the one you want
{ id: "summer", active: true, message: "☀️ Summer Glow — 15% off waxing" }
```
Push to GitHub → live in 60 seconds.

### Add a new membership tier
1. Create the plan in Square Dashboard (correct account)
2. Copy the "Share link" URL
3. Add to `lib/memberships.ts` → `UES_MEMBERSHIPS` or `RIDGEWOOD_MEMBERSHIPS`
4. Push

### Add before/after photos
Drop files into `public/images/before-after/` named `ba-1-before.jpg`, `ba-1-after.jpg`, etc.
Tell Claude → enables the Image tags in `before-after-section.tsx`.

### Add photos for social automation
Drop any JPG/PNG into `content/photos/ues/` or `content/photos/ridgewood/` and push. The automation script picks randomly from whatever's there.

### Update store hours
Edit `lib/stores.ts` → `hours.weekdays` and `hours.sunday`. Also update the `schema` array for structured data.

### Add a Ridgewood testimonial
Open `components/testimonials-section.tsx` → find the reviews array → add an object with `name`, `rating`, `text`, `store: "ridgewood"`.

### Trigger a manual social post
GitHub → Actions → Social Media Auto-Post → Run workflow → choose store + dry_run setting.

---

## Deployment

Every push to `main` auto-deploys to Vercel → [uniqswek.com](https://uniqswek.com).

```bash
git add .
git commit -m "describe what you changed"
git push origin main
```

**If git shows a lock file error:**
```bash
rm -f ~/brows-and-lashes-website/.git/HEAD.lock ~/brows-and-lashes-website/.git/index.lock
# Then re-run the git command
```

### DNS (Spaceship → Vercel)
| Type | Host | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

---

## Third-Party Services

| Service | Purpose | Where to manage |
|---|---|---|
| Square (UES) | Booking, payments, memberships | [squareup.com](https://squareup.com) |
| Square (Ridgewood) | Booking, payments | [squareup.com](https://squareup.com) |
| Formspree | Email capture + bridal form | [formspree.io](https://formspree.io) — endpoint `xbdwbldn` |
| Behold.so | Live Instagram feed (UES) | [behold.so](https://behold.so) |
| Google Analytics 4 | Site analytics | [analytics.google.com](https://analytics.google.com) — ID: G-0WNZS7QG0N |
| Vercel Analytics | Performance | [vercel.com](https://vercel.com) |
| Cloudinary | Image hosting for social posts | [cloudinary.com](https://cloudinary.com) |
| Meta Graph API | Instagram auto-posting | [developers.facebook.com](https://developers.facebook.com) |
| Google Business API | Google Maps auto-posting | [console.cloud.google.com](https://console.cloud.google.com) |

---

## Project Plan

The full revenue growth roadmap lives in `UniqSwek-Project-Plan.html`. Open it anytime:

```bash
open ~/brows-and-lashes-website/UniqSwek-Project-Plan.html
```

Progress saves automatically in your browser. Covers 34 tasks across 5 phases from now through Month 6 ($25K+ revenue target), plus a TPM learning path.

---

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at localhost:3000
npm run build     # Build for production
npm run lint      # Lint check
```

---

*Built for UniqSwek Beauty Studios · Founded by Swekchha Luitel · [uniqswek.com](https://uniqswek.com)*
