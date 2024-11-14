import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const savingsFormulas: FormulaConfig = {
  'savings-goal': {
    name: 'Savings Goal Calculator',
    description: 'Calculate how long it will take to reach your savings goal',
    variables: {
      targetAmount: {
        label: 'Target Savings Amount',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'How much you want to save in total'
      },
      initialSavings: {
        label: 'Current Savings',
        type: 'currency',
        defaultValue: 1000,
        min: 0,
        helpText: 'How much you have saved already'
      },
      monthlySavings: {
        label: 'Monthly Contribution',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'How much you can save each month'
      },
      interestRate: {
        label: 'Annual Interest Rate',
        type: 'percentage',
        defaultValue: 2,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Expected annual return on your savings'
      },
      compoundingFrequency: {
        label: 'Compounding Frequency',
        type: 'number',
        defaultValue: 12,
        min: 1,
        max: 365,
        helpText: 'How often interest is compounded (12 for monthly)'
      }
    },
    calculate: (inputs) => {
      const { targetAmount, initialSavings, monthlySavings, interestRate, compoundingFrequency } = inputs
      const monthlyRate = (interestRate / 100) / 12
      let currentAmount = initialSavings
      let months = 0
      let totalContributions = initialSavings
      let totalInterest = 0

      // Calculate months needed to reach target
      while (currentAmount < targetAmount && months < 1200) { // 100-year maximum
        const interestEarned = currentAmount * monthlyRate
        currentAmount += interestEarned + monthlySavings
        totalContributions += monthlySavings
        totalInterest += interestEarned
        months++
      }

      // Calculate effective interest rate
      const effectiveRate = ((currentAmount - totalContributions) / totalContributions) * 100

      return {
        monthsToGoal: months,
        totalContributions,
        totalInterest,
        finalAmount: currentAmount,
        effectiveRate
      }
    },
    formatResult: (result) => {
      const { monthsToGoal, totalContributions, totalInterest, finalAmount, effectiveRate } = result
      const years = Math.floor(monthsToGoal / 12)
      const remainingMonths = monthsToGoal % 12

      return `Time to Reach Goal: ${years} years and ${remainingMonths} months
Total Contributions: ${formatCurrency(totalContributions)}
Total Interest Earned: ${formatCurrency(totalInterest)}
Final Amount: ${formatCurrency(finalAmount)}
Effective Interest Rate: ${formatPercentage(effectiveRate)}`
    }
  }
} 