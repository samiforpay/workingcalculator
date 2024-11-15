import { portfolioRebalancingCalculator } from '@/config/formulas/roi/portfolio-rebalancing'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function PortfolioRebalancingPage() {
  return <CalculatorPageTemplate formula={portfolioRebalancingCalculator} />
} 