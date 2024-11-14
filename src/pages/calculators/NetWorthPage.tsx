import { netWorthCalculator } from '@/config/formulas/financial-savings/net-worth'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function NetWorthPage() {
  return <CalculatorPageTemplate formula={netWorthCalculator} />
} 