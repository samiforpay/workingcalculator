import { cashFlowCalculator } from '@/config/formulas/business-related/cash-flow'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function CashFlowPage() {
  return <CalculatorPageTemplate formula={cashFlowCalculator} />
} 