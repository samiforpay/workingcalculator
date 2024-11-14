import type { Formula } from '@/config/formulas/types'

export const savingsGoalCalculator: Formula = {
  name: 'Savings Goal Calculator',
  description: 'Calculate monthly savings needed to reach your financial goal',
  variables: {
    targetAmount: {
      label: 'Target Amount',
      type: 'currency',
      defaultValue: 50000,
      min: 0,
      step: 1000,
      helpText: 'Amount you want to save'
    },
    currentSavings: {
      label: 'Current Savings',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Amount already saved'
    },
    timeframe: {
      label: 'Time to Goal (Years)',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 50,
      step: 0.5,
      helpText: 'Years to reach your goal'
    },
    annualReturn: {
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: 'Expected investment return rate'
    }
  },
  calculate: (inputs) => {
    const { targetAmount, currentSavings, timeframe, annualReturn } = inputs
    const monthlyRate = annualReturn / 100 / 12
    const months = timeframe * 12

    // Calculate required monthly savings using PMT formula
    const amountNeeded = targetAmount - currentSavings * Math.pow(1 + monthlyRate, months)
    const monthlyPayment = (amountNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)

    // Calculate total contributions and interest
    const totalContributions = monthlyPayment * months + currentSavings
    const totalInterest = targetAmount - totalContributions

    return {
      monthlyPayment,
      totalContributions,
      totalInterest,
      effectiveRate: (totalInterest / totalContributions) * 100
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Savings Goal Analysis:
--------------------
Required Monthly Savings: ${formatter.format(result.monthlyPayment)}
Total Contributions: ${formatter.format(result.totalContributions)}
Interest Earned: ${formatter.format(result.totalInterest)}
Effective Return Rate: ${result.effectiveRate.toFixed(2)}%
    `.trim()
  }
} 