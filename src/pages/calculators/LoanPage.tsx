import { loanCalculator } from '@/config/formulas/debt/loan'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function LoanPage() {
  return <CalculatorPageTemplate formula={loanCalculator} />
} 