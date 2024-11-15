import { riskAssessmentCalculator } from '@/config/formulas/roi/risk-assessment'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function RiskAssessmentPage() {
  return <CalculatorPageTemplate formula={riskAssessmentCalculator} />
} 