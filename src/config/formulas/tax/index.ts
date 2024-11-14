import { incomeTaxCalculator } from './income'
import { capitalGainsTaxCalculator } from './capital-gains'

export const taxFormulas = {
  'tax/income': incomeTaxCalculator,
  'tax/capital-gains': capitalGainsTaxCalculator
} as const 