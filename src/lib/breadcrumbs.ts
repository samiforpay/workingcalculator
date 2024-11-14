import { siteConfig } from '@/config/metadata'

interface BreadcrumbItem {
  name: string
  url?: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url ? `${siteConfig.url}${item.url}` : undefined
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  }
}

export function generateBreadcrumbList(items: BreadcrumbItem[]) {
  return items.map((item, index) => ({
    name: item.name,
    url: item.url,
    isLast: index === items.length - 1
  }))
} 