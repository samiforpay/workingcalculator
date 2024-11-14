import { investmentReturnsCalculator } from '@/config/formulas/investment/returns'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function InvestmentReturnsPage() {
  return <CalculatorPageTemplate formula={investmentReturnsCalculator} />
} 