import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | UniqSwek Beauty Studios",
  description: "How UniqSwek Beauty Studios collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
          </div>

          <div className="space-y-10 font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-foreground/80">

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">1. Who We Are</h2>
              <p>
                UniqSwek Beauty Studios operates two studio locations in New York City: Brows &amp; Lashes by UniqSwek
                (1240 Lexington Avenue, Manhattan) and Eyebrow Shape by UniqSwek (59-15 71st Ave, Ridgewood, Queens).
                This Privacy Policy explains how we collect, use, and protect information you provide when visiting our
                website at uniqswek.com or interacting with us in-studio.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect the following types of information:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <span className="font-medium text-foreground">Contact information</span> — your name, email address,
                  and phone number, when you submit our email signup form, bridal inquiry form, or contact us directly.
                </li>
                <li>
                  <span className="font-medium text-foreground">Booking information</span> — appointment details,
                  service preferences, and scheduling history, collected through our Square Appointments booking system.
                </li>
                <li>
                  <span className="font-medium text-foreground">Payment information</span> — processed securely by
                  Square. We do not store or have access to your full card number. Square&apos;s privacy policy applies
                  to payment data.
                </li>
                <li>
                  <span className="font-medium text-foreground">Usage data</span> — pages visited, time on site, and
                  interactions, collected automatically via Google Analytics 4 and Vercel Analytics. This data is
                  anonymized and aggregated.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Confirm and manage your appointments</li>
                <li>Send appointment reminders and follow-ups</li>
                <li>Respond to inquiries submitted via our contact or bridal forms</li>
                <li>Send promotional emails and special offers (only if you opted in via our email signup)</li>
                <li>Improve our website and understand how visitors use it</li>
                <li>Process payments and manage membership subscriptions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">4. Email Communications</h2>
              <p>
                If you submit our email signup form, you consent to receive marketing emails from UniqSwek Beauty Studios,
                including promotions, seasonal offers, and service announcements. You can unsubscribe at any time by
                clicking the unsubscribe link in any email or by contacting us directly. We do not sell or rent your
                email address to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">5. Third-Party Services</h2>
              <p className="mb-3">Our website and business operations use the following third-party services, each with their own privacy policies:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li><span className="font-medium text-foreground">Square</span> — online booking, payments, and memberships (squareup.com)</li>
                <li><span className="font-medium text-foreground">Formspree</span> — email form submissions (formspree.io)</li>
                <li><span className="font-medium text-foreground">Google Analytics 4</span> — website analytics (google.com/analytics)</li>
                <li><span className="font-medium text-foreground">Vercel Analytics</span> — website performance (vercel.com)</li>
                <li><span className="font-medium text-foreground">Behold</span> — Instagram feed display (behold.so)</li>
              </ul>
              <p className="mt-3">
                We do not control the privacy practices of these services and encourage you to review their respective policies.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">6. Cookies &amp; Tracking</h2>
              <p>
                Our website uses cookies and similar technologies for analytics and to improve your browsing experience.
                Google Analytics uses cookies to understand site usage patterns. You can opt out of Google Analytics
                tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:opacity-80"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">7. Data Retention &amp; Security</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with legal
                obligations. We take reasonable precautions to protect your information, including using HTTPS encryption
                on our website. Payment data is handled entirely by Square&apos;s PCI-compliant systems.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">8. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Request a copy of the personal information we hold about you</li>
                <li>Ask us to correct inaccurate information</li>
                <li>Ask us to delete your information (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:browsandlashesbyuniqswek@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80">
                  browsandlashesbyuniqswek@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">9. Children&apos;s Privacy</h2>
              <p>
                Our website is not directed at children under 13. We do not knowingly collect personal information from
                children. If you believe we have collected information from a child, please contact us and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The most current version will always be available at
                this URL with the updated date noted at the top.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-foreground text-base mb-3">11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please reach out:</p>
              <div className="mt-4 space-y-1">
                <p><span className="font-medium text-foreground">UniqSwek Beauty Studios</span></p>
                <p>Brows &amp; Lashes: 1240 Lexington Ave, New York, NY 10028</p>
                <p>Eyebrow Shape: 59-15 71st Ave, Ridgewood, NY 11385</p>
                <p>
                  Email:{" "}
                  <a href="mailto:browsandlashesbyuniqswek@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80">
                    browsandlashesbyuniqswek@gmail.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
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
              href="/terms"
              className="font-[family-name:var(--font-montserrat)] text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
