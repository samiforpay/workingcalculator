import type { Formula } from '@/config/formulas/types'

export const compoundInterestCalculator: Formula = {
  name: 'Compound Interest Calculator',
  description: 'Calculate how your investments grow over time with compound interest',
  variables: {
    principal: {
      label: 'Initial Investment',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 100,
      helpText: 'Starting amount to invest'
    },
    monthlyContribution: {
      label: 'Monthly Contribution',
      type: 'currency',
      defaultValue: 500,
      min: 0,
      step: 50,
      helpText: 'Additional monthly investments'
    },
    annualRate: {
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      defaultValue: 7,
      min: 0,
      max: 50,
      step: 0.1,
      helpText: 'Expected annual return rate'
    },
    years: {
      label: 'Time Period (Years)',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
      helpText: 'Investment duration in years'
    }
  },
  calculate: (inputs) => {
    const { principal, monthlyContribution, annualRate, years } = inputs
    const monthlyRate = annualRate / 100 / 12
    const months = years * 12

    // Calculate future value with monthly contributions
    const futureValue = principal * Math.pow(1 + monthlyRate, months) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

    const totalContributions = principal + (monthlyContribution * months)
    const totalInterest = futureValue - totalContributions

    return {
      futureValue,
      totalContributions,
      totalInterest,
      effectiveRate: ((futureValue / totalContributions) - 1) * 100
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Compound Interest Results:
------------------------
Future Value: ${formatter.format(result.futureValue)}
Total Contributions: ${formatter.format(result.totalContributions)}
Total Interest Earned: ${formatter.format(result.totalInterest)}
Effective Return Rate: ${result.effectiveRate.toFixed(2)}%
    `.trim()
  }
} 