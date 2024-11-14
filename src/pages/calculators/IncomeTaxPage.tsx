import { incomeTaxCalculator } from '@/config/formulas/tax/income'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function IncomeTaxPage() {
  return <CalculatorPageTemplate formula={incomeTaxCalculator} />
} 