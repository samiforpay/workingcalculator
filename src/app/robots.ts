import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
} 