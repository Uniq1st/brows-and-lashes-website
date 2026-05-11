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
                Welcome to Brows and Lashes by UniqSwek, a sanctuary of beauty nestled in the heart of New York City. Founded with a passion for enhancing natural beauty, our studio has become a haven for those seeking exceptional brow and lash services.
              </p>
              <p>
                Our team of certified artists brings years of expertise and an unwavering commitment to perfection. We believe that every face tells a unique story, and our mission is to frame that story beautifully.
              </p>
              <p>
                Using only premium products and the latest techniques, we create looks that are as unique as you are—whether you prefer subtle elegance or bold glamour.
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
