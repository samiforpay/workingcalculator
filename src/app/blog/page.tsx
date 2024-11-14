import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { generatePageMetadata } from '@/components/seo/PageSEO'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata({
  title: 'Financial Calculators Blog - Tips & Guides',
  description: 'Learn about financial calculations, ROI analysis, and investment strategies with our expert guides and tutorials.',
  keywords: ['financial blog', 'calculator guides', 'ROI tutorials', 'investment tips'],
})

// This would typically come from a CMS or database
const blogPosts = [
  {
    slug: 'understanding-roi',
    title: 'Understanding ROI: A Complete Guide',
    description: 'Learn everything you need to know about Return on Investment (ROI) calculations.',
    publishDate: '2024-01-01',
    category: 'ROI',
  },
  {
    slug: 'investment-strategies',
    title: 'Essential Investment Strategies for Beginners',
    description: 'A comprehensive guide to investment strategies and calculations.',
    publishDate: '2024-01-02',
    category: 'Investments',
  },
  // Add more blog posts...
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Financial Calculator Blog</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-sm text-blue-600 mb-2">{post.category}</div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <time dateTime={post.publishDate} className="text-sm text-gray-500">
                    {new Date(post.publishDate).toLocaleDateString()}
                  </time>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />

      {/* Schema.org markup for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Financial Calculator Blog',
            description: 'Expert guides and tutorials about financial calculations and investment strategies',
            url: 'https://yourfinancialtools.com/blog',
            publisher: {
              '@type': 'Organization',
              name: 'Your Financial Tools',
              logo: {
                '@type': 'ImageObject',
                url: 'https://yourfinancialtools.com/logo.png'
              }
            },
            blogPost: blogPosts.map(post => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              datePublished: post.publishDate,
              url: `https://yourfinancialtools.com/blog/${post.slug}`,
              author: {
                '@type': 'Organization',
                name: 'Your Financial Tools'
              }
            }))
          })
        }}
      />
    </div>
  )
} 