import { breakEvenCalculator } from '@/config/formulas/business/break-even'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function BreakEvenPage() {
  return <CalculatorPageTemplate formula={breakEvenCalculator} />
} 