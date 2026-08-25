// Shared gift card URL (e.g. for the memberships page footer note)
// Each store also has its own giftCardUrl for store-specific links.
export const GIFT_CARD_URL = "https://app.squareup.com/gift/MLYHY6BNH9Q3R/order"

export const STORES = [
  {
    id: "brows-and-lashes",
    name: "Brows & Lashes",
    fullName: "Brows & Lashes by UniqSwek",
    neighborhood: "Upper East Side, Manhattan",
    address: "1240 Lexington Avenue",
    cityStateZip: "New York, NY 10028",
    city: "New York",
    state: "NY",
    zip: "10028",
    phone: "+1 (917) 388-2434",
    phoneHref: "tel:+19173882434",
    hours: {
      weekdays: "Monday – Friday: 9am – 8pm",
      saturday: "Saturday: 10am – 8pm",
      sunday: "Sunday: 10am – 7pm",
      schema: ["Mo-Fr 09:00-20:00", "Sa 10:00-20:00", "Su 10:00-19:00"],
    },
    instagram: "@browsandlashesnyc",
    instagramUrl: "https://www.instagram.com/browsandlashesnyc",
    bookingUrl:
      "https://book.squareup.com/appointments/4t8q4a3w43qqpa/location/LJDRXPJBMD5Y2/services?rwg_token=AFd1xnFwA5c7P3Zb7Kpt8pLOgW-9UZc_586SRt9tceevn64d8khlN7HJIS6NLrdsj8cijlavItegsDD9Kw5iZkX95W13wCdprw%3D%3D",
    giftCardUrl: "https://app.squareup.com/gift/MLYHY6BNH9Q3R/order",
    googleReviewUrl: "https://g.page/r/CUN4yeXaRdrwEAE/review",
    yelpUrl: "https://www.yelp.com/biz/brows-and-lashes-new-york-5",
    googleMapsUrl: "https://maps.app.goo.gl/DfKPeZZg7Hhi3Pzc6",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.5!2d-73.9565!3d40.7825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258a2b1c3b5e7%3A0x1234567890abcdef!2s1240%20Lexington%20Ave%2C%20New%20York%2C%20NY%2010028!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus",
    transitMapSrc: "https://storage.googleapis.com/maps-solutions-vsslzlwtwm/commutes/12vn/commutes.html",
  },
  {
    id: "eyebrow-shape",
    name: "Eyebrow Shape",
    fullName: "Eyebrow Shape by UniqSwek",
    neighborhood: "Ridgewood, Queens",
    address: "59-15 71st Ave",
    cityStateZip: "Ridgewood, NY 11385",
    city: "Ridgewood",
    state: "NY",
    zip: "11385",
    phone: "(347) 889-5027",
    phoneHref: "tel:+13478895027",
    hours: {
      weekdays: "Monday – Saturday: 10am – 8pm",
      sunday: "Sunday: 10am – 7pm",
      schema: ["Mo-Sa 10:00-20:00", "Su 10:00-19:00"],
    },
    instagram: "@eyebrowshapenyc",
    instagramUrl: "https://www.instagram.com/eyebrowshapenyc",
    bookingUrl:
      "https://book.squareup.com/appointments/l5f8uasy444v40/location/LPT50K5SGRJTC/services?rwg_token=AFd1xnEaECUSkKyBXSkHBl1EvPjIY8g4A3MnG3OXAB2IRwUjK5hoqRcJoOgU2C2zyrLyzyaCCD9kreZXo4n4Klyh6i8ZeCoVaQ%3D%3D",
    giftCardUrl: "https://app.squareup.com/gift/MLCDJZEEFWEJ0/order",
    googleReviewUrl: "https://g.page/r/CWe4SgtByzcwEAE/review",
    yelpUrl: "https://www.yelp.com/biz/eyebrow-shape-by-uniqswek-new-york",
    googleMapsUrl: "https://maps.app.goo.gl/M6q94xZzZkQD9NXh7",
    mapSrc:
      "https://maps.google.com/maps?q=59-15+71st+Ave,+Ridgewood,+NY+11385&output=embed",
    transitMapSrc: "https://storage.googleapis.com/maps-solutions-vsslzlwtwm/locator-plus/gyhj/locator-plus.html",
  },
] as const

export type Store = (typeof STORES)[number]
