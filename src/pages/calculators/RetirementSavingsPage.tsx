import { retirementSavingsCalculator } from '@/config/formulas/retirement/savings'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function RetirementSavingsPage() {
  return <CalculatorPageTemplate formula={retirementSavingsCalculator} />
} 