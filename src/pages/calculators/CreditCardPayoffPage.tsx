import { creditCardPayoffCalculator } from '@/config/formulas/debt/credit-card'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function CreditCardPayoffPage() {
  return <CalculatorPageTemplate formula={creditCardPayoffCalculator} />
} 