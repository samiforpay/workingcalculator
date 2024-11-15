import { amortizationCalculator } from '@/config/formulas/mortgage/amortization'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function AmortizationPage() {
  return <CalculatorPageTemplate formula={amortizationCalculator} />
} 