import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | UniqSwek Beauty Studios",
  description: "Terms and conditions for services at UniqSwek Beauty Studios in New York City.",
}

export default function TermsPage() {
  const updated = "May 13, 2025"

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
          </div>

          <div className="space-y-10 font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-foreground/80">

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">1. Acceptance of Terms</h2>
              <p>
                By booking an appointment, purchasing a service, or using our website at uniqswek.com, you agree to
                these Terms of Service. These terms apply to both studio locations: Brows &amp; Lashes by UniqSwek
                (Manhattan) and Eyebrow Shape by UniqSwek (Ridgewood, Queens).
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">2. Appointments &amp; Booking</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Appointments may be booked online through our Square Appointments system, by phone, or by walking in.
                  Online bookings are confirmed upon receipt of a confirmation email.
                </li>
                <li>
                  We reserve the right to decline or cancel appointments at our discretion, with notice provided to the client.
                </li>
                <li>
                  Clients are responsible for arriving on time. Late arrivals may result in a shortened service or
                  rescheduling to protect other clients' appointment times.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">3. Cancellation &amp; No-Show Policy</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  We ask for at least <span className="font-medium text-foreground">24 hours&apos; notice</span> to cancel
                  or reschedule an appointment. This allows us to offer your slot to another client.
                </li>
                <li>
                  Repeated no-shows or late cancellations may require a deposit to book future appointments.
                </li>
                <li>
                  For bridal and group bookings, cancellations within 48 hours of the appointment may forfeit any
                  deposit paid.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">4. Memberships &amp; Subscriptions</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Memberships are billed monthly through Square and auto-renew until cancelled.
                </li>
                <li>
                  To cancel a membership, contact us at least 5 days before your next billing date. Cancellations can
                  be processed in-studio, by phone, or by emailing us.
                </li>
                <li>
                  Membership benefits are non-transferable and apply to the member only.
                </li>
                <li>
                  Unused membership services do not roll over to the following month.
                </li>
                <li>
                  We reserve the right to modify membership pricing with 30 days&apos; notice to active members.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">5. Gift Cards</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Gift cards are non-refundable and have no cash value.</li>
                <li>Gift cards may be used at either UniqSwek studio location.</li>
                <li>Gift cards do not expire.</li>
                <li>Lost or stolen gift cards cannot be replaced.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">6. Payments &amp; Refunds</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  All services must be paid in full at the time of service. We accept all major credit/debit cards and
                  cash.
                </li>
                <li>
                  Refunds are not offered for completed services. If you are unsatisfied with a service, please let us
                  know at the time of your visit so we can address it.
                </li>
                <li>
                  In the event of a billing error on a subscription or online purchase, please contact us within 7 days
                  and we will resolve it promptly.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">7. Health &amp; Safety</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Please inform your specialist of any skin conditions, allergies, medications (e.g., Accutane, retinol),
                  or sensitivities before your service. Some services may not be appropriate for certain skin types or
                  conditions.
                </li>
                <li>
                  Clients who appear unwell may be asked to reschedule to protect the health of our team and other clients.
                </li>
                <li>
                  We use new, disposable tools for each client and sanitize all equipment between appointments.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">8. Promotions &amp; Discounts</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Promotional offers cannot be combined unless explicitly stated.</li>
                <li>First-visit discounts apply to new clients only and require a single visit to redeem.</li>
                <li>We reserve the right to end or modify promotions at any time without prior notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">9. Photography &amp; Social Media</h2>
              <p>
                With your consent, we may photograph before/after results for use on our social media channels
                (@browsandlashesnyc, @eyebrowshapenyc) and website. You may opt out at any time — simply let your
                specialist know before your service.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">10. Limitation of Liability</h2>
              <p>
                UniqSwek Beauty Studios is not liable for any allergic reactions or adverse effects resulting from
                undisclosed health conditions, medications, or failure to follow aftercare instructions. All services
                are performed by licensed cosmetologists in accordance with New York State standards. Our liability
                is limited to the cost of the service rendered.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">11. Changes to These Terms</h2>
              <p>
                We may update these Terms of Service at any time. The most current version will be available at this URL.
                Continued use of our services after any changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">12. Contact</h2>
              <p>Questions about these terms? We&apos;re happy to help.</p>
              <div className="mt-4 space-y-1">
                <p>
                  Email:{" "}
                  <a href="mailto:browsandlashesbyuniqswek@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80">
                    browsandlashesbyuniqswek@gmail.com
                  </a>
                </p>
                <p>
                  UES Phone:{" "}
                  <a href="tel:+19173882434" className="text-primary underline underline-offset-2 hover:opacity-80">
                    +1 (917) 388-2434
                  </a>
                </p>
              </div>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              href="/"
              className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to home
            </Link>
            <Link
              href="/privacy"
              className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Privacy Policy
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
