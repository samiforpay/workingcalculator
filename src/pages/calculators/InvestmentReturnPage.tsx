import { investmentReturnCalculator } from '@/config/formulas/roi/investment-return'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function InvestmentReturnPage() {
  return <CalculatorPageTemplate formula={investmentReturnCalculator} />
} 