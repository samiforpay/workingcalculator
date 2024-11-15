import type { Formula } from '@/config/formulas/types'

interface StockTradingResult extends Record<string, number> {
  profitLoss: number
  totalCost: number
  totalRevenue: number
  returnOnInvestment: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const STOCK_TRADING_CONFIG = {
  year: 2023,
  defaults: {
    costPrice: 50,
    sellingPrice: 55,
    quantity: 100,
    commission: 5.99,
    otherFees: 0
  },
  limits: {
    maxPrice: 1000000,  // $1M per share
    maxQuantity: 1000000, // 1M shares
    maxFees: 10000     // $10K in fees
  }
}

export const stockTradingCalculator: Formula<StockTradingResult> = {
  name: 'Stock Trading Calculator',
  description: '',
  longDescription: `
    <p>The Stock Trading Calculator helps you analyze potential profits and losses from stock trades, taking into account purchase price, selling price, commissions, and other fees. This tool is essential for understanding the true cost and potential return of your stock trades.</p>
    <p>Features included:</p>
    <ul>
      <li>Profit/Loss calculation per trade</li>
      <li>Commission and fee analysis</li>
      <li>Break-even price calculation</li>
      <li>Return on investment (ROI) percentage</li>
      <li>Total cost basis computation</li>
    </ul>
    <p>Use this calculator to make informed trading decisions and understand the impact of fees and commissions on your trading returns.</p>
  `,
  variables: {
    costPrice: {
      label: 'Purchase Price Per Share',
      type: 'currency',
      defaultValue: STOCK_TRADING_CONFIG.defaults.costPrice,
      min: 0.01,
      max: STOCK_TRADING_CONFIG.limits.maxPrice,
      step: 0.01,
      helpText: 'Price paid per share when buying'
    },
    sellingPrice: {
      label: 'Selling Price Per Share',
      type: 'currency',
      defaultValue: STOCK_TRADING_CONFIG.defaults.sellingPrice,
      min: 0.01,
      max: STOCK_TRADING_CONFIG.limits.maxPrice,
      step: 0.01,
      helpText: 'Price received per share when selling'
    },
    quantity: {
      label: 'Number of Shares',
      type: 'number',
      defaultValue: STOCK_TRADING_CONFIG.defaults.quantity,
      min: 1,
      max: STOCK_TRADING_CONFIG.limits.maxQuantity,
      step: 1,
      helpText: 'Quantity of shares traded'
    },
    commission: {
      label: 'Commission Per Trade',
      type: 'currency',
      defaultValue: STOCK_TRADING_CONFIG.defaults.commission,
      min: 0,
      max: STOCK_TRADING_CONFIG.limits.maxFees,
      step: 0.01,
      helpText: 'Broker commission for each trade (buy and sell)'
    },
    otherFees: {
      label: 'Other Fees',
      type: 'currency',
      defaultValue: STOCK_TRADING_CONFIG.defaults.otherFees,
      min: 0,
      max: STOCK_TRADING_CONFIG.limits.maxFees,
      step: 0.01,
      helpText: 'Additional fees (SEC fees, exchange fees, etc.)'
    }
  },
  calculate: (inputs) => {
    const { costPrice, sellingPrice, quantity, commission, otherFees } = inputs
    
    // Calculate total costs
    const purchaseCost = costPrice * quantity
    const totalTransactionCosts = (commission * 2) + otherFees // Commission for both buy and sell
    const totalCost = purchaseCost + totalTransactionCosts
    
    // Calculate revenue and profit/loss
    const totalRevenue = sellingPrice * quantity
    const profitLoss = totalRevenue - totalCost
    
    // Calculate return on investment
    const returnOnInvestment = (profitLoss / totalCost) * 100

    return {
      profitLoss,
      totalCost,
      totalRevenue,
      returnOnInvestment,
      totalTransactionCosts,
      purchaseCost
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const profitOrLoss = result.profitLoss >= 0 ? 'Profit' : 'Loss'

    return `
Stock Trade Analysis:
------------------
${profitOrLoss}: ${formatter.format(result.profitLoss)}
Return on Investment: ${percentFormatter.format(result.returnOnInvestment)}%

Cost Breakdown:
------------
Purchase Cost: ${formatter.format(result.purchaseCost)}
Transaction Costs: ${formatter.format(result.totalTransactionCosts)}
Total Investment: ${formatter.format(result.totalCost)}

Revenue:
-------
Total Revenue: ${formatter.format(result.totalRevenue)}

Note: Transaction costs include commissions for both buy and sell trades.
Past performance does not guarantee future results.
    `.trim()
  }
} 