import { savingsGoalCalculator } from '@/config/formulas/financial-savings/savings-goal'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function SavingsGoalPage() {
  return <CalculatorPageTemplate formula={savingsGoalCalculator} />
} 
