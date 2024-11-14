import { calculators, calculatorCategories } from '@/config/calculators'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { CalculatorConfig } from '@/config/formulas/types'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-blue-50 to-blue-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
          Your Finance Calculators
        </h1>
        <p className="text-xl text-blue-700 max-w-2xl mx-auto">
          Free, accurate calculators for all your financial decisions
        </p>
      </section>

      {/* Categories Grid */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {Object.entries(calculatorCategories).map(([category, title]) => {
          const categoryCalculators = calculators.filter(calc => calc.category === category)
          if (categoryCalculators.length === 0) return null

          return (
            <Card key={category} className="mb-12 overflow-hidden shadow-lg">
              <CardHeader className={`bg-gradient-to-r from-${category}-500 to-${category}-600 text-white`}>
                <CardTitle className="text-3xl font-bold">{title}</CardTitle>
                <CardDescription className="text-white/90 text-lg">
                  Financial tools for better decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryCalculators.map((calculator: CalculatorConfig) => (
                    <Card key={calculator.href} className="h-full hover:shadow-xl transition-all duration-300">
                      <CardHeader className={`${calculator.color} bg-opacity-10`}>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-800">{calculator.name}</CardTitle>
                          <calculator.icon className={`h-6 w-6 ${calculator.color} text-opacity-80`} />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-gray-600 mb-4 min-h-[3rem]">{calculator.description}</p>
                        <Link to={calculator.href}>
                          <Button className="w-full group hover:bg-primary hover:text-white">
                            Calculate Now
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </main>

      <Footer />
    </div>
  )
}
