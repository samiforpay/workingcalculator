import { businessValuationCalculator } from '@/config/formulas/business-related/business-valuation'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function BusinessValuationPage() {
  return <CalculatorPageTemplate formula={businessValuationCalculator} />
} 