import { wealthTaxCalculator } from '@/config/formulas/tax/wealth'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function WealthTaxPage() {
  return <CalculatorPageTemplate formula={wealthTaxCalculator} />
} 