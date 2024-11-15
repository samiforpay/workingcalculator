import { debtPayoffCalculator } from './payoff'
import { creditCardPayoffCalculator } from './credit-card'
import { loanCalculator } from './loan'
import { debtConsolidationCalculator } from './consolidation'

export const debtFormulas = {
  'debt/payoff': debtPayoffCalculator,
  'debt/credit-card': creditCardPayoffCalculator,
  'debt/loan': loanCalculator,
  'debt/consolidation': debtConsolidationCalculator
} as const 