import { siteConfig } from '@/config/metadata'

interface MetaTagsProps {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  imageParams?: Record<string, string>
}

export function generateMetaTags({
  title,
  description,
  path,
  type = 'website',
  imageParams = {},
}: MetaTagsProps) {
  const url = `${siteConfig.url}${path}`
  const imageUrl = new URL(`${siteConfig.url}/api/og`)
  
  // Add image parameters
  Object.entries({ title, description, ...imageParams }).forEach(([key, value]) => {
    imageUrl.searchParams.append(key, value)
  })

  return {
    // Basic Meta Tags
    title: {
      default: `${title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`
    },
    description,
    
    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{
        url: imageUrl.toString(),
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl.toString()],
      creator: '@financialtools',
    },
    
    // Additional Meta Tags
    alternates: {
      canonical: url,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      bing: 'your-bing-verification-code',
    },
  }
} 