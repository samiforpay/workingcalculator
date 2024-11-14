import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Your Financial Tools',
  description: 'Professional financial calculators and tools',
  url: 'https://yourfinancialtools.com',
  ogImage: 'https://yourfinancialtools.com/og.png',
  keywords: [
    'financial calculator',
    'ROI calculator',
    'investment calculator',
    'tax calculator',
    'retirement calculator',
    'debt calculator'
  ]
}

export function generateMetadata(
  title?: string,
  description?: string,
  path?: string
): Metadata {
  const displayTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name
  
  const displayDescription = description || siteConfig.description
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url

  return {
    title: displayTitle,
    description: displayDescription,
    openGraph: {
      title: displayTitle,
      description: displayDescription,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description: displayDescription,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: url,
    },
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
  }
} 