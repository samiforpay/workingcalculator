import { savingsGoalCalculator } from '@/config/formulas/financial/savings-goal'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function SavingsGoalPage() {
  try {
    return <CalculatorPageTemplate formula={savingsGoalCalculator} />
  } catch (error) {
    console.error('Error rendering SavingsGoalPage:', error)
    return (
      <div className="p-4">
        <h1>Error loading calculator</h1>
        <p>There was a problem loading this calculator. Please try again later.</p>
      </div>
    )
  }
} 