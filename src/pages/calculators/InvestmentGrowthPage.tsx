import { investmentGrowthCalculator } from '@/config/formulas/financial-savings/investment-growth'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function InvestmentGrowthPage() {
  return <CalculatorPageTemplate formula={investmentGrowthCalculator} />
} 