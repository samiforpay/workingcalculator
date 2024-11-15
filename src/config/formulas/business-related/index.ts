import { businessValuationCalculator } from './business-valuation'
import { cashFlowCalculator } from './cash-flow'
import { estateTaxCalculator } from './estate-tax'
import { profitMarginCalculator } from './profit-margin'
import { assetAllocationCalculator } from './asset-allocation'

export const businessRelatedFormulas = {
  'business-related/business-valuation': businessValuationCalculator,
  'business-related/cash-flow': cashFlowCalculator,
  'business-related/estate-tax': estateTaxCalculator,
  'business-related/profit-margin': profitMarginCalculator,
  'business-related/asset-allocation': assetAllocationCalculator
} as const 