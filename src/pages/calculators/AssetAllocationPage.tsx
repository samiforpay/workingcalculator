import { assetAllocationCalculator } from '@/config/formulas/business-related/asset-allocation'
import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'

export default function AssetAllocationPage() {
  return <CalculatorPageTemplate formula={assetAllocationCalculator} />
} 