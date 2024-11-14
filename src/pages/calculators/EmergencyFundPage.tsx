import { emergencyFundCalculator } from '@/config/formulas/emergency/fund'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function EmergencyFundPage() {
  return <CalculatorPageTemplate formula={emergencyFundCalculator} />
} 