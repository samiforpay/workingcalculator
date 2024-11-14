import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorForm } from './CalculatorForm'
import { CalculatorResults } from './CalculatorResults'
import { useState } from 'react'
import type { Formula } from '@/config/formulas/types'

interface CalculatorPageTemplateProps<T extends Record<string, number>> {
  formula: Formula<T>
}

export function CalculatorPageTemplate<T extends Record<string, number>>({ 
  formula 
}: CalculatorPageTemplateProps<T>) {
  const [result, setResult] = useState<T | null>(null)
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
      <main className="flex-grow container mx-auto px-4 py-12">
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