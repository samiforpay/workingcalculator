import { investmentGrowthCalculator } from './investment-growth'
import { netWorthCalculator } from './net-worth'
import { iraCalculator } from './ira'
import { pensionCalculator } from './pension'
import { emergencyFundCalculator } from '../misc/emergency-fund'
import { savingsGoalCalculator } from './savings-goal'

export const financialSavingsFormulas = {
  'financial-savings/investment-growth': investmentGrowthCalculator,
  'financial-savings/net-worth': netWorthCalculator,
  'financial-savings/ira': iraCalculator,
  'financial-savings/pension': pensionCalculator,
  'financial-savings/emergency-fund': emergencyFundCalculator,
  'financial-savings/savings-goal': savingsGoalCalculator
} as const 