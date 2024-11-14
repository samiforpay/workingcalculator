import type { Formula } from '@/config/formulas/types'

interface EmergencyFundResult extends Record<string, number> {
  monthlyExpenses: number
  recommendedMinimum: number
  recommendedMaximum: number
  currentShortfall: number
  monthsOfCoverage: number
  savingsGoal: number
  monthlyContribution: number
  timeToGoal: number
}

export const emergencyFundCalculator: Formula<EmergencyFundResult> = {
  name: 'Emergency Fund Calculator',
  description: 'Calculate how much you need to save for emergencies',
  variables: {
    monthlyIncome: {
      label: 'Monthly Income',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Your total monthly income after taxes'
    },
    monthlyExpenses: {
      label: 'Monthly Expenses',
      type: 'currency',
      defaultValue: 4000,
      min: 0,
      step: 100,
      helpText: 'Your total monthly expenses'
    },
    currentSavings: {
      label: 'Current Emergency Savings',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Amount currently saved for emergencies'
    },
    monthlySavings: {
      label: 'Monthly Savings Contribution',
      type: 'currency',
      defaultValue: 500,
      min: 0,
      step: 50,
      helpText: 'Amount you can save each month'
    },
    jobStability: {
      label: 'Job Stability (1-10)',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 10,
      step: 1,
      helpText: '1 = Very unstable, 10 = Very stable'
    },
    dependents: {
      label: 'Number of Dependents',
      type: 'number',
      defaultValue: 0,
      min: 0,
      step: 1,
      helpText: 'Number of people who depend on your income'
    }
  },
  calculate: (inputs) => {
    const {
      monthlyIncome,
      monthlyExpenses,
      currentSavings,
      monthlySavings,
      jobStability,
      dependents
    } = inputs

    // Base recommendation is 3-6 months of expenses
    let minMonths = 3
    let maxMonths = 6

    // Adjust based on job stability (1-10)
    // Lower stability = more months needed
    minMonths += (10 - jobStability)
    maxMonths += (10 - jobStability)

    // Adjust for dependents
    // More dependents = more months needed
    minMonths += Math.min(dependents, 3)
    maxMonths += Math.min(dependents, 3)

    const recommendedMinimum = monthlyExpenses * minMonths
    const recommendedMaximum = monthlyExpenses * maxMonths
    
    // Calculate average recommended amount
    const savingsGoal = (recommendedMinimum + recommendedMaximum) / 2
    
    // Calculate current shortfall
    const currentShortfall = Math.max(0, savingsGoal - currentSavings)
    
    // Calculate months of current coverage
    const monthsOfCoverage = currentSavings / monthlyExpenses
    
    // Calculate time to reach goal
    const timeToGoal = currentShortfall > 0 ? currentShortfall / monthlySavings : 0

    return {
      monthlyExpenses,
      recommendedMinimum,
      recommendedMaximum,
      currentShortfall,
      monthsOfCoverage,
      savingsGoal,
      monthlyContribution: monthlySavings,
      timeToGoal
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const {
      monthlyExpenses,
      recommendedMinimum,
      recommendedMaximum,
      currentShortfall,
      monthsOfCoverage,
      savingsGoal,
      monthlyContribution,
      timeToGoal
    } = result

    const years = Math.floor(timeToGoal / 12)
    const months = Math.round(timeToGoal % 12)

    return `
Emergency Fund Analysis:
---------------------
Monthly Expenses: ${formatter.format(monthlyExpenses)}
Current Coverage: ${monthsOfCoverage.toFixed(1)} months

Recommended Fund:
--------------
Minimum (${Math.floor(recommendedMinimum/monthlyExpenses)} months): ${formatter.format(recommendedMinimum)}
Maximum (${Math.floor(recommendedMaximum/monthlyExpenses)} months): ${formatter.format(recommendedMaximum)}
Target Goal: ${formatter.format(savingsGoal)}

Savings Plan:
-----------
Current Shortfall: ${formatter.format(currentShortfall)}
Monthly Contribution: ${formatter.format(monthlyContribution)}
Time to Goal: ${years > 0 ? `${years} years and ` : ''}${months} months
    `.trim()
  }
} 