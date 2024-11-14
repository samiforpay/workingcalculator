import { useParams } from 'react-router-dom'
import { calculatorFormulas } from '@/config/formulas'
import { CalculatorLayout } from '@/components/layout/CalculatorLayout'
import type { CalculatorPath } from '@/config/formulas/types'

export default function CalculatorPage() {
  const { type, '*': subtype } = useParams()
  const calculatorPath = subtype ? `${type}/${subtype}` as CalculatorPath : type as CalculatorPath
  const formula = calculatorFormulas[calculatorPath]

  if (!formula) {
    return <div>Calculator not found</div>
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: formula.name }
  ]

  return <CalculatorLayout formula={formula} breadcrumbs={breadcrumbs} />
}