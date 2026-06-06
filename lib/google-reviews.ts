export type GoogleReview = {
  authorName: string
  rating: number
  text: string
  relativeTimeDescription: string
}

export type PlaceRating = {
  rating: number
  reviewCount: number
  reviews: GoogleReview[]
}

export async function getPlaceRating(placeId: string): Promise<PlaceRating | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key || !placeId) return null

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=rating,user_ratings_total,reviews` +
      `&reviews_sort=newest` +
      `&language=en` +
      `&key=${key}`

    const res = await fetch(url, {
      next: { revalidate: 86400 }, // refresh once per day
    })

    if (!res.ok) return null

    const data = await res.json()
    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status, data.error_message)
      return null
    }

    return {
      rating: data.result.rating ?? 5,
      reviewCount: data.result.user_ratings_total ?? 0,
      reviews: (data.result.reviews ?? []).map((r: Record<string, unknown>) => ({
        authorName: r.author_name as string,
        rating: r.rating as number,
        text: r.text as string,
        relativeTimeDescription: r.relative_time_description as string,
      })),
    }
  } catch (err) {
    console.error("Failed to fetch Google Place rating:", err)
    return null
  }
}
