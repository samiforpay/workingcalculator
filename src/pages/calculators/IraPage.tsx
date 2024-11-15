import { iraCalculator } from '@/config/formulas/financial-savings/ira'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function IraPage() {
  return <CalculatorPageTemplate formula={iraCalculator} />
} 