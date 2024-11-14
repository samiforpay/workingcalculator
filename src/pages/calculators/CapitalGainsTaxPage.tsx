import { capitalGainsTaxCalculator } from '@/config/formulas/tax/capital-gains'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function CapitalGainsTaxPage() {
  return <CalculatorPageTemplate formula={capitalGainsTaxCalculator} />
} 