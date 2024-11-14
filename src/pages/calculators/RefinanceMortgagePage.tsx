import { refinanceCalculator } from '@/config/formulas/mortgage/refinance'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function RefinanceMortgagePage() {
  return <CalculatorPageTemplate formula={refinanceCalculator} />
} 