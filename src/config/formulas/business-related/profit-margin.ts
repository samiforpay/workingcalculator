import type { Formula, BaseResult } from '@/config/formulas/types'

interface ProfitMarginResult extends BaseResult {
  netProfit: number
  grossProfit: number
  netProfitMargin: number
  grossProfitMargin: number
  markupPercentage: number
  totalCosts: number
  revenue: number
  costOfGoods: number
  operatingExpenses: number
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
  description: '',
  longDescription: `
    <p>Maximize your profits with our Profit Margin Calculator. This handy tool allows you to easily calculate profit margin percentages and analyze your business's profitability. Whether you're a small business owner or managing a large enterprise, our net profit margin estimator will help you understand your financial performance better. Use this profitability analysis tool to make informed pricing decisions and boost your bottom line.</p>
    <p>Key metrics calculated:</p>
    <ul>
      <li>Gross Profit Margin: Revenue minus cost of goods sold</li>
      <li>Net Profit Margin: Profit after all expenses</li>
      <li>Operating Margin: Profit from core business operations</li>
      <li>Markup Percentage: Price increase over cost</li>
      <li>Break-even Analysis: Point where revenue equals costs</li>
    </ul>
    <p>Use this calculator to optimize your pricing strategy, control costs, and improve your business's overall profitability.</p>
  `,
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

    const totalCosts = costOfGoods + operatingExpenses
    const grossProfit = revenue - costOfGoods
    const netProfit = grossProfit - operatingExpenses
    
    const grossProfitMargin = (grossProfit / revenue) * 100
    const netProfitMargin = (netProfit / revenue) * 100
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