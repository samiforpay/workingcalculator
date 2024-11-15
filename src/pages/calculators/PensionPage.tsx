import { pensionCalculator } from '@/config/formulas/financial-savings/pension'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function PensionPage() {
  return <CalculatorPageTemplate formula={pensionCalculator} />
} 