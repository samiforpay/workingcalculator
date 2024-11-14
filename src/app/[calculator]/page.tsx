'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { calculatorFormulas } from '@/config/formulas'
import { CalculatorForm } from '@/components/calculator/CalculatorForm'
import { CalculatorResults } from '@/components/calculator/CalculatorResults'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { generateCalculatorHowToSchema } from '@/lib/seo/calculatorSEO'
import type { CalculationResult, CalculatorPath, Formula } from '@/config/formulas/types'

interface CalculatorPageProps {
  params: {
    calculator: string
  }
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const calculatorPath = params.calculator as CalculatorPath
  const formula = calculatorFormulas[calculatorPath] as unknown as Formula
  if (!formula) notFound()

  const [result, setResult] = useState<CalculationResult | null>(null)
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
    <div className="container mx-auto px-4 py-8">
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

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCalculatorHowToSchema({
            name: formula.name,
            description: formula.description,
            variables: formula.variables
          }))
        }}
      />
    </div>
  )
} 