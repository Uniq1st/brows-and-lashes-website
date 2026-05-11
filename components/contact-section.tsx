import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Visit Us
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Find us in the heart of
            <span className="block italic">New York City</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <div className="aspect-square lg:aspect-auto lg:min-h-[500px] bg-secondary relative overflow-hidden rounded-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.34194156103!2d-74.03927096447754!3d40.75904032920749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Brows and Lashes by UniqSwek location"
              className="absolute inset-0"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-8 lg:pl-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
                  123 Beauty Lane, Suite 4B<br />
                  Manhattan, New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Phone</h3>
                <a 
                  href="tel:+12125551234" 
                  className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  (212) 555-1234
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <a 
                  href="mailto:hello@uniqswek.com" 
                  className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  hello@uniqswek.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Hours</h3>
                <div className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light space-y-1">
                  <p>Tuesday - Friday: 10am - 7pm</p>
                  <p>Saturday: 9am - 6pm</p>
                  <p>Sunday: 11am - 5pm</p>
                  <p>Monday: Closed</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light hover:text-primary transition-colors"
                >
                  @BrowsLashesUniqSwek
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
