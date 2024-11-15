import { mortgageCalculator } from './basic'
import { refinanceCalculator } from './refinance'
import { homeAffordabilityCalculator } from './home-affordability'
import { amortizationCalculator } from './amortization'
import { downPaymentCalculator } from './down-payment'

export const mortgageFormulas = {
  'mortgage/basic': mortgageCalculator,
  'mortgage/refinance': refinanceCalculator,
  'mortgage/home-affordability': homeAffordabilityCalculator,
  'mortgage/amortization': amortizationCalculator,
  'mortgage/down-payment': downPaymentCalculator
} as const 