import { salesTaxCalculator } from '@/config/formulas/tax/sales'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function SalesTaxPage() {
  return <CalculatorPageTemplate formula={salesTaxCalculator} />
} 