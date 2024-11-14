import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig, PortfolioResult } from './types'

export const portfolioFormulas: FormulaConfig = {
  'portfolio-rebalance': {
    name: 'Portfolio Rebalancing Calculator',
    description: 'Calculate how to rebalance your investment portfolio to maintain target allocations',
    variables: {
      portfolioValue: {
        label: 'Total Portfolio Value',
        type: 'currency',
        defaultValue: 100000,
        min: 0,
        helpText: 'Current total value of your investment portfolio'
      },
      stocksTarget: {
        label: 'Target Stocks Allocation',
        type: 'percentage',
        defaultValue: 60,
        min: 0,
        max: 100,
        step: 1,
        helpText: 'Desired percentage in stocks'
      },
      bondsTarget: {
        label: 'Target Bonds Allocation',
        type: 'percentage',
        defaultValue: 30,
        min: 0,
        max: 100,
        step: 1,
        helpText: 'Desired percentage in bonds'
      },
      cashTarget: {
        label: 'Target Cash Allocation',
        type: 'percentage',
        defaultValue: 10,
        min: 0,
        max: 100,
        step: 1,
        helpText: 'Desired percentage in cash'
      },
      stocksCurrent: {
        label: 'Current Stocks Value',
        type: 'currency',
        defaultValue: 65000,
        min: 0,
        helpText: 'Current value of stock investments'
      },
      bondsCurrent: {
        label: 'Current Bonds Value',
        type: 'currency',
        defaultValue: 25000,
        min: 0,
        helpText: 'Current value of bond investments'
      },
      cashCurrent: {
        label: 'Current Cash Value',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'Current cash holdings'
      }
    },
    calculate: (inputs): PortfolioResult => {
      const {
        portfolioValue,
        stocksTarget,
        bondsTarget,
        cashTarget,
        stocksCurrent,
        bondsCurrent,
        cashCurrent
      } = inputs

      // Validate total allocation equals 100%
      if (Math.abs((stocksTarget + bondsTarget + cashTarget) - 100) > 0.01) {
        throw new Error('Target allocations must sum to 100%')
      }

      // Calculate target values and changes
      const stocksTargetValue = portfolioValue * (stocksTarget / 100)
      const bondsTargetValue = portfolioValue * (bondsTarget / 100)
      const cashTargetValue = portfolioValue * (cashTarget / 100)

      // Calculate current allocations
      const stocksCurrentPercent = (stocksCurrent / portfolioValue) * 100
      const bondsCurrentPercent = (bondsCurrent / portfolioValue) * 100
      const cashCurrentPercent = (cashCurrent / portfolioValue) * 100

      // Calculate required changes
      const stocksChange = stocksTargetValue - stocksCurrent
      const bondsChange = bondsTargetValue - bondsCurrent
      const cashChange = cashTargetValue - cashCurrent

      // Calculate drift from targets
      const stocksDrift = Math.abs(stocksCurrentPercent - stocksTarget)
      const bondsDrift = Math.abs(bondsCurrentPercent - bondsTarget)
      const cashDrift = Math.abs(cashCurrentPercent - cashTarget)

      return {
        stocksChange,
        bondsChange,
        cashChange,
        stocksDrift,
        bondsDrift,
        cashDrift,
        stocksCurrentPercent,
        bondsCurrentPercent,
        cashCurrentPercent,
        totalRebalanceAmount: (Math.abs(stocksChange) + Math.abs(bondsChange) + Math.abs(cashChange)) / 2
      }
    },
    formatResult: (result: PortfolioResult) => {
      const {
        stocksChange,
        bondsChange,
        cashChange,
        stocksDrift,
        bondsDrift,
        cashDrift,
        stocksCurrentPercent,
        bondsCurrentPercent,
        cashCurrentPercent,
        totalRebalanceAmount
      } = result

      return `Current Allocation:
Stocks: ${formatPercentage(stocksCurrentPercent)} (${stocksDrift > 5 ? 'Needs Rebalancing' : 'Within Range'})
Bonds: ${formatPercentage(bondsCurrentPercent)} (${bondsDrift > 5 ? 'Needs Rebalancing' : 'Within Range'})
Cash: ${formatPercentage(cashCurrentPercent)} (${cashDrift > 5 ? 'Needs Rebalancing' : 'Within Range'})

Required Changes:
${stocksChange > 0 ? 'Buy' : 'Sell'} Stocks: ${formatCurrency(Math.abs(stocksChange))}
${bondsChange > 0 ? 'Buy' : 'Sell'} Bonds: ${formatCurrency(Math.abs(bondsChange))}
${cashChange > 0 ? 'Add' : 'Remove'} Cash: ${formatCurrency(Math.abs(cashChange))}

Total Rebalance Amount: ${formatCurrency(totalRebalanceAmount)}`
    }
  }
} 