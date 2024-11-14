import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const stockFormulas: FormulaConfig = {
  'stock-dividend': {
    name: 'Stock Dividend Calculator',
    description: 'Calculate dividend income and yield from stock investments',
    variables: {
      sharePrice: {
        label: 'Current Share Price',
        type: 'currency',
        defaultValue: 50,
        min: 0.01,
        helpText: 'Current market price per share'
      },
      numberOfShares: {
        label: 'Number of Shares',
        type: 'number',
        defaultValue: 100,
        min: 1,
        helpText: 'How many shares you own or plan to buy'
      },
      annualDividend: {
        label: 'Annual Dividend per Share',
        type: 'currency',
        defaultValue: 2,
        min: 0,
        helpText: 'Total dividend payments per share per year'
      },
      dividendGrowthRate: {
        label: 'Expected Annual Dividend Growth',
        type: 'percentage',
        defaultValue: 5,
        min: -100,
        max: 100,
        step: 0.1,
        helpText: 'Expected yearly increase in dividend payments'
      },
      yearsToHold: {
        label: 'Investment Period (Years)',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 50,
        helpText: 'How long you plan to hold the investment'
      },
      taxRate: {
        label: 'Dividend Tax Rate',
        type: 'percentage',
        defaultValue: 15,
        min: 0,
        max: 100,
        step: 0.1,
        helpText: 'Your tax rate for dividend income'
      }
    },
    calculate: (inputs) => {
      const { sharePrice, numberOfShares, annualDividend, dividendGrowthRate, yearsToHold, taxRate } = inputs
      
      let totalDividends = 0
      let currentDividend = annualDividend
      const initialInvestment = sharePrice * numberOfShares

      // Calculate dividends year by year with growth
      for (let year = 1; year <= yearsToHold; year++) {
        const yearlyDividend = currentDividend * numberOfShares
        const afterTaxDividend = yearlyDividend * (1 - taxRate / 100)
        totalDividends += afterTaxDividend
        currentDividend *= (1 + dividendGrowthRate / 100)
      }

      const currentYield = (annualDividend / sharePrice) * 100
      const finalYearDividend = currentDividend * numberOfShares * (1 - taxRate / 100)

      return {
        initialInvestment,
        totalDividends,
        currentYield,
        finalYearDividend,
        averageAnnualDividend: totalDividends / yearsToHold,
        effectiveYield: (totalDividends / (yearsToHold * initialInvestment)) * 100
      }
    },
    formatResult: (result) => {
      const {
        initialInvestment,
        totalDividends,
        currentYield,
        finalYearDividend,
        averageAnnualDividend,
        effectiveYield
      } = result

      return `Initial Investment: ${formatCurrency(initialInvestment)}
Total Dividends (After Tax): ${formatCurrency(totalDividends)}
Current Dividend Yield: ${formatPercentage(currentYield)}
Final Year Annual Dividend: ${formatCurrency(finalYearDividend)}
Average Annual Dividend: ${formatCurrency(averageAnnualDividend)}
Effective Yield: ${formatPercentage(effectiveYield)}`
    }
  }
} 