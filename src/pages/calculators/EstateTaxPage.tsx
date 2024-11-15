import { estateTaxCalculator } from '@/config/formulas/business-related/estate-tax'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function EstateTaxPage() {
  return <CalculatorPageTemplate formula={estateTaxCalculator} />
} 