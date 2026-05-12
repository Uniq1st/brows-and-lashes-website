/**
 * Square API client for UniqSwek Beauty Studios
 * Two separate Square accounts — one per location.
 *
 * Usage (Server Components only — never import in client components):
 *   import { getServices, getTeamMembers, getSubscriptionPlans } from "@/lib/square"
 *   const services = await getServices("brows-and-lashes")
 */

const SQUARE_API_BASE = "https://connect.squareup.com/v2"

// ─── Store configs ────────────────────────────────────────────────────────────

export const SQUARE_STORE_IDS = ["brows-and-lashes", "eyebrow-shape"] as const
export type SquareStoreId = (typeof SQUARE_STORE_IDS)[number]

const SQUARE_STORES: Record<
  SquareStoreId,
  { accessToken: string; locationId: string; name: string }
> = {
  "brows-and-lashes": {
    accessToken: process.env.SQUARE_UES_ACCESS_TOKEN ?? "",
    locationId: process.env.SQUARE_UES_LOCATION_ID ?? "",
    name: "Brows & Lashes",
  },
  "eyebrow-shape": {
    accessToken: process.env.SQUARE_RIDGEWOOD_ACCESS_TOKEN ?? "",
    locationId: process.env.SQUARE_RIDGEWOOD_LOCATION_ID ?? "",
    name: "Eyebrow Shape",
  },
}

// ─── Shared fetch helper ──────────────────────────────────────────────────────

