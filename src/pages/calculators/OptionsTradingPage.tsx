import { optionsTradingCalculator } from '@/config/formulas/roi/options-trading'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function OptionsTradingPage() {
  return <CalculatorPageTemplate formula={optionsTradingCalculator} />
} 