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
                Welcome to Brows and Lashes by UniqSwek, your go-to destination for beauty and self-care on the Upper East Side! We are a premier beauty salon specializing in threading, waxing, facials, and eyelash extensions, committed to enhancing your natural beauty with expert care and precision.
              </p>
              <p>
                Our team of highly trained specialists is passionate about delivering personalized, high-quality services tailored to your unique preferences. Whether you&apos;re shaping your brows with meticulous threading, achieving smooth, radiant skin with our waxing and facial treatments, or adding drama to your eyes with stunning eyelash extensions, we prioritize your comfort and satisfaction every step of the way.
              </p>
              <p>
                At Brows and Lashes, we combine advanced techniques with premium products in a clean, relaxing environment to ensure exceptional results. Your beauty and confidence are our top priorities.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
              <div>
                <p className="text-4xl md:text-5xl font-light text-primary">8+</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-2">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-light text-primary">5K+</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-2">Happy Clients</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-light text-primary">15+</p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-muted-foreground mt-2">Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
