import { retirementContributionsCalculator } from '@/config/formulas/tax/retirement'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function RetirementContributionsPage() {
  return <CalculatorPageTemplate formula={retirementContributionsCalculator} />
} 