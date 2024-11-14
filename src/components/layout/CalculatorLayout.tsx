import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalculatorForm } from "@/components/calculator/CalculatorForm"
import { CalculatorResults } from "@/components/calculator/CalculatorResults"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { calculatorFormulas } from "@/config/formulas"
import type { Formula, CalculationResult } from "@/config/formulas/types"
import { useState } from "react"

interface CalculatorLayoutProps {
  formula: Formula
  breadcrumbs: {
    label: string
    href?: string
  }[]
}

export function CalculatorLayout({ formula, breadcrumbs }: CalculatorLayoutProps) {
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
      <Breadcrumb items={breadcrumbs} />
      
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
    </div>
  )
} 