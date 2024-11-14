import { businessRoiCalculator } from '@/config/formulas/roi/business'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function BusinessRoiPage() {
  return <CalculatorPageTemplate formula={businessRoiCalculator} />
} 
