import { mortgageCalculators } from '@/config/calculators'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { CalculatorConfig } from '@/config/formulas/types'

export default function MortgagePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">Mortgage Calculators</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mortgageCalculators.map((calculator: CalculatorConfig) => (
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
                    Calculate
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
} 