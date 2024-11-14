'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { calculatorFormulas } from '@/config/formulas'
import { CalculatorForm } from '@/components/calculator/CalculatorForm'
import { CalculatorResults } from '@/components/calculator/CalculatorResults'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Formula, BaseCalculationResult, CalculatorPath } from '@/config/formulas/types'

interface CalculatorPageProps {
  params: {
    slug: string[]
  }
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const calculatorPath = params.slug.join('/') as CalculatorPath
  console.log('Calculator path:', calculatorPath)
  
  const formula = calculatorFormulas[calculatorPath] as Formula
  
  if (!formula) {
    console.error(`No formula found for path: ${calculatorPath}`)
    notFound()
  }

  const [result, setResult] = useState<BaseCalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async (inputs: Record<string, number>) => {
    setIsCalculating(true)
    try {
      const calculationResult = formula.calculate(inputs)
      setResult(calculationResult)
    } catch (error) {
      console.error('Calculation error:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{formula.name}</CardTitle>
            <p className="text-gray-600">{formula.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <CalculatorForm 
                  formula={formula}
                  onCalculate={handleCalculate}
                  isCalculating={isCalculating}
                />
              </div>
              <div>
                {result && (
                  <CalculatorResults 
                    result={result}
                    formatResult={formula.formatResult}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
} 