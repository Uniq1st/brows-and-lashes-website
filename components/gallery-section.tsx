"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Perfectly shaped eyebrow threading result", category: "Brows" },
  { src: "/images/gallery-2.jpg", alt: "Volume lash extensions — dramatic and full", category: "Lashes" },
  { src: "/images/gallery-3.jpg", alt: "Eyebrow tinting for deeper, defined arches", category: "Brows" },
  { src: "/images/gallery-4.jpg", alt: "Classic lash extensions — natural and wispy", category: "Lashes" },
  { src: "/images/gallery-5.jpg", alt: "Full face threading — clean and flawless finish", category: "Brows" },
  { src: "/images/gallery-6.jpg", alt: "Hybrid lash extensions — textured dimension", category: "Lashes" },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Our Work
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Transformations that
            <span className="block italic">speak for themselves</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground font-light">
            Browse our portfolio of stunning brow and lash transformations. Each result is tailored to enhance our client&apos;s natural beauty.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <p className="font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-card">
                    {image.category}
                  </p>
                  <p className="text-card text-xs mt-1">Click to view</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-16">
          <p className="font-[family-name:var(--font-montserrat)] text-muted-foreground mb-4">
            See more of our work
          </p>
          <a
            href="https://www.instagram.com/browsandlashesnyc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm tracking-wider uppercase text-primary hover:underline underline-offset-4"
          >
            Follow us on Instagram →
          </a>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent">
          {selectedImage && (
            <div className="relative aspect-square">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
