import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const title = searchParams.get('title') || 'Financial Calculator'
  const description = searchParams.get('description') || 'Professional financial tools'
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '20px' }}>
            {title}
          </h1>
          <p style={{ fontSize: '30px', color: '#666' }}>
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
} 