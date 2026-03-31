import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Framer Templates — Free Framer Templates to Ship Your Site Faster'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0b 0%, #18181b 50%, #0a0a0b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            Framer Templates
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#a1a1aa',
              textAlign: 'center',
              maxWidth: '700px',
            }}
          >
            Free, polished templates to ship your site faster
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: 'white',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              framertemplates.supply
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
