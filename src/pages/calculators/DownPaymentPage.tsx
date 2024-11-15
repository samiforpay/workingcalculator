import { downPaymentCalculator } from '@/config/formulas/mortgage/down-payment'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function DownPaymentPage() {
  return <CalculatorPageTemplate formula={downPaymentCalculator} />
} 