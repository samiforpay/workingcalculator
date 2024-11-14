import { mortgageCalculator } from '@/config/formulas/mortgage/basic'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function BasicMortgagePage() {
  return <CalculatorPageTemplate formula={mortgageCalculator} />
} 
