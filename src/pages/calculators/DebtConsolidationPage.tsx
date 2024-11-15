import { debtConsolidationCalculator } from '@/config/formulas/debt/consolidation'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function DebtConsolidationPage() {
  return <CalculatorPageTemplate formula={debtConsolidationCalculator} />
} 