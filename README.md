# ✨ Brows & Lashes by UniqSwek

**NYC's premier threading, lash & beauty studio — Upper East Side**

> Live site → [uniqswek.com](https://uniqswek.com) · Book → [simplebrows.trafft.com](https://simplebrows.trafft.com) · 📍 1240 Lexington Ave, New York NY 10028

---

## About the Studio

Brows & Lashes by UniqSwek is a luxury beauty studio on the Upper East Side of Manhattan specializing in **eyebrow threading**, **lash extensions**, **waxing**, **facials**, and **henna tattoos**. With 8+ years of experience and 5,000+ happy clients, every service is tailored to enhance your natural beauty.

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
| Booking | [Trafft](https://simplebrows.trafft.com) (external) |
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
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page (assembles all sections)
│   └── globals.css         # Global styles & Tailwind config
├── components/
│   ├── navigation.tsx      # Fixed top nav + mobile menu
│   ├── hero-section.tsx    # Full-screen hero with CTA
│   ├── about-section.tsx   # Studio story + stats
│   ├── services-section.tsx# Tabbed service menu with pricing
│   ├── gallery-section.tsx # Photo grid with lightbox
│   ├── testimonials-section.tsx  # Google reviews carousel
│   ├── booking-section.tsx # Booking CTA + contact info
│   ├── contact-section.tsx # Map + contact details
│   ├── footer.tsx          # Footer with links + socials
│   └── ui/                 # shadcn/ui component library
├── public/
│   └── images/             # Hero, gallery, and about images
└── hooks/                  # Custom React hooks
```

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

All content is co-located with its component — no CMS needed.

- **Services & prices** → `components/services-section.tsx`
- **Reviews** → `components/testimonials-section.tsx`
- **Hours & contact info** → `components/contact-section.tsx`
- **Social links** → `components/footer.tsx` + `components/gallery-section.tsx`

---

## Deployment (Vercel)

The site is deployed on Vercel and connected to `uniqswek.com`.

### Deploy a new version

```bash
# Push to main branch — Vercel auto-deploys
git add .
git commit -m "your message"
git push origin main
```

### Custom Domain (Spaceship → Vercel)

To connect `uniqswek.com` (registered on Spaceship):

1. Go to your **Vercel project → Settings → Domains**
2. Add `uniqswek.com` and `www.uniqswek.com`
3. Vercel will show you two DNS records to add

Then in **Spaceship** (spaceship.com → Domains → uniqswek.com → DNS):

| Type | Host | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | Auto |
| `CNAME` | `www` | `cname.vercel-dns.com` | Auto |

> Changes propagate in 5–30 minutes. Vercel auto-provisions an SSL certificate.

---

## Booking System

Appointments are handled externally via **Trafft** at [simplebrows.trafft.com](https://simplebrows.trafft.com). All "Book Now" buttons on the site link directly there — no backend or database required.

---

## Contact

📍 1240 Lexington Avenue, New York, NY 10028  
📞 [+1 (917) 388-2434](tel:+19173882434)  
📸 [@browsandlashesnyc](https://www.instagram.com/browsandlashesnyc)  
🌐 [uniqswek.com](https://uniqswek.com)

---

*Built with ❤️ for Brows & Lashes by UniqSwek*
