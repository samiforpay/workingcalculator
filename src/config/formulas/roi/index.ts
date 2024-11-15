import { generalRoiCalculator } from './general'
import { realEstateRoiCalculator } from './real-estate'
import { marketingRoiCalculator } from './marketing'
import { businessRoiCalculator } from './business'
import { portfolioRebalancingCalculator } from './portfolio-rebalancing'
import { optionsTradingCalculator } from './options-trading'
import { riskAssessmentCalculator } from './risk-assessment'
import { bondCalculator } from './bond'

export const roiFormulas = {
  'roi/general': generalRoiCalculator,
  'roi/real-estate': realEstateRoiCalculator,
  'roi/marketing': marketingRoiCalculator,
  'roi/business': businessRoiCalculator,
  'roi/portfolio-rebalancing': portfolioRebalancingCalculator,
  'roi/options-trading': optionsTradingCalculator,
  'roi/risk-assessment': riskAssessmentCalculator,
  'roi/bond': bondCalculator
} as const