import { portfolioRebalancingCalculator } from '@/config/formulas/investment/portfolio'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function PortfolioRebalancingPage() {
  return <CalculatorPageTemplate formula={portfolioRebalancingCalculator} />
} 