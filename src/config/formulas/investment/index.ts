import { investmentReturnsCalculator } from './returns'
import { portfolioRebalancingCalculator } from './portfolio'

export const investmentFormulas = {
  returns: investmentReturnsCalculator,
  portfolio: portfolioRebalancingCalculator
} as const 