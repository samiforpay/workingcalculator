import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/metadata'

const categories = [
  {
    title: 'ROI Calculators',
    description: 'Return on Investment calculators for business, real estate, and marketing',
    slug: 'roi',
    subcategories: ['general', 'real-estate', 'marketing', 'business', 'stock']
  },
  {
    title: 'Financial Calculators',
    description: 'Personal finance calculators for tax, wealth, retirement, and more',
    slug: 'financial',
    subcategories: ['tax', 'wealth', 'retirement', 'investment', 'debt', 'emergency']
  }
]

export async function GET() {
  const date = new Date().toUTCString()
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <categories>
      ${categories.map(cat => `
        <category>
          <title>${cat.title}</title>
          <description>${cat.description}</description>
          <url>${siteConfig.url}/#${cat.slug}-calculators</url>
          <lastModified>${date}</lastModified>
          <subcategories>
            ${cat.subcategories.map(sub => `
              <subcategory>
                <name>${sub}</name>
                <url>${siteConfig.url}/${cat.slug}/${sub}</url>
              </subcategory>
            `).join('')}
          </subcategories>
        </category>
      `).join('')}
    </categories>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
} 