import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const investmentFormulas: FormulaConfig = {
  'investment-growth': {
    name: 'Investment Growth Calculator',
    description: 'Calculate potential investment growth with regular contributions',
    variables: {
      initialInvestment: {
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
        helpText: 'Amount you plan to invest each month'
      },
      annualReturn: {
        label: 'Expected Annual Return',
        type: 'percentage',
        defaultValue: 8,
        min: -100,
        max: 100,
        step: 0.1,
        helpText: 'Expected annual return rate (e.g., 8% for stock market average)'
      },
      investmentLength: {
        label: 'Investment Period (Years)',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 50,
        helpText: 'How long you plan to invest'
      },
      inflationRate: {
        label: 'Expected Inflation Rate',
        type: 'percentage',
        defaultValue: 2.5,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Expected annual inflation rate'
      },
      rebalancingFrequency: {
        label: 'Rebalancing Frequency (Months)',
        type: 'number',
        defaultValue: 12,
        min: 1,
        max: 60,
        helpText: 'How often you plan to rebalance your portfolio'
      }
    },
    calculate: (inputs) => {
      const { 
        initialInvestment, 
        monthlyContribution, 
        annualReturn, 
        investmentLength,
        inflationRate,
        rebalancingFrequency 
      } = inputs

      const monthlyRate = (annualReturn / 100) / 12
      const totalMonths = investmentLength * 12

      // Calculate future value with monthly compounding
      let balance = initialInvestment
      let totalContributions = initialInvestment
      let totalRebalancingEvents = 0

      for (let month = 1; month <= totalMonths; month++) {
        // Add monthly contribution
        balance += monthlyContribution
        totalContributions += monthlyContribution

        // Apply monthly return
        balance *= (1 + monthlyRate)

        // Count rebalancing events
        if (month % rebalancingFrequency === 0) {
          totalRebalancingEvents++
        }
      }

      // Calculate real (inflation-adjusted) values
      const realRate = (1 + annualReturn / 100) / (1 + inflationRate / 100) - 1
      const realValue = balance / Math.pow(1 + inflationRate / 100, investmentLength)

      return {
        futureValue: balance,
        totalContributions,
        totalGrowth: balance - totalContributions,
        realValue,
        effectiveAnnualReturn: (Math.pow(balance / totalContributions, 1 / investmentLength) - 1) * 100,
        realAnnualReturn: realRate * 100,
        totalRebalancingEvents,
        averageBalance: balance / 2 // Simplified average balance estimation
      }
    },
    formatResult: (result) => {
      const {
        futureValue,
        totalContributions,
        totalGrowth,
        realValue,
        effectiveAnnualReturn,
        realAnnualReturn,
        totalRebalancingEvents,
        averageBalance
      } = result

      return `Future Value: ${formatCurrency(futureValue)}
Total Contributions: ${formatCurrency(totalContributions)}
Total Growth: ${formatCurrency(totalGrowth)}
Real (Inflation-Adjusted) Value: ${formatCurrency(realValue)}
Effective Annual Return: ${formatPercentage(effectiveAnnualReturn)}
Real Annual Return: ${formatPercentage(realAnnualReturn)}
Total Rebalancing Events: ${totalRebalancingEvents}
Average Balance: ${formatCurrency(averageBalance)}`
    }
  }
} 