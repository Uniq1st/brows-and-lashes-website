import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-sm">
              <Image
                src="/images/about.jpg"
                alt="Brows and Lashes by UniqSwek studio"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-primary/30 rounded-sm -z-10" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Where beauty becomes
              <span className="block italic">an art form</span>
            </h2>
            <div className="space-y-6 font-[family-name:var(--font-montserrat)] text-muted-foreground font-light leading-relaxed">
              <p>
                UniqSwek was founded by <span className="text-foreground font-medium">Swekchha Luitel</span> with one vision: bring expert, precision beauty services to New York City. What started as a single studio on the Upper East Side of Manhattan has grown into two NYC locations — a testament to the trust and love of our incredible clients.
              </p>
              <p>
                Our team of highly trained specialists is passionate about delivering personalized, high-quality services tailored to your unique preferences. Whether you&apos;re shaping your brows with meticulous threading, achieving smooth, radiant skin with our waxing and facial treatments, or adding drama to your eyes with stunning lash extensions, we prioritize your comfort and satisfaction every step of the way.
              </p>
              <p>
                At UniqSwek, we combine advanced techniques with premium products in a clean, relaxing environment. Your beauty and confidence are our top priorities — and always will be.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-border">
              <div>
                <p className="text-4xl md:text-5xl font-light text-primary">#2</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-2">On Google Maps · UES</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-light text-primary">200+</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-2">Five-Star Reviews</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-light text-primary">8+</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-2">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-light text-primary">5K+</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-2">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
