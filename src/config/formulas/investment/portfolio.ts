import type { Formula } from '@/config/formulas/types'

interface PortfolioResult extends Record<string, number> {
  stocksTarget: number
  bondsTarget: number
  cashTarget: number
  stocksAdjustment: number
  bondsAdjustment: number
  cashAdjustment: number
  [key: string]: number
}

export const portfolioRebalancingCalculator: Formula<PortfolioResult> = {
  name: 'Portfolio Rebalancing Calculator',
  description: 'Calculate adjustments needed to rebalance your investment portfolio',
  variables: {
    currentStocks: {
      label: 'Current Stock Value',
      type: 'currency',
      defaultValue: 60000,
      min: 0,
      step: 1000,
      helpText: 'Current value of stocks in portfolio'
    },
    currentBonds: {
      label: 'Current Bond Value',
      type: 'currency',
      defaultValue: 30000,
      min: 0,
      step: 1000,
      helpText: 'Current value of bonds in portfolio'
    },
    currentCash: {
      label: 'Current Cash Value',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 1000,
      helpText: 'Current cash holdings'
    },
    targetStocks: {
      label: 'Target Stock Allocation (%)',
      type: 'percentage',
      defaultValue: 60,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Desired percentage in stocks'
    },
    targetBonds: {
      label: 'Target Bond Allocation (%)',
      type: 'percentage',
      defaultValue: 30,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Desired percentage in bonds'
    },
    targetCash: {
      label: 'Target Cash Allocation (%)',
      type: 'percentage',
      defaultValue: 10,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Desired percentage in cash'
    }
  },
  calculate: (inputs) => {
    const { 
      currentStocks, currentBonds, currentCash,
      targetStocks, targetBonds, targetCash
    } = inputs

    const totalPortfolio = currentStocks + currentBonds + currentCash

    // Calculate target amounts
    const stocksTarget = totalPortfolio * (targetStocks/100)
    const bondsTarget = totalPortfolio * (targetBonds/100)
    const cashTarget = totalPortfolio * (targetCash/100)

    // Calculate adjustments needed
    const stocksAdjustment = stocksTarget - currentStocks
    const bondsAdjustment = bondsTarget - currentBonds
    const cashAdjustment = cashTarget - currentCash

    return {
      stocksTarget,
      bondsTarget,
      cashTarget,
      stocksAdjustment,
      bondsAdjustment,
      cashAdjustment
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Portfolio Rebalancing:
-------------------
Target Allocations:
Stocks: ${formatter.format(result.stocksTarget)}
Bonds: ${formatter.format(result.bondsTarget)}
Cash: ${formatter.format(result.cashTarget)}

Required Adjustments:
------------------
Stocks: ${formatter.format(result.stocksAdjustment)} ${result.stocksAdjustment >= 0 ? 'Buy' : 'Sell'}
Bonds: ${formatter.format(result.bondsAdjustment)} ${result.bondsAdjustment >= 0 ? 'Buy' : 'Sell'}
Cash: ${formatter.format(result.cashAdjustment)} ${result.cashAdjustment >= 0 ? 'Add' : 'Remove'}
    `.trim()
  }
} 