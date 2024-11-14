import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

interface InvestmentResult {
  finalValue: number
  totalContributions: number
  totalReturn: number
  effectiveReturn: number
  annualizedReturn: number
  totalDividends: number
  dividendIncome: number
}

export const investmentReturnFormulas: FormulaConfig = {
  'investment-return': {
    name: 'Investment Return Calculator',
    description: 'Calculate total returns and analyze investment performance',
    variables: {
      initialInvestment: {
        label: 'Initial Investment',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'Starting amount invested'
      },
      monthlyContribution: {
        label: 'Monthly Contribution',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'Regular monthly investments'
      },
      annualReturn: {
        label: 'Expected Annual Return',
        type: 'percentage',
        defaultValue: 8,
        min: -100,
        max: 100,
        step: 0.1,
        helpText: 'Expected yearly return rate'
      },
      investmentLength: {
        label: 'Investment Period (Years)',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 50,
        helpText: 'How long you plan to invest'
      },
      dividendYield: {
        label: 'Dividend Yield',
        type: 'percentage',
        defaultValue: 2,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Expected annual dividend yield'
      },
      reinvestDividends: {
        label: 'Reinvest Dividends',
        type: 'number',
        defaultValue: 1,
        min: 0,
        max: 1,
        helpText: '1 for yes, 0 for no'
      }
    },
    calculate: (inputs): InvestmentResult => {
      const {
        initialInvestment,
        monthlyContribution,
        annualReturn,
        investmentLength,
        dividendYield,
        reinvestDividends
      } = inputs

      const monthlyRate = annualReturn / 100 / 12
      let totalValue = initialInvestment
      let totalContributions = initialInvestment
      let totalDividends = 0
      let reinvestedDividends = 0

      // Calculate month by month
      for (let month = 1; month <= investmentLength * 12; month++) {
        totalValue += monthlyContribution
        totalContributions += monthlyContribution

        // Calculate and add monthly growth
        totalValue *= (1 + monthlyRate)

        // Calculate monthly dividend (annual yield / 12)
        const monthlyDividend = totalValue * (dividendYield / 100 / 12)
        
        if (reinvestDividends === 1) {
          totalValue += monthlyDividend
          reinvestedDividends += monthlyDividend
        } else {
          totalDividends += monthlyDividend
        }
      }

      const totalReturn = totalValue - totalContributions
      const effectiveReturn = (totalReturn / totalContributions) * 100
      const annualizedReturn = (Math.pow(totalValue / totalContributions, 1 / investmentLength) - 1) * 100

      return {
        finalValue: totalValue,
        totalContributions,
        totalReturn,
        effectiveReturn,
        annualizedReturn,
        totalDividends: reinvestDividends === 1 ? reinvestedDividends : totalDividends,
        dividendIncome: totalDividends
      }
    },
    formatResult: (result: InvestmentResult) => {
      const {
        finalValue,
        totalContributions,
        totalReturn,
        effectiveReturn,
        annualizedReturn,
        totalDividends,
        dividendIncome
      } = result

      return `Final Investment Value: ${formatCurrency(finalValue)}
Total Contributions: ${formatCurrency(totalContributions)}
Total Return: ${formatCurrency(totalReturn)}
Effective Return: ${formatPercentage(effectiveReturn)}
Annualized Return: ${formatPercentage(annualizedReturn)}
${dividendIncome > 0 
  ? `Dividend Income: ${formatCurrency(dividendIncome)}`
  : `Reinvested Dividends: ${formatCurrency(totalDividends)}`}`
    }
  }
} 