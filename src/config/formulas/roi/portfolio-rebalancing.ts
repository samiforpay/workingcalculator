import type { Formula } from '@/config/formulas/types'

interface PortfolioRebalancingResult extends Record<string, number> {
  totalPortfolioValue: number
  stocksToRebalance: number
  bondsToRebalance: number
  cashToRebalance: number
  internationalToRebalance: number
  reitsToRebalance: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const PORTFOLIO_REBALANCING_CONFIG = {
  year: 2023,
  defaults: {
    stocks: 100000,
    bonds: 50000,
    cash: 25000,
    international: 30000,
    reits: 20000,
    stocksTarget: 45,
    bondsTarget: 25,
    cashTarget: 10,
    internationalTarget: 15,
    reitsTarget: 5
  },
  limits: {
    maxAmount: 100000000000, // 100 billion
    minAmount: 0,
    maxAllocation: 100,
    minAllocation: 0
  },
  rebalancingPeriods: {
    quarterly: 3,
    semiannually: 6,
    annually: 12
  }
}

export const portfolioRebalancingCalculator: Formula<PortfolioRebalancingResult> = {
  name: 'Portfolio Rebalancing Calculator',
  description: 'Calculate adjustments needed to maintain your target asset allocation',
  variables: {
    // Current Allocations
    currentStocks: {
      label: 'Current Stocks Value',
      type: 'currency',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.stocks,
      min: 0,
      max: PORTFOLIO_REBALANCING_CONFIG.limits.maxAmount,
      helpText: 'Current value of stock investments'
    },
    currentBonds: {
      label: 'Current Bonds Value',
      type: 'currency',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.bonds,
      min: 0,
      max: PORTFOLIO_REBALANCING_CONFIG.limits.maxAmount,
      helpText: 'Current value of bond investments'
    },
    currentCash: {
      label: 'Current Cash Value',
      type: 'currency',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.cash,
      min: 0,
      max: PORTFOLIO_REBALANCING_CONFIG.limits.maxAmount,
      helpText: 'Current cash and equivalents'
    },
    currentInternational: {
      label: 'Current International Value',
      type: 'currency',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.international,
      min: 0,
      max: PORTFOLIO_REBALANCING_CONFIG.limits.maxAmount,
      helpText: 'Current value of international investments'
    },
    currentReits: {
      label: 'Current REITs Value',
      type: 'currency',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.reits,
      min: 0,
      max: PORTFOLIO_REBALANCING_CONFIG.limits.maxAmount,
      helpText: 'Current value of real estate investments'
    },
    // Target Allocations
    targetStocks: {
      label: 'Target Stocks Allocation (%)',
      type: 'percentage',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.stocksTarget,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Target percentage for stocks'
    },
    targetBonds: {
      label: 'Target Bonds Allocation (%)',
      type: 'percentage',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.bondsTarget,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Target percentage for bonds'
    },
    targetCash: {
      label: 'Target Cash Allocation (%)',
      type: 'percentage',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.cashTarget,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Target percentage for cash'
    },
    targetInternational: {
      label: 'Target International Allocation (%)',
      type: 'percentage',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.internationalTarget,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Target percentage for international investments'
    },
    targetReits: {
      label: 'Target REITs Allocation (%)',
      type: 'percentage',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.defaults.reitsTarget,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Target percentage for REITs'
    },
    rebalancingPeriod: {
      label: 'Rebalancing Period (Months)',
      type: 'select',
      defaultValue: PORTFOLIO_REBALANCING_CONFIG.rebalancingPeriods.quarterly,
      options: [
        { label: 'Quarterly', value: PORTFOLIO_REBALANCING_CONFIG.rebalancingPeriods.quarterly },
        { label: 'Semi-Annually', value: PORTFOLIO_REBALANCING_CONFIG.rebalancingPeriods.semiannually },
        { label: 'Annually', value: PORTFOLIO_REBALANCING_CONFIG.rebalancingPeriods.annually }
      ],
      helpText: 'How often to rebalance portfolio'
    }
  },
  calculate: (inputs) => {
    const {
      currentStocks,
      currentBonds,
      currentCash,
      currentInternational,
      currentReits,
      targetStocks,
      targetBonds,
      targetCash,
      targetInternational,
      targetReits,
      rebalancingPeriod
    } = inputs

    // Validate total allocation equals 100%
    const totalAllocation = targetStocks + targetBonds + targetCash + 
                          targetInternational + targetReits
    if (Math.abs(totalAllocation - 100) > 0.01) {
      throw new Error('Target allocations must total 100%')
    }

    // Calculate total portfolio value
    const totalPortfolioValue = currentStocks + currentBonds + currentCash + 
                               currentInternational + currentReits

    // Calculate target amounts
    const targetStocksAmount = (targetStocks / 100) * totalPortfolioValue
    const targetBondsAmount = (targetBonds / 100) * totalPortfolioValue
    const targetCashAmount = (targetCash / 100) * totalPortfolioValue
    const targetInternationalAmount = (targetInternational / 100) * totalPortfolioValue
    const targetReitsAmount = (targetReits / 100) * totalPortfolioValue

    // Calculate rebalancing amounts (positive means buy, negative means sell)
    const stocksToRebalance = targetStocksAmount - currentStocks
    const bondsToRebalance = targetBondsAmount - currentBonds
    const cashToRebalance = targetCashAmount - currentCash
    const internationalToRebalance = targetInternationalAmount - currentInternational
    const reitsToRebalance = targetReitsAmount - currentReits

    // Calculate current allocations
    const currentStocksPercent = (currentStocks / totalPortfolioValue) * 100
    const currentBondsPercent = (currentBonds / totalPortfolioValue) * 100
    const currentCashPercent = (currentCash / totalPortfolioValue) * 100
    const currentInternationalPercent = (currentInternational / totalPortfolioValue) * 100
    const currentReitsPercent = (currentReits / totalPortfolioValue) * 100

    return {
      totalPortfolioValue,
      stocksToRebalance,
      bondsToRebalance,
      cashToRebalance,
      internationalToRebalance,
      reitsToRebalance,
      currentStocksPercent,
      currentBondsPercent,
      currentCashPercent,
      currentInternationalPercent,
      currentReitsPercent
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const formatRebalancing = (amount: number) => {
      return amount >= 0 
        ? `Buy ${formatter.format(Math.abs(amount))}` 
        : `Sell ${formatter.format(Math.abs(amount))}`
    }

    return `
Portfolio Rebalancing Analysis:
---------------------------
Total Portfolio Value: ${formatter.format(result.totalPortfolioValue)}

Current Allocations:
-----------------
Stocks: ${result.currentStocksPercent.toFixed(1)}%
Bonds: ${result.currentBondsPercent.toFixed(1)}%
Cash: ${result.currentCashPercent.toFixed(1)}%
International: ${result.currentInternationalPercent.toFixed(1)}%
REITs: ${result.currentReitsPercent.toFixed(1)}%

Rebalancing Actions:
-----------------
Stocks: ${formatRebalancing(result.stocksToRebalance)}
Bonds: ${formatRebalancing(result.bondsToRebalance)}
Cash: ${formatRebalancing(result.cashToRebalance)}
International: ${formatRebalancing(result.internationalToRebalance)}
REITs: ${formatRebalancing(result.reitsToRebalance)}

Note: Consider transaction costs and tax implications
when implementing rebalancing trades.
    `.trim()
  }
} 