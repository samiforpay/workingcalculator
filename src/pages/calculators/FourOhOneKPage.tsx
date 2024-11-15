import { fourOhOneKCalculator } from '@/config/formulas/tax/401k'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function FourOhOneKPage() {
  return <CalculatorPageTemplate formula={fourOhOneKCalculator} />
} 