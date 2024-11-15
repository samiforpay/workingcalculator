import { wealthManagementCalculator } from '@/config/formulas/misc/wealth-management'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function WealthManagementPage() {
  return <CalculatorPageTemplate formula={wealthManagementCalculator} />
} 