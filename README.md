# ✨ UniqSwek Beauty Studios

**Two NYC beauty studios under one brand — threading, lashes, waxing & facials**

> Live site → [uniqswek.com](https://uniqswek.com)

---

## Our Studios

### Brows & Lashes by UniqSwek — Upper East Side, Manhattan
📍 1240 Lexington Avenue, New York, NY 10028  
📞 [+1 (917) 388-2434](tel:+19173882434)  
📸 [@browsandlashesnyc](https://www.instagram.com/browsandlashesnyc)  
🗓️ [Book an Appointment](https://book.squareup.com/appointments/4t8q4a3w43qqpa/location/LJDRXPJBMD5Y2/services?rwg_token=AFd1xnFwA5c7P3Zb7Kpt8pLOgW-9UZc_586SRt9tceevn64d8khlN7HJIS6NLrdsj8cijlavItegsDD9Kw5iZkX95W13wCdprw%3D%3D)

### Eyebrow Shape by UniqSwek — Ridgewood, Queens
📍 59-15 71st Avenue, Ridgewood, NY 11385  
📞 [(347) 889-5027](tel:+13478895027)  
📸 [@eyebrowshapenyc](https://www.instagram.com/eyebrowshapenyc)  
🗓️ [Book an Appointment](https://book.squareup.com/appointments/l5f8uasy444v40/location/LPT50K5SGRJTC/services?rwg_token=AFd1xnEaECUSkKyBXSkHBl1EvPjIY8g4A3MnG3OXAB2IRwUjK5hoqRcJoOgU2C2zyrLyzyaCCD9kreZXo4n4Klyh6i8ZeCoVaQ%3D%3D)

---

## About

UniqSwek Beauty Studios is founded and owned by **Swekchha Luitel**. What started as a single studio on the Upper East Side of Manhattan has grown into two NYC locations in the first year — a testament to the quality of service and the loyalty of our clients. Both studios specialize in eyebrow threading, lash extensions, waxing, facials, and henna tattoos.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | [shadcn/ui](https://ui.shadcn.com) + Radix UI |
| Fonts | Cormorant Garamond + Montserrat (Google Fonts) |
| Analytics | Vercel Analytics |
| Booking | [Square Appointments](https://squareup.com/appointments) (external) |
| Deployment | [Vercel](https://vercel.com) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Project Structure

```
brows-and-lashes-website/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Home page (assembles all sections)
│   └── globals.css             # Global styles & Tailwind config
├── components/
│   ├── navigation.tsx          # Fixed top nav + mobile menu + Book dropdown
│   ├── hero-section.tsx        # Full-screen hero with CTA
│   ├── location-selector.tsx   # Two-store picker section
│   ├── about-section.tsx       # Studio story + stats
│   ├── services-section.tsx    # Tabbed service menu
│   ├── gallery-section.tsx     # Photo grid
│   ├── testimonials-section.tsx# Google reviews carousel
│   ├── booking-section.tsx     # Booking CTA — both stores
│   ├── contact-section.tsx     # Map + contact details (tab per store)
│   ├── footer.tsx              # Footer with links + socials
│   └── ui/                     # shadcn/ui component library
├── lib/
│   └── stores.ts               # ⭐ Single source of truth for both store configs
├── public/
│   └── images/                 # Hero, gallery, and about images
└── hooks/                      # Custom React hooks
```

---

## Adding or Updating a Store

All store data lives in **one place**: `lib/stores.ts`

```ts
// lib/stores.ts
export const STORES = [
  {
    id: "brows-and-lashes",
    name: "Brows & Lashes",
    address: "1240 Lexington Avenue",
    // ...
  },
  {
    id: "eyebrow-shape",
    name: "Eyebrow Shape",
    address: "59-15 71st Ave",
    // ...
  }
] as const
```

Every component (navigation, booking cards, contact section, footer) reads from this array — edit `stores.ts` once and the whole site updates.

---

## Adding Your Photos

Drop your real photos into `public/images/` using these filenames:

| Filename | Used In |
|---|---|
| `hero-bg.jpg` | Hero section background |
| `about.jpg` | About section portrait |
| `gallery-1.jpg` → `gallery-6.jpg` | Gallery grid |

Recommended sizes: **hero-bg** 1920×1080px · **about** 800×1000px · **gallery** 800×800px square

---

## Updating Content

| What to change | Where |
|---|---|
| Store addresses, phones, booking links, Instagram | `lib/stores.ts` |
| Services list | `components/services-section.tsx` |
| Reviews | `components/testimonials-section.tsx` |
| About / founder story | `components/about-section.tsx` |
| SEO title & description | `app/layout.tsx` |

---

## Deployment (Vercel)

The site is deployed on Vercel and connected to `uniqswek.com`. Every push to `main` triggers an automatic deploy.

```bash
git add .
git commit -m "your message"
git push origin main
```

### Custom Domain (Spaceship → Vercel)

| Type | Host | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

> Changes propagate in 5–30 minutes. Vercel auto-provisions SSL.

---

## Questions or Feedback?

For anything related to the website, reach out to:

**Swekchha Luitel** — Founder & Owner, UniqSwek Beauty Studios  
🌐 [uniqswek.com](https://uniqswek.com)  
📸 [@browsandlashesnyc](https://www.instagram.com/browsandlashesnyc) · [@eyebrowshapenyc](https://www.instagram.com/eyebrowshapenyc)

---

*Built with ❤️ for UniqSwek Beauty Studios · Founded by Swekchha Luitel*
