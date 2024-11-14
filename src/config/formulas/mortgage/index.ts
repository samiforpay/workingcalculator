import { mortgageCalculator } from './basic'
import { refinanceCalculator } from './refinance'

export const mortgageFormulas = {
  basic: mortgageCalculator,
  refinance: refinanceCalculator
} as const 