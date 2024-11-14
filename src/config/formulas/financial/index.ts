import { compoundInterestCalculator } from './compound'
import { inflationCalculator } from './inflation'
import { savingsGoalCalculator } from './savings-goal'

export const financialFormulas = {
  compound: compoundInterestCalculator,
  inflation: inflationCalculator,
  'savings-goal': savingsGoalCalculator
} as const 