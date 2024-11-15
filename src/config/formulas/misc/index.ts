import { emergencyFundCalculator } from './emergency-fund'
import { wealthManagementCalculator } from './wealth-management'
import { inheritanceCalculator } from './inheritance'

export const miscFormulas = {
  'misc/emergency-fund': emergencyFundCalculator,
  'misc/wealth-management': wealthManagementCalculator,
  'misc/inheritance': inheritanceCalculator
} as const 