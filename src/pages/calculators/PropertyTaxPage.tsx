import { propertyTaxCalculator } from '@/config/formulas/tax/property'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function PropertyTaxPage() {
  return <CalculatorPageTemplate formula={propertyTaxCalculator} />
} 