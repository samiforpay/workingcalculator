import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { generatePageMetadata } from '@/components/seo/PageSEO'

interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: {
    name: string
    title: string
  }
  publishDate: string
  updateDate?: string
  keywords: string[]
}

// This would typically come from a CMS or database
const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  // Mock data for example
  return {
    slug: 'understanding-roi',
    title: 'Understanding ROI: A Complete Guide',
    description: 'Learn everything you need to know about Return on Investment (ROI) calculations.',
    content: '...',
    author: {
      name: 'John Doe',
      title: 'Financial Analyst'
    },
    publishDate: '2024-01-01',
    keywords: ['ROI', 'return on investment', 'financial calculations', 'investment returns']
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) return {}

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    metadata: {
      type: 'article',
      publishDate: post.publishDate,
      updateDate: post.updateDate,
    }
  })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
            <div className="text-gray-600">
              By {post.author.name}, {post.author.title}
            </div>
            <time dateTime={post.publishDate} className="text-sm text-gray-500">
              Published on {new Date(post.publishDate).toLocaleDateString()}
            </time>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            {post.content}
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* Schema.org markup for BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            author: {
              '@type': 'Person',
              name: post.author.name,
              jobTitle: post.author.title
            },
            datePublished: post.publishDate,
            dateModified: post.updateDate || post.publishDate,
            publisher: {
              '@type': 'Organization',
              name: 'Your Financial Tools',
              logo: {
                '@type': 'ImageObject',
                url: 'https://yourfinancialtools.com/logo.png'
              }
            }
          })
        }}
      />
    </div>
  )
} 