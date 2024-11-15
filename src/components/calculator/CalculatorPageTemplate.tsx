import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorForm } from './CalculatorForm'
import { CalculatorResults } from './CalculatorResults'
import { useState } from 'react'
import type { Formula, BaseResult } from '@/config/formulas/types'
import { calculators } from '@/config/calculators'

interface CalculatorPageTemplateProps<T extends BaseResult> {
  formula: Formula<T>
}

export function CalculatorPageTemplate<T extends BaseResult>({ 
  formula 
}: CalculatorPageTemplateProps<T>) {
  const [result, setResult] = useState<T | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Find calculator config to get the color
  const calculatorConfig = Object.values(calculators).flat().find(calc => 
    calc.name === formula.name
  )
  const bgColor = calculatorConfig?.color || 'bg-gray-50'

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

        {formula.longDescription && (
          <Card className="mt-8">
            <CardContent className={`pt-6 ${bgColor} bg-opacity-5 rounded-lg`}>
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About {formula.name}</h2>
                <div 
                  className="space-y-4"
                  dangerouslySetInnerHTML={{ __html: formula.longDescription }}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  )
} 