'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface GalleryImage {
  url: string
  alt: string
}

interface ImageGalleryProps {
  mainImage: GalleryImage | null
  thumbnails: GalleryImage[]
}

export function ImageGallery({ mainImage, thumbnails }: ImageGalleryProps) {
  const allImages = mainImage ? [mainImage, ...thumbnails] : thumbnails
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const activeIndex = hoveredIndex ?? selectedIndex
  const activeImage = allImages[activeIndex] || null

  if (!activeImage) return null

  return (
    <div className="sticky top-24">
      {/* Main image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-accent-subtle/20 shadow-sm">
        {allImages.map((image, i) => (
          <Image
            key={i}
            src={image.url}
            alt={image.alt}
            fill
            className={cn(
              'object-cover transition-opacity duration-300',
              i === activeIndex ? 'opacity-100' : 'opacity-0'
            )}
            priority={i === 0}
          />
        ))}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {allImages.map((image, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                'relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200',
                i === activeIndex
                  ? 'border-accent shadow-sm ring-2 ring-accent/15'
                  : 'border-transparent opacity-50 hover:opacity-100'
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
