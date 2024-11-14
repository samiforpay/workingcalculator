import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const compoundFormulas: FormulaConfig = {
  'compound-interest': {
    name: 'Compound Interest Calculator',
    description: 'Calculate how your investments grow with compound interest over time',
    variables: {
      principal: {
        label: 'Initial Investment',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'Starting amount of your investment'
      },
      monthlyContribution: {
        label: 'Monthly Contribution',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'Additional amount you invest each month'
      },
      annualRate: {
        label: 'Annual Interest Rate',
        type: 'percentage',
        defaultValue: 7,
        min: -100,
        max: 100,
        step: 0.1,
        helpText: 'Expected annual return rate'
      },
      years: {
        label: 'Investment Period (Years)',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 50,
        helpText: 'Number of years you plan to invest'
      },
      compoundingFrequency: {
        label: 'Compounding Frequency',
        type: 'number',
        defaultValue: 12,
        min: 1,
        max: 365,
        helpText: 'How often interest is compounded (12 for monthly, 4 for quarterly, etc.)'
      },
      inflationRate: {
        label: 'Expected Inflation Rate',
        type: 'percentage',
        defaultValue: 2.5,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Expected annual inflation rate'
      }
    },
    calculate: (inputs) => {
      const { 
        principal, 
        monthlyContribution, 
        annualRate, 
        years, 
        compoundingFrequency,
        inflationRate 
      } = inputs

      const periodicRate = annualRate / 100 / compoundingFrequency
      const periodsPerYear = compoundingFrequency
      const totalPeriods = years * periodsPerYear
      const contributionsPerPeriod = monthlyContribution * 12 / periodsPerYear

      // Calculate future value with periodic contributions
      let futureValue = principal * Math.pow(1 + periodicRate, totalPeriods)
      let contributionFV = contributionsPerPeriod * 
        ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate)

      const totalValue = futureValue + contributionFV
      const totalContributions = principal + (monthlyContribution * 12 * years)
      const totalInterest = totalValue - totalContributions

      // Calculate inflation-adjusted values
      const realRate = (1 + annualRate / 100) / (1 + inflationRate / 100) - 1
      const realValue = totalValue / Math.pow(1 + inflationRate / 100, years)

      return {
        futureValue: totalValue,
        totalContributions,
        totalInterest,
        realValue,
        effectiveRate: ((totalValue / totalContributions) - 1) * 100,
        realReturn: ((realValue / totalContributions) - 1) * 100,
        periodicGrowth: periodicRate * 100
      }
    },
    formatResult: (result) => {
      const {
        futureValue,
        totalContributions,
        totalInterest,
        realValue,
        effectiveRate,
        realReturn,
        periodicGrowth
      } = result

      return `Future Value: ${formatCurrency(futureValue)}
Total Contributions: ${formatCurrency(totalContributions)}
Total Interest Earned: ${formatCurrency(totalInterest)}
Inflation-Adjusted Value: ${formatCurrency(realValue)}
Effective Annual Return: ${formatPercentage(effectiveRate)}
Real Rate of Return: ${formatPercentage(realReturn)}
Periodic Growth Rate: ${formatPercentage(periodicGrowth)}`
    }
  }
} 