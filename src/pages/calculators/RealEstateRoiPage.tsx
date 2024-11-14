import { realEstateRoiCalculator } from '@/config/formulas/roi/real-estate'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function RealEstateRoiPage() {
  return <CalculatorPageTemplate formula={realEstateRoiCalculator} />
} 