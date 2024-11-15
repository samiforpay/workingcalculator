import { homeAffordabilityCalculator } from '@/config/formulas/mortgage/home-affordability'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function HomeAffordabilityPage() {
  return <CalculatorPageTemplate formula={homeAffordabilityCalculator} />
} 