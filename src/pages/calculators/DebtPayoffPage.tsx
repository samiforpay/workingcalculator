import { debtPayoffCalculator } from '@/config/formulas/debt/payoff'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function DebtPayoffPage() {
  return <CalculatorPageTemplate formula={debtPayoffCalculator} />
} 