import { compoundInterestCalculator } from '@/config/formulas/financial/compound'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function CompoundInterestPage() {
  try {
    return <CalculatorPageTemplate formula={compoundInterestCalculator} />
  } catch (error) {
    console.error('Error rendering CompoundInterestPage:', error)
    return (
      <div className="p-4">
        <h1>Error loading calculator</h1>
        <p>There was a problem loading this calculator. Please try again later.</p>
      </div>
    )
  }
} 