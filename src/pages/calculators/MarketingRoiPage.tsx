import { marketingRoiCalculator } from '@/config/formulas/roi/marketing'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function MarketingRoiPage() {
  return <CalculatorPageTemplate formula={marketingRoiCalculator} />
} 