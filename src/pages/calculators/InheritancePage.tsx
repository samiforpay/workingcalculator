import { inheritanceCalculator } from '@/config/formulas/misc/inheritance'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function InheritancePage() {
  return <CalculatorPageTemplate formula={inheritanceCalculator} />
} 