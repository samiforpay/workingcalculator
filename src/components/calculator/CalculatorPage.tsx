import { useParams } from 'react-router-dom'
import { calculatorFormulas } from '@/config/formulas'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorForm } from './CalculatorForm'
import { CalculatorResults } from './CalculatorResults'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useState } from 'react'
import type { Formula } from '@/config/formulas/types'

type CalculationResult = Record<string, number>

export function CalculatorPage() {
  const params = useParams()
  const category = params.category || ''
  const type = params.type || ''
  const calculatorPath = `${category}/${type}` as keyof typeof calculatorFormulas

  const formula = calculatorFormulas[calculatorPath] as Formula<CalculationResult>

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  console.log('Calculator path:', calculatorPath)
  console.log('Available formulas:', Object.keys(calculatorFormulas))

  if (!formula) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-600">Calculator not found for path: {calculatorPath}</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

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