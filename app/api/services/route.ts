/**
 * GET /api/services?store=brows-and-lashes
 * GET /api/services?store=eyebrow-shape
 *
 * Returns services for one store from Square Catalog.
 * Cached server-side for 1 hour (Next.js revalidate).
 */

import { NextRequest, NextResponse } from "next/server"
import { getServices, SQUARE_STORE_IDS } from "@/lib/square"
import type { SquareStoreId } from "@/lib/square"

export const revalidate = 3600 // 1 hour

export async function GET(req: NextRequest) {
  const storeId = req.nextUrl.searchParams.get("store") as SquareStoreId | null

  if (!storeId || !SQUARE_STORE_IDS.includes(storeId)) {
    return NextResponse.json(
      {
        error: `Invalid store. Use one of: ${SQUARE_STORE_IDS.join(", ")}`,
      },
      { status: 400 }
    )
  }

  try {
    const services = await getServices(storeId)
    return NextResponse.json({ services })
  } catch (err) {
    console.error("Square services error:", err)
    return NextResponse.json(
      { error: "Failed to fetch services from Square" },
      { status: 500 }
    )
  }
}