async function squareFetch<T>(
  storeId: SquareStoreId,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const store = SQUARE_STORES[storeId]
  if (!store.accessToken) {
    throw new Error(`Missing Square access token for store: ${storeId}`)
  }

  const res = await fetch(`${SQUARE_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${store.accessToken}`,
      "Square-Version": "2024-06-04",
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(
      `Square API error [${storeId}] ${res.status} ${res.statusText}: ${body}`
    )
  }

  return res.json() as Promise<T>
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SquareService {
  id: string
  name: string
  description?: string
  durationMinutes?: number
  /** Price in cents */
  priceCents?: number
  /** Formatted price string e.g. "$35.00" */
  priceFormatted?: string
  categoryName?: string
  variationId?: string
}

export interface SquareTeamMember {
  id: string
  givenName: string
  familyName: string
  displayName: string
  jobTitle?: string
  emailAddress?: string
  phoneNumber?: string
  status: "ACTIVE" | "INACTIVE"
}

export interface SquareSubscriptionPlan {
  id: string
  name: string
  description?: string
  /** Price in cents per period */
  priceCents?: number
  priceFormatted?: string
  /** "MONTHLY" | "ANNUAL" etc */
  cadence?: string
  variationId?: string
}

// ─── Services / Catalog ──────────────────────────────────────────────────────

interface CatalogListResponse {
  objects?: CatalogObject[]
  cursor?: string
  errors?: SquareError[]
}

interface CatalogObject {
  type: string
  id: string
  item_data?: {
    name?: string
    description?: string
    category_id?: string
    variations?: CatalogObject[]
    product_type?: string
  }
  item_variation_data?: {
    name?: string
    price_money?: { amount: number; currency: string }
    service_duration?: number // milliseconds
    item_id?: string
  }
  category_data?: {
    name?: string
  }
}

interface SquareError {
  category: string
  code: string
  detail?: string
}

/**
 * Fetch all appointment services for a store from the Square Catalog.
 * Returns an array sorted alphabetically by category then name.
 */
export async function getServices(storeId: SquareStoreId): Promise<SquareService[]> {
  const results: SquareService[] = []
  const categoryNames: Record<string, string> = {}

  let cursor: string | undefined

  // First pass: collect all objects (items + categories)
  const allObjects: CatalogObject[] = []

  do {
    const params = new URLSearchParams({ types: "ITEM,CATEGORY", limit: "200" })
    if (cursor) params.set("cursor", cursor)

    const data = await squareFetch<CatalogListResponse>(
      storeId,
      `/catalog/list?${params}`
    )

    if (data.errors?.length) {
      console.error("Square catalog errors:", data.errors)
      break
    }

    allObjects.push(...(data.objects ?? []))
    cursor = data.cursor
  } while (cursor)

  // Build category name lookup
  for (const obj of allObjects) {
    if (obj.type === "CATEGORY" && obj.category_data?.name) {
      categoryNames[obj.id] = obj.category_data.name
    }
  }

  // Extract services from ITEM objects
  for (const obj of allObjects) {
    if (obj.type !== "ITEM" || !obj.item_data) continue
    // Only include appointment services (skip retail items)
    if (
      obj.item_data.product_type &&
      obj.item_data.product_type !== "APPOINTMENTS_SERVICE"
    )
      continue

    const item = obj.item_data
    const categoryName = item.category_id
      ? (categoryNames[item.category_id] ?? "Services")
      : "Services"

    const variations = item.variations ?? []

    if (variations.length === 0) {
      // No variations — list as a single service
      results.push({
        id: obj.id,
        name: item.name ?? "Unknown",
        description: item.description,
        categoryName,
      })
    } else {
      // Each variation is a bookable service (e.g. "Full Set", "Fill")
      for (const v of variations) {
        if (!v.item_variation_data) continue
        const vd = v.item_variation_data
        const priceCents = vd.price_money?.amount
        const durationMs = vd.service_duration
        const varName = vd.name === "Regular" ? item.name ?? "" : `${item.name ?? ""} — ${vd.name ?? ""}`

        results.push({
          id: obj.id,
          variationId: v.id,
          name: varName.trim(),
          description: item.description,
          categoryName,
          priceCents: priceCents ?? undefined,
          priceFormatted: priceCents != null ? formatMoney(priceCents) : undefined,
          durationMinutes:
            durationMs != null ? Math.round(durationMs / 60000) : undefined,
        })
      }
    }
  }

  // Sort by category then name
  return results.sort((a, b) => {
    const catCmp = (a.categoryName ?? "").localeCompare(b.categoryName ?? "")
    return catCmp !== 0 ? catCmp : a.name.localeCompare(b.name)
  })
}

// ─── Team Members ─────────────────────────────────────────────────────────────

interface TeamMembersSearchResponse {
  team_members?: RawTeamMember[]
  cursor?: string
  errors?: SquareError[]
}

interface RawTeamMember {
  id: string
  given_name?: string
  family_name?: string
  display_name?: string
  email_address?: string
  phone_number?: string
  status?: string
  assigned_locations?: { location_ids?: string[] }
}

/**
 * Fetch active team members assigned to a store's location.
 */
export async function getTeamMembers(
  storeId: SquareStoreId
): Promise<SquareTeamMember[]> {
  const locationId = SQUARE_STORES[storeId].locationId
  const results: SquareTeamMember[] = []
  let cursor: string | undefined

  do {
    const body: Record<string, unknown> = {
      query: {
        filter: {
          location_ids: [locationId],
          status: "ACTIVE",
        },
      },
      limit: 200,
    }
    if (cursor) body.cursor = cursor

    const data = await squareFetch<TeamMembersSearchResponse>(
      storeId,
      "/team-members/search",
      { method: "POST", body: JSON.stringify(body) }
    )

    if (data.errors?.length) {
      console.error("Square team members errors:", data.errors)
      break
    }

    for (const m of data.team_members ?? []) {
      results.push({
        id: m.id,
        givenName: m.given_name ?? "",
        familyName: m.family_name ?? "",
        displayName:
          m.display_name ??
          `${m.given_name ?? ""} ${m.family_name ?? ""}`.trim(),
        emailAddress: m.email_address,
        phoneNumber: m.phone_number,
        status: (m.status as "ACTIVE" | "INACTIVE") ?? "ACTIVE",
      })
    }

    cursor = data.cursor
  } while (cursor)

  return results
}

// ─── Subscription Plans ───────────────────────────────────────────────────────

interface SubscriptionPlansResponse {
  objects?: CatalogObject[]
  cursor?: string
  errors?: SquareError[]
}

// Newer Square accounts store pricing in SUBSCRIPTION_PLAN_VARIATION objects
// that are children of SUBSCRIPTION_PLAN. Older accounts put price directly
// in phases[].recurring_price_money on the parent plan.
interface SubscriptionPlanObject extends CatalogObject {
  subscription_plan_data?: {
    name?: string
    // Older format: price lives here
    phases?: Array<{
      cadence?: string
      recurring_price_money?: { amount: number; currency: string }
    }>
    // Newer format: variations are separate catalog objects
    subscription_plan_variations?: Array<{ id: string }>
  }
}

interface SubscriptionPlanVariationObject extends CatalogObject {
  subscription_plan_variation_data?: {
    name?: string
    subscription_plan_id?: string
    phases?: Array<{
      cadence?: string
      pricing?: {
        price_money?: { amount: number; currency: string }
        price?: { amount: number; currency: string }
      }
      // Some API versions use recurring_price_money at the phase level
      recurring_price_money?: { amount: number; currency: string }
    }>
  }
}

/**
 * Fetch subscription plans from Square Catalog (for memberships).
 *
 * Handles both the old format (price in plan phases) and the new format
 * (price in SUBSCRIPTION_PLAN_VARIATION child objects).
 *
 * Returns plans sorted by price ascending.
 */
export async function getSubscriptionPlans(
  storeId: SquareStoreId
): Promise<SquareSubscriptionPlan[]> {
  // Fetch both plan types in one pass
  const allObjects: CatalogObject[] = []
  let cursor: string | undefined

  do {
    const params = new URLSearchParams({
      types: "SUBSCRIPTION_PLAN,SUBSCRIPTION_PLAN_VARIATION",
      limit: "200",
    })
    if (cursor) params.set("cursor", cursor)

    const data = await squareFetch<SubscriptionPlansResponse>(
      storeId,
      `/catalog/list?${params}`
    )

    if (data.errors?.length) {
      console.error("Square subscription plan errors:", data.errors)
      break
    }

    allObjects.push(...(data.objects ?? []))
    cursor = data.cursor
  } while (cursor)

  // Index variations by their parent plan ID so we can look them up
  const variationsByPlanId = new Map<string, SubscriptionPlanVariationObject[]>()
  for (const obj of allObjects as SubscriptionPlanVariationObject[]) {
    if (obj.type !== "SUBSCRIPTION_PLAN_VARIATION") continue
    const planId = obj.subscription_plan_variation_data?.subscription_plan_id
    if (!planId) continue
    if (!variationsByPlanId.has(planId)) variationsByPlanId.set(planId, [])
    variationsByPlanId.get(planId)!.push(obj)
  }

  const results: SquareSubscriptionPlan[] = []

  for (const obj of allObjects as SubscriptionPlanObject[]) {
    if (obj.type !== "SUBSCRIPTION_PLAN" || !obj.subscription_plan_data) continue

    const plan = obj.subscription_plan_data
    const planName = plan.name ?? "Membership"

    // ── Try new format: price from SUBSCRIPTION_PLAN_VARIATION children ──
    const variations = variationsByPlanId.get(obj.id) ?? []
    if (variations.length > 0) {
      for (const v of variations) {
        const vd = v.subscription_plan_variation_data
        if (!vd) continue
        const phase = vd.phases?.[0]
        // Price can be in pricing.price_money, pricing.price, or recurring_price_money
        const priceCents =
          phase?.pricing?.price_money?.amount ??
          phase?.pricing?.price?.amount ??
          phase?.recurring_price_money?.amount

        const varName = vd.name && vd.name !== planName
          ? `${planName} — ${vd.name}`
          : planName

        results.push({
          id: v.id,
          name: varName,
          description: undefined,
          priceCents: priceCents ?? undefined,
          priceFormatted: priceCents != null ? formatMoney(priceCents) : undefined,
          cadence: phase?.cadence,
          variationId: v.id,
        })
      }
      continue
    }

    // ── Fall back to old format: price in plan phases ──
    const phase = plan.phases?.[0]
    const priceCents = phase?.recurring_price_money?.amount

    results.push({
      id: obj.id,
      name: planName,
      priceCents: priceCents ?? undefined,
      priceFormatted: priceCents != null ? formatMoney(priceCents) : undefined,
      cadence: phase?.cadence,
    })
  }

  // Filter out plans with no price (incomplete/draft plans in Square Dashboard)
  // then sort cheapest first
  return results
    .filter((p) => p.priceCents != null && p.priceCents > 0)
    .sort((a, b) => (a.priceCents ?? 0) - (b.priceCents ?? 0))
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format cents as "$XX.00" */
function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}
