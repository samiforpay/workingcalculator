import { roiCalculators, financialCalculators } from '@/config/calculators'
import { siteConfig } from '@/config/metadata'

export async function GET() {
  const calculators = [...roiCalculators, ...financialCalculators]
  const date = new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${siteConfig.name}</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        <language>en</language>
        <lastBuildDate>${date}</lastBuildDate>
        <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
        ${calculators.map(calc => `
          <item>
            <title>${calc.name}</title>
            <link>${siteConfig.url}${calc.href}</link>
            <description>${calc.description}</description>
            <guid isPermaLink="true">${siteConfig.url}${calc.href}</guid>
            <pubDate>${date}</pubDate>
          </item>
        `).join('')}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
} 