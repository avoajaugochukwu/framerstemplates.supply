import Image from 'next/image'
import { Star } from 'lucide-react'

export function SocialProof() {
  const avatars = [
    '/avatars/Ellipse_172.png',
    '/avatars/Ellipse_173.png',
    '/avatars/Ellipse_174.png',
    '/avatars/Ellipse_175.png',
    '/avatars/Ellipse_176.png',
  ]

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <div className="flex -space-x-3">
        {avatars.map((src, index) => (
          <div
            key={index}
            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-neutral-900"
          >
            <Image
              src={src}
              alt={`Customer ${index + 1}`}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          100+ founders chose our templates
        </p>
      </div>
    </div>
  )
}
