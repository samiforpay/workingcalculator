import type { Formula } from '@/config/formulas/types'

interface ProfitMarginResult extends Record<string, number> {
  netProfit: number
  grossProfit: number
  netProfitMargin: number
  grossProfitMargin: number
  markupPercentage: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const PROFIT_MARGIN_CONFIG = {
  year: 2023,
  defaults: {
    revenue: 100000,
    costOfGoods: 60000,
    operatingExpenses: 20000
  },
  limits: {
    maxAmount: 100000000000, // 100 billion
    minAmount: 0,
    maxMargin: 100,         // 100% maximum margin
    minMargin: -100         // -100% minimum margin (loss)
  }
}

export const profitMarginCalculator: Formula<ProfitMarginResult> = {
  name: 'Profit Margin Calculator',
  description: 'Calculate profit margins and markup percentages for your business',
  variables: {
    revenue: {
      label: 'Revenue',
      type: 'currency',
      defaultValue: PROFIT_MARGIN_CONFIG.defaults.revenue,
      min: 0,
      max: PROFIT_MARGIN_CONFIG.limits.maxAmount,
      step: 'any',
      helpText: 'Total revenue or sales'
    },
    costOfGoods: {
      label: 'Cost of Goods Sold',
      type: 'currency',
      defaultValue: PROFIT_MARGIN_CONFIG.defaults.costOfGoods,
      min: 0,
      max: PROFIT_MARGIN_CONFIG.limits.maxAmount,
      step: 'any',
      helpText: 'Direct costs of producing goods/services'
    },
    operatingExpenses: {
      label: 'Operating Expenses',
      type: 'currency',
      defaultValue: PROFIT_MARGIN_CONFIG.defaults.operatingExpenses,
      min: 0,
      max: PROFIT_MARGIN_CONFIG.limits.maxAmount,
      step: 'any',
      helpText: 'Other business expenses (overhead, salaries, etc.)'
    }
  },
  calculate: (inputs) => {
    const { revenue, costOfGoods, operatingExpenses } = inputs

    // Calculate total costs
    const totalCosts = costOfGoods + operatingExpenses

    // Calculate gross profit (revenue - COGS)
    const grossProfit = revenue - costOfGoods

    // Calculate net profit (gross profit - operating expenses)
    const netProfit = grossProfit - operatingExpenses

    // Calculate profit margins
    const grossProfitMargin = (grossProfit / revenue) * 100
    const netProfitMargin = (netProfit / revenue) * 100

    // Calculate markup percentage
    const markupPercentage = ((revenue - costOfGoods) / costOfGoods) * 100

    return {
      netProfit,
      grossProfit,
      netProfitMargin,
      grossProfitMargin,
      markupPercentage,
      totalCosts,
      revenue,
      costOfGoods,
      operatingExpenses
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return `
Profit Analysis:
-------------
Net Profit: ${formatter.format(result.netProfit)}
Gross Profit: ${formatter.format(result.grossProfit)}

Margin Analysis:
-------------
Net Profit Margin: ${percentFormatter.format(result.netProfitMargin)}%
Gross Profit Margin: ${percentFormatter.format(result.grossProfitMargin)}%
Markup Percentage: ${percentFormatter.format(result.markupPercentage)}%

Cost Breakdown:
------------
Total Revenue: ${formatter.format(result.revenue)}
Cost of Goods: ${formatter.format(result.costOfGoods)}
Operating Expenses: ${formatter.format(result.operatingExpenses)}
Total Costs: ${formatter.format(result.totalCosts)}

Note: Profit margins can vary significantly by industry.
Compare your margins to industry standards for better context.
    `.trim()
  }
} 