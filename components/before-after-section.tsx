// Before/After Gallery
// Add real photos by placing them in public/images/before-after/:
//   ba-1-before.jpg, ba-1-after.jpg
//   ba-2-before.jpg, ba-2-after.jpg  ... up to ba-6
// The component will display them automatically once the files exist.

const pairs = [
  { id: 1, label: "Eyebrow Threading", beforeGradient: "from-stone-200 to-stone-300", afterGradient: "from-rose-100 to-rose-200" },
  { id: 2, label: "Classic Lash Extensions", beforeGradient: "from-stone-200 to-stone-300", afterGradient: "from-violet-100 to-violet-200" },
  { id: 3, label: "Full Face Threading", beforeGradient: "from-stone-200 to-stone-300", afterGradient: "from-amber-100 to-amber-200" },
  { id: 4, label: "Volume Lashes", beforeGradient: "from-stone-200 to-stone-300", afterGradient: "from-sky-100 to-sky-200" },
  { id: 5, label: "Eyebrow Tinting", beforeGradient: "from-stone-200 to-stone-300", afterGradient: "from-teal-100 to-teal-200" },
  { id: 6, label: "Hydrating Facial", beforeGradient: "from-stone-200 to-stone-300", afterGradient: "from-fuchsia-100 to-fuchsia-200" },
]

export function BeforeAfterSection() {
  return (
    <section id="results" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Real Results
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            See the
            <span className="block italic">transformation</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            The proof is in the results. Every service performed by our licensed specialists.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairs.map((pair) => (
            <div key={pair.id} className="space-y-2">
              {/* Before / After side by side */}
              <div className="grid grid-cols-2 gap-2">
                {/* Before */}
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br ${pair.beforeGradient}`} />
                  {/* Real image — uncomment when photo is added */}
                  {/* <Image src={`/images/before-after/ba-${pair.id}-before.jpg`} alt={`${pair.label} before`} fill className="object-cover" /> */}
                  <div className="absolute inset-0 flex items-end p-3">
                    <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase bg-background/80 px-2 py-1 text-foreground/70">
                      Before
                    </span>
                  </div>
                  {/* Placeholder text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-[family-name:var(--font-montserrat)] text-xs text-foreground/30 text-center px-2">
                      Add photo
                    </p>
                  </div>
                </div>
                {/* After */}
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br ${pair.afterGradient}`} />
                  {/* Real image — uncomment when photo is added */}
                  {/* <Image src={`/images/before-after/ba-${pair.id}-after.jpg`} alt={`${pair.label} after`} fill className="object-cover" /> */}
                  <div className="absolute inset-0 flex items-end p-3">
                    <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-wider uppercase bg-primary/80 px-2 py-1 text-primary-foreground">
                      After
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-[family-name:var(--font-montserrat)] text-xs text-foreground/30 text-center px-2">
                      Add photo
                    </p>
                  </div>
                </div>
              </div>
              {/* Label */}
              <p className="font-[family-name:var(--font-montserrat)] text-sm text-center text-muted-foreground">
                {pair.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground/50">
            Drop your before/after photos into{" "}
            <code className="bg-secondary px-1 py-0.5 rounded text-xs">public/images/before-after/</code>{" "}
            and uncomment the Image tags above to go live.
          </p>
        </div>
      </div>
    </section>
  )
}
