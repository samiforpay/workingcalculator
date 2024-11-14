import { quarterlyTaxCalculator } from '@/config/formulas/tax/quarterly'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function QuarterlyTaxPage() {
  return <CalculatorPageTemplate formula={quarterlyTaxCalculator} />
} 