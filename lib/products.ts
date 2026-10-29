// Retail product catalog for /shop — placeholder data for launch testing.
// Swap in real products, prices, and photos once your bulk order arrives;
// everything else (cart, checkout, Square payment links) already works off this file.

export type Product = {
  id: string
  name: string
  category: "Wax Supplies" | "Nepali Goods"
  description: string
  /** Price in cents */
  priceCents: number
  inStock: boolean
}

export const PRODUCTS: Product[] = [
  // ─── Wax Supplies ───────────────────────────────────────────────
  { id: "wax-lavender",      name: "Lavender Wax Beans",   category: "Wax Supplies", description: "Calming lavender-scented hard wax beans for smooth, gentle hair removal at home.", priceCents: 1600, inStock: true },
  { id: "wax-honey",         name: "Honey Wax Beans",      category: "Wax Supplies", description: "Sweet, soothing honey-infused hard wax beans — gentle on sensitive skin.", priceCents: 1600, inStock: true },
  { id: "wax-cbd",           name: "CBD Wax Beans",        category: "Wax Supplies", description: "CBD-infused hard wax beans for extra soothing and reduced redness.", priceCents: 1900, inStock: true },
  { id: "wax-sugar",         name: "Sugar Wax",            category: "Wax Supplies", description: "All-natural sugar paste — gentler on skin with less redness than traditional wax.", priceCents: 1400, inStock: true },
  { id: "wax-chocolate",     name: "Chocolate Wax Beans",  category: "Wax Supplies", description: "Rich chocolate-scented hard wax beans — a client favorite for an at-home spa feel.", priceCents: 1600, inStock: true },
  { id: "wax-beans-classic", name: "Classic Wax Beans",    category: "Wax Supplies", description: "Our everyday hard wax beans — reliable, precise hair removal for any skin type.", priceCents: 1400, inStock: true },

  // ─── Nepali Goods ───────────────────────────────────────────────
  { id: "pashmina-classic", name: "Handwoven Pashmina Scarf",   category: "Nepali Goods", description: "Authentic handwoven pashmina from Nepal — soft, warm, and elegant for any season.", priceCents: 4500, inStock: true },
  { id: "bracelet-stone",   name: "Natural Stone Bracelet",     category: "Nepali Goods", description: "Handmade bracelet featuring natural stones, sourced from Nepal.", priceCents: 1800, inStock: true },
  { id: "chain-necklace",   name: "Nepali Chain Necklace",      category: "Nepali Goods", description: "Delicate handcrafted chain necklace with traditional Nepali styling.", priceCents: 2200, inStock: true },
  { id: "loose-stones",     name: "Loose Natural Stones (Set)", category: "Nepali Goods", description: "A curated set of natural stones from Nepal — perfect for jewelry-making or display.", priceCents: 1200, inStock: true },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductCategories(): Product["category"][] {
  return Array.from(new Set(PRODUCTS.map((p) => p.category)))
}
