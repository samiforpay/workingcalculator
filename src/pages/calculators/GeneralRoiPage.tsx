import { generalRoiCalculator } from '@/config/formulas/roi/general'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function GeneralRoiPage() {
  return <CalculatorPageTemplate formula={generalRoiCalculator} />
} 