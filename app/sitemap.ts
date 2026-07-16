import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://uniqswek.com'
  const now = new Date()
  return [
    { url: base,                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/manhattan`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/ridgewood`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/memberships`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/bridal`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/training`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/terms`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
