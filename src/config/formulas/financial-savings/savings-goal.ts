import type { Formula } from '@/config/formulas/types'

interface SavingsGoalResult extends Record<string, number> {
  monthlySavingsNeeded: number
  totalContributions: number
  totalInterest: number
  finalBalance: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const SAVINGS_GOAL_CONFIG = {
  year: 2023,
  defaults: {
    savingsGoal: 50000,
    startingBalance: 5000,
    timeInMonths: 36,
    interestRate: 3,
    monthlyDeposit: 0
  },
  limits: {
    maxGoal: 100000000000,  // 100 billion
    maxBalance: 100000000000, // 100 billion
    maxMonths: 600,         // 50 years
    minMonths: 1,
    maxRate: 100,           // 100% max interest rate
    minRate: 0
  }
}

export const savingsGoalCalculator: Formula<SavingsGoalResult> = {
  name: 'Savings Goal Calculator',
  description: 'Calculate how much you need to save monthly to reach your savings goal',
  variables: {
    savingsGoal: {
      label: 'Savings Goal Amount',
      type: 'currency',
      defaultValue: SAVINGS_GOAL_CONFIG.defaults.savingsGoal,
      min: 0,
      max: SAVINGS_GOAL_CONFIG.limits.maxGoal,
      step: 'any',
      helpText: 'Target amount you want to save'
    },
    startingBalance: {
      label: 'Starting Balance',
      type: 'currency',
      defaultValue: SAVINGS_GOAL_CONFIG.defaults.startingBalance,
      min: 0,
      max: SAVINGS_GOAL_CONFIG.limits.maxBalance,
      step: 'any',
      helpText: 'Current savings balance'
    },
    timeInMonths: {
      label: 'Time to Achieve Goal (Months)',
      type: 'number',
      defaultValue: SAVINGS_GOAL_CONFIG.defaults.timeInMonths,
      min: SAVINGS_GOAL_CONFIG.limits.minMonths,
      max: SAVINGS_GOAL_CONFIG.limits.maxMonths,
      step: 1,
      helpText: 'Number of months to reach your goal'
    },
    interestRate: {
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      defaultValue: SAVINGS_GOAL_CONFIG.defaults.interestRate,
      min: SAVINGS_GOAL_CONFIG.limits.minRate,
      max: SAVINGS_GOAL_CONFIG.limits.maxRate,
      step: 0.1,
      helpText: 'Expected annual return on savings (optional)'
    }
  },
  calculate: (inputs) => {
    const {
      savingsGoal,
      startingBalance,
      timeInMonths,
      interestRate
    } = inputs

    // Convert annual rate to monthly
    const monthlyRate = (interestRate / 100) / 12

    // Calculate monthly savings needed using compound interest formula
    let monthlySavingsNeeded
    if (monthlyRate === 0) {
      // Simple calculation if no interest
      monthlySavingsNeeded = (savingsGoal - startingBalance) / timeInMonths
    } else {
      // Use compound interest formula
      const futureValue = savingsGoal
      const presentValue = startingBalance
      const n = timeInMonths

      monthlySavingsNeeded = (futureValue - presentValue * Math.pow(1 + monthlyRate, n)) /
        ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate)
    }

    // Calculate total contributions
    const totalContributions = monthlySavingsNeeded * timeInMonths

    // Calculate final balance with interest
    const finalBalance = startingBalance * Math.pow(1 + monthlyRate, timeInMonths) +
      monthlySavingsNeeded * ((Math.pow(1 + monthlyRate, timeInMonths) - 1) / monthlyRate)

    // Calculate total interest earned
    const totalInterest = finalBalance - totalContributions - startingBalance

    return {
      monthlySavingsNeeded,
      totalContributions,
      totalInterest,
      finalBalance,
      yearsToGoal: timeInMonths / 12,
      startingBalance,
      savingsGoal
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    return `
Savings Plan Analysis:
-------------------
Monthly Savings Needed: ${formatter.format(result.monthlySavingsNeeded)}
Time to Goal: ${result.yearsToGoal.toFixed(1)} years

Goal Progress:
-----------
Starting Balance: ${formatter.format(result.startingBalance)}
Target Goal: ${formatter.format(result.savingsGoal)}

Projections:
----------
Total Contributions: ${formatter.format(result.totalContributions)}
Interest Earned: ${formatter.format(result.totalInterest)}
Final Balance: ${formatter.format(result.finalBalance)}

Note: This calculation assumes regular monthly deposits and
a constant interest rate. Actual results may vary based on
market conditions and deposit consistency.
    `.trim()
  }
} 