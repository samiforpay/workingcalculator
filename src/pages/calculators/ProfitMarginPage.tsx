import { profitMarginCalculator } from '@/config/formulas/business-related/profit-margin'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function ProfitMarginPage() {
  return <CalculatorPageTemplate formula={profitMarginCalculator} />
} 