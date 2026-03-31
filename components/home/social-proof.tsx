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
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border-subtle bg-surface/60 px-6 py-3 backdrop-blur-sm sm:flex-row">
      <div className="flex -space-x-2.5">
        {avatars.map((src, index) => (
          <div
            key={index}
            className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-surface ring-1 ring-border-subtle"
          >
            <Image
              src={src}
              alt={`Customer ${index + 1}`}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            />
          ))}
          <span className="ml-1.5 text-xs font-medium text-foreground">5.0</span>
        </div>
        <p className="text-xs text-muted">
          Loved by 100+ makers who shipped this week
        </p>
      </div>
    </div>
  )
}
