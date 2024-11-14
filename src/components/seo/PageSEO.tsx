'use client'

import { usePathname } from 'next/navigation'
import { calculatorSEO } from '@/config/seo'
import { siteConfig } from '@/config/metadata'
import { Metadata } from 'next'

interface PageSEOProps {
  title: string
  description: string
  keywords?: string[]
  type?: 'website' | 'article'
  metadata?: {
    type: string
    publishDate?: string
    updateDate?: string
  }
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  type = 'website',
  metadata,
}: PageSEOProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      type,
      title,
      description,
      ...(metadata && {
        article: {
          publishedTime: metadata.publishDate,
          modifiedTime: metadata.updateDate,
        },
      }),
    },
  }
} 