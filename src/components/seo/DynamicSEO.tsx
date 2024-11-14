import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/metadata'

interface DynamicSEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  calculator?: {
    name: string
    description: string
  }
}

export function DynamicSEO({ 
  title, 
  description, 
  keywords = [], 
  image,
  calculator
}: DynamicSEOProps) {
  const pathname = usePathname()
  const url = `${siteConfig.url}${pathname}`
  
  const pageTitle = title 
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name
  
  const pageDescription = description || siteConfig.description
  const pageImage = image || siteConfig.ogImage

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Rest of the component */}
    </Head>
  )
} 