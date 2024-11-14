import { debtPayoffCalculator } from './payoff'
import { creditCardPayoffCalculator } from './credit-card'

export const debtFormulas = {
  'debt/payoff': debtPayoffCalculator,
  'debt/credit-card': creditCardPayoffCalculator
} as const 