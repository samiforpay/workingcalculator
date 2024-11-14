import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { roiCalculators, financialCalculators } from '@/config/calculators'
import { generatePageMetadata } from '@/components/seo/PageSEO'
import Link from 'next/link'

interface SearchPageProps {
  searchParams: { q?: string }
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = searchParams.q || ''
  return generatePageMetadata({
    title: `Search Results for "${query}" - Financial Calculators`,
    description: `Find financial calculators matching your search for "${query}". Browse our collection of ROI, investment, and tax calculators.`,
    keywords: ['calculator search', 'financial tools', query],
  })
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || ''
  const allCalculators = [...roiCalculators, ...financialCalculators]
  
  const results = allCalculators.filter(calc => 
    calc.name.toLowerCase().includes(query) ||
    calc.description.toLowerCase().includes(query)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">
          {query ? `Search Results for "${query}"` : 'All Calculators'}
        </h1>

        {results.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((calc) => (
              <Link key={calc.href} href={calc.href}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className={`${calc.color}`}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{calc.name}</CardTitle>
                      <calc.icon className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-600">{calc.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No calculators found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />

      {/* Schema.org markup for SearchResults */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SearchResultsPage',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: results.length,
              itemListElement: results.map((calc, index) => ({
                '@type': 'SoftwareApplication',
                position: index + 1,
                name: calc.name,
                description: calc.description,
                applicationCategory: 'FinanceApplication',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}${calc.href}`
              }))
            }
          })
        }}
      />
    </div>
  )
} 