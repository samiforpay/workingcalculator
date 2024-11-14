import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { generatePageMetadata } from '@/components/seo/PageSEO'

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us - Financial Calculator Experts',
  description: 'Learn about our mission to provide free, accurate financial calculators to help you make better financial decisions.',
  keywords: ['about us', 'financial tools', 'calculator experts', 'financial planning'],
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">About Your Financial Tools</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <section>
              <h2>Our Mission</h2>
              <p>
                At Your Financial Tools, we believe that everyone should have access to professional-grade
                financial calculators to make informed decisions about their money.
              </p>
            </section>

            <section>
              <h2>Why Choose Our Calculators?</h2>
              <ul>
                <li>Accurate calculations based on industry standards</li>
                <li>Easy to use interface with helpful explanations</li>
                <li>Free access to all tools</li>
                <li>Regular updates to reflect current financial practices</li>
              </ul>
            </section>

            <section>
              <h2>Our Expertise</h2>
              <p>
                Our team consists of financial experts, software engineers, and user experience
                designers working together to create the best financial calculation tools.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                Have questions or suggestions? We'd love to hear from you. Contact our team
                at support@yourfinancialtools.com
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* Schema.org markup for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Your Financial Tools',
            description: 'Professional financial calculators and tools',
            url: 'https://yourfinancialtools.com',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'support@yourfinancialtools.com',
              contactType: 'customer service'
            },
            sameAs: [
              'https://twitter.com/financialtools',
              'https://facebook.com/financialtools',
              'https://linkedin.com/company/financialtools'
            ]
          })
        }}
      />
    </div>
  )
} 