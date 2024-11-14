import { calculators, calculatorCategories } from '@/config/calculators'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import type { CalculatorConfig } from '@/config/formulas/types'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
          Your Finance Calculators
        </h1>
        <p className="text-xl text-blue-700 max-w-2xl mx-auto">
          Free, accurate calculators for all your financial decisions
        </p>
      </section>

      {/* Categories Grid */}
      <div className="space-y-12">
        {Object.entries(calculatorCategories).map(([category, title]) => {
          const categoryCalculators = calculators.filter(calc => calc.category === category)
          if (categoryCalculators.length === 0) return null

          return (
            <Card key={category} className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
                        <Link 
                          to={calculator.href.replace('/', '')} // Remove leading slash
                          className="w-full"
                        >
                          <Button className="w-full group hover:bg-primary hover:text-white">
                            Calculate
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
      </div>
    </div>
  )
}