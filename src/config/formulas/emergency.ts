import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const emergencyFormulas: FormulaConfig = {
  'emergency-fund': {
    name: 'Emergency Fund Calculator',
    description: 'Calculate how much emergency savings you need and track your progress',
    variables: {
      monthlyIncome: {
        label: 'Monthly Income',
        type: 'currency',
        defaultValue: 5000,
        min: 0,
        helpText: 'Your total monthly income after taxes'
      },
      monthlyExpenses: {
        label: 'Monthly Expenses',
        type: 'currency',
        defaultValue: 4000,
        min: 0,
        helpText: 'Your total essential monthly expenses'
      },
      currentSavings: {
        label: 'Current Emergency Savings',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'How much you currently have saved for emergencies'
      },
      monthlySavings: {
        label: 'Monthly Savings',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'How much you can save each month'
      },
      riskLevel: {
        label: 'Risk Level',
        type: 'number',
        defaultValue: 2, // 1: Low, 2: Medium, 3: High
        min: 1,
        max: 3,
        helpText: 'Your job stability and financial risk level (1: Low, 2: Medium, 3: High)'
      }
    },
    calculate: (inputs) => {
      const { monthlyIncome, monthlyExpenses, currentSavings, monthlySavings, riskLevel } = inputs

      // Calculate recommended months of expenses based on risk level
      const recommendedMonths = {
        1: 3, // Low risk: 3 months
        2: 6, // Medium risk: 6 months
        3: 9  // High risk: 9 months
      }[riskLevel] || 6

      // Calculate target emergency fund
      const targetFund = monthlyExpenses * recommendedMonths

      // Calculate shortfall
      const shortfall = Math.max(0, targetFund - currentSavings)

      // Calculate months needed to reach target
      const monthsToTarget = shortfall > 0 ? Math.ceil(shortfall / monthlySavings) : 0

      // Calculate savings ratio
      const savingsRatio = (monthlySavings / monthlyIncome) * 100

      // Calculate current coverage
      const currentCoverage = currentSavings / monthlyExpenses

      return {
        targetFund,
        shortfall,
        monthsToTarget,
        savingsRatio,
        currentCoverage,
        recommendedMonths,
        minimumTarget: monthlyExpenses * 3,
        maximumTarget: monthlyExpenses * 9
      }
    },
    formatResult: (result) => {
      const {
        targetFund,
        shortfall,
        monthsToTarget,
        savingsRatio,
        currentCoverage,
        recommendedMonths,
        minimumTarget,
        maximumTarget
      } = result

      const years = Math.floor(monthsToTarget / 12)
      const months = monthsToTarget % 12

      return `Recommended Emergency Fund: ${formatCurrency(targetFund)} (${recommendedMonths} months)
Current Coverage: ${currentCoverage.toFixed(1)} months
${shortfall > 0 
  ? `Additional Savings Needed: ${formatCurrency(shortfall)}
Time to Reach Target: ${years > 0 ? `${years} years and ` : ''}${months} months`
  : 'Your emergency fund meets or exceeds the recommended amount!'}
Monthly Savings Rate: ${formatPercentage(savingsRatio)}
Minimum Target (3 months): ${formatCurrency(minimumTarget)}
Maximum Target (9 months): ${formatCurrency(maximumTarget)}`
    }
  }
} 