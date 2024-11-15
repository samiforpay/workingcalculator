import { bondCalculator } from '@/config/formulas/roi/bond'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function BondPage() {
  return <CalculatorPageTemplate formula={bondCalculator} />
} 