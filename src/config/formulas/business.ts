import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const businessFormulas: FormulaConfig = {
  'business-valuation': {
    name: 'Business Valuation Calculator',
    description: 'Calculate the estimated value of a business using multiple valuation methods',
    variables: {
      annualRevenue: {
        label: 'Annual Revenue',
        type: 'currency',
        defaultValue: 1000000,
        min: 0,
        helpText: 'Total annual revenue of the business'
      },
      annualProfit: {
        label: 'Annual Net Profit',
        type: 'currency',
        defaultValue: 200000,
        min: 0,
        helpText: 'Net profit (EBITDA) for the year'
      },
      assetValue: {
        label: 'Total Asset Value',
        type: 'currency',
        defaultValue: 500000,
        min: 0,
        helpText: 'Value of all business assets'
      },
      industryMultiple: {
        label: 'Industry Multiple',
        type: 'number',
        defaultValue: 3,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Industry standard multiple for valuation'
      },
      growthRate: {
        label: 'Annual Growth Rate',
        type: 'percentage',
        defaultValue: 5,
        min: -100,
        max: 100,
        step: 0.1,
        helpText: 'Expected annual growth rate'
      },
      discountRate: {
        label: 'Discount Rate',
        type: 'percentage',
        defaultValue: 10,
        min: 0,
        max: 50,
        step: 0.1,
        helpText: 'Required rate of return'
      }
    },
    calculate: (inputs) => {
      const {
        annualRevenue,
        annualProfit,
        assetValue,
        industryMultiple,
        growthRate,
        discountRate
      } = inputs

      // Asset-based valuation
      const assetBasedValue = assetValue

      // Revenue multiple valuation
      const revenueMultipleValue = annualRevenue * industryMultiple

      // Earnings multiple valuation
      const earningsMultipleValue = annualProfit * industryMultiple

      // Discounted Cash Flow (DCF) valuation
      const projectionYears = 5
      let dcfValue = 0
      let currentProfit = annualProfit

      for (let year = 1; year <= projectionYears; year++) {
        currentProfit *= (1 + growthRate / 100)
        dcfValue += currentProfit / Math.pow(1 + discountRate / 100, year)
      }

      // Terminal value
      const terminalValue = (currentProfit * (1 + growthRate / 100)) / 
        (discountRate / 100 - growthRate / 100)
      const discountedTerminalValue = terminalValue / 
        Math.pow(1 + discountRate / 100, projectionYears)

      dcfValue += discountedTerminalValue

      // Calculate weighted average
      const weightedValue = (
        assetBasedValue + 
        revenueMultipleValue + 
        earningsMultipleValue + 
        dcfValue
      ) / 4

      return {
        assetBasedValue,
        revenueMultipleValue,
        earningsMultipleValue,
        dcfValue,
        weightedValue,
        profitMargin: (annualProfit / annualRevenue) * 100,
        returnOnAssets: (annualProfit / assetValue) * 100
      }
    },
    formatResult: (result) => {
      const {
        assetBasedValue,
        revenueMultipleValue,
        earningsMultipleValue,
        dcfValue,
        weightedValue,
        profitMargin,
        returnOnAssets
      } = result

      return `Asset-Based Valuation: ${formatCurrency(assetBasedValue)}
Revenue Multiple Valuation: ${formatCurrency(revenueMultipleValue)}
Earnings Multiple Valuation: ${formatCurrency(earningsMultipleValue)}
DCF Valuation: ${formatCurrency(dcfValue)}
Weighted Average Value: ${formatCurrency(weightedValue)}
Profit Margin: ${formatPercentage(profitMargin)}
Return on Assets: ${formatPercentage(returnOnAssets)}`
    }
  }
} 