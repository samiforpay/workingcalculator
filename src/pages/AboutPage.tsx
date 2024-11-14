import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
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
    </div>
  )
}