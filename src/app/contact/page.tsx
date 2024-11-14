import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { generatePageMetadata } from '@/components/seo/PageSEO'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us - Your Financial Tools Support',
  description: 'Get in touch with our team for support with our financial calculators or to provide feedback.',
  keywords: ['contact', 'support', 'help', 'feedback'],
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="w-full min-h-[150px] p-3 border rounded-md"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* Schema.org markup for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Your Financial Tools',
            description: 'Professional financial calculators and tools',
            url: 'https://yourfinancialtools.com',
            email: 'support@yourfinancialtools.com',
            telephone: '+1-555-123-4567',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Financial Street',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10001',
              addressCountry: 'US'
            },
            openingHours: 'Mo-Fr 09:00-17:00',
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