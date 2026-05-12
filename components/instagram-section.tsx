import { Instagram } from "lucide-react"
import { STORES } from "@/lib/stores"

export function InstagramSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Follow Along
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4">
            Daily inspiration
            <span className="block italic">on Instagram</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light max-w-xl mx-auto">
            Real results, every day. Follow our studios for before/afters, new looks, and behind-the-scenes moments.
          </p>
        </div>

        {/* Instagram handle cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {STORES.map((store) => (
            <a
              key={store.id}
              href={store.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-6 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 via-fuchsia-500 to-orange-400 flex items-center justify-center shrink-0">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
                  {store.neighborhood}
                </p>
                <p className="font-medium text-lg group-hover:text-primary transition-colors">{store.instagram}</p>
                <p className="font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground">
                  Follow for daily content →
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Placeholder grid — replace with live feed via Behold.so or Instagram API */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            "from-rose-200 to-pink-300",
            "from-violet-200 to-purple-300",
            "from-amber-200 to-orange-300",
            "from-teal-200 to-cyan-300",
            "from-sky-200 to-blue-300",
            "from-fuchsia-200 to-rose-300",
          ].map((gradient, i) => (
            <a
              key={i}
              href={STORES[i % 2 === 0 ? 0 : 1].instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-square relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>

        <p className="text-center font-[family-name:var(--font-montserrat)] text-xs text-muted-foreground/50 mt-4">
          Grid updates automatically when connected to Instagram API ·
          <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="underline hover:text-muted-foreground ml-1">
            Connect live feed →
          </a>
        </p>
      </div>
    </section>
  )
}
