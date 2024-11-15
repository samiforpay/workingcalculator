import { stockTradingCalculator } from '@/config/formulas/roi/stock-trading'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function StockTradingPage() {
  return <CalculatorPageTemplate formula={stockTradingCalculator} />
} 