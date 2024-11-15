import type { Formula } from '@/config/formulas/types'

interface AssetAllocationResult extends Record<string, number> {
  totalPortfolioValue: number
  stocksAllocation: number
  bondsAllocation: number
  realEstateAllocation: number
  cashAllocation: number
  commoditiesAllocation: number
  stocksDeviation: number
  bondsDeviation: number
  realEstateDeviation: number
  cashDeviation: number
  commoditiesDeviation: number
  [key: string]: number
}

const ASSET_ALLOCATION_CONFIG = {
  year: 2023,
  defaults: {
    cash: 25000,
    cashTarget: 10,
    stocks: 100000,
    stocksTarget: 40,
    bonds: 50000,
    bondsTarget: 25,
    realEstate: 75000,
    realEstateTarget: 20,
    commodities: 20000,
    commoditiesTarget: 5
  },
  limits: {
    maxAmount: 100000000000, // 100 billion
    minAmount: 0,
    maxAllocation: 100,
    minAllocation: 0
  }
}

export const assetAllocationCalculator: Formula<AssetAllocationResult> = {
  name: 'Asset Allocation Calculator',
  description: 'Calculate and optimize your investment portfolio allocation across different asset classes',
  variables: {
    // Cash section (always visible)
    cash: {
      label: 'Current Cash Value',
      type: 'currency',
      defaultValue: ASSET_ALLOCATION_CONFIG.defaults.cash,
      min: 0,
      max: ASSET_ALLOCATION_CONFIG.limits.maxAmount,
      step: 'any',
      helpText: 'Total cash and equivalents'
    },
    cashTarget: {
      label: 'Target Cash Allocation (%)',
      type: 'percentage',
      defaultValue: ASSET_ALLOCATION_CONFIG.defaults.cashTarget,
      min: 0,
      max: 100,
      step: 0.1,
      helpText: 'Desired percentage in cash'
    },
    // Stocks section
    enableStocks: {
      label: 'Include Stocks',
      type: 'boolean',
      defaultValue: false,
      helpText: 'Include stocks in portfolio allocation',
      isSection: true
    },
    stocks: {
      label: 'Current Stocks Value',
      type: 'currency',
      defaultValue: ASSET_ALLOCATION_CONFIG.defaults.stocks,
      min: 0,
      max: ASSET_ALLOCATION_CONFIG.limits.maxAmount,
      step: 'any',
      helpText: 'Total value of stock investments',
      dependsOn: 'enableStocks'
    },
    stocksTarget: {
      label: 'Target Stocks Allocation (%)',
      type: 'percentage',
      defaultValue: ASSET_ALLOCATION_CONFIG.defaults.stocksTarget,
      min: 0,
      max: 100,
      step: 0.1,
      helpText: 'Desired percentage in stocks',
      dependsOn: 'enableStocks'
    }
    // ... rest of the asset classes follow the same pattern
  },
  calculate: (inputs) => {
    // Calculate total portfolio value from enabled assets
    let totalPortfolioValue = inputs.cash
    let totalTargetAllocation = inputs.cashTarget

    // Initialize all allocations to 0
    const result: AssetAllocationResult = {
      totalPortfolioValue: 0,
      stocksAllocation: 0,
      bondsAllocation: 0,
      realEstateAllocation: 0,
      cashAllocation: 0,
      commoditiesAllocation: 0,
      stocksDeviation: 0,
      bondsDeviation: 0,
      realEstateDeviation: 0,
      cashDeviation: 0,
      commoditiesDeviation: 0
    }

    // Add enabled assets to total
    if (inputs.enableStocks) {
      totalPortfolioValue += inputs.stocks
      totalTargetAllocation += inputs.stocksTarget
    }
    if (inputs.enableBonds) {
      totalPortfolioValue += inputs.bonds
      totalTargetAllocation += inputs.bondsTarget
    }
    if (inputs.enableRealEstate) {
      totalPortfolioValue += inputs.realEstate
      totalTargetAllocation += inputs.realEstateTarget
    }
    if (inputs.enableCommodities) {
      totalPortfolioValue += inputs.commodities
      totalTargetAllocation += inputs.commoditiesTarget
    }

    // Calculate current allocations and deviations
    result.totalPortfolioValue = totalPortfolioValue
    result.cashAllocation = (inputs.cash / totalPortfolioValue) * 100
    result.cashDeviation = result.cashAllocation - inputs.cashTarget

    if (inputs.enableStocks) {
      result.stocksAllocation = (inputs.stocks / totalPortfolioValue) * 100
      result.stocksDeviation = result.stocksAllocation - inputs.stocksTarget
    }
    if (inputs.enableBonds) {
      result.bondsAllocation = (inputs.bonds / totalPortfolioValue) * 100
      result.bondsDeviation = result.bondsAllocation - inputs.bondsTarget
    }
    if (inputs.enableRealEstate) {
      result.realEstateAllocation = (inputs.realEstate / totalPortfolioValue) * 100
      result.realEstateDeviation = result.realEstateAllocation - inputs.realEstateTarget
    }
    if (inputs.enableCommodities) {
      result.commoditiesAllocation = (inputs.commodities / totalPortfolioValue) * 100
      result.commoditiesDeviation = result.commoditiesAllocation - inputs.commoditiesTarget
    }

    return result
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })

    return `
Portfolio Analysis:
----------------
Total Portfolio Value: ${formatter.format(result.totalPortfolioValue)}

Current Allocations:
-----------------
Cash: ${percentFormatter.format(result.cashAllocation)}%
${result.stocksAllocation > 0 ? `Stocks: ${percentFormatter.format(result.stocksAllocation)}%\n` : ''}
${result.bondsAllocation > 0 ? `Bonds: ${percentFormatter.format(result.bondsAllocation)}%\n` : ''}
${result.realEstateAllocation > 0 ? `Real Estate: ${percentFormatter.format(result.realEstateAllocation)}%\n` : ''}
${result.commoditiesAllocation > 0 ? `Commodities: ${percentFormatter.format(result.commoditiesAllocation)}%\n` : ''}

Allocation Adjustments Needed:
--------------------------
Cash: ${result.cashDeviation > 0 ? 'Reduce' : 'Increase'} by ${Math.abs(result.cashDeviation).toFixed(1)}%
${result.stocksAllocation > 0 ? `Stocks: ${result.stocksDeviation > 0 ? 'Reduce' : 'Increase'} by ${Math.abs(result.stocksDeviation).toFixed(1)}%\n` : ''}
${result.bondsAllocation > 0 ? `Bonds: ${result.bondsDeviation > 0 ? 'Reduce' : 'Increase'} by ${Math.abs(result.bondsDeviation).toFixed(1)}%\n` : ''}
${result.realEstateAllocation > 0 ? `Real Estate: ${result.realEstateDeviation > 0 ? 'Reduce' : 'Increase'} by ${Math.abs(result.realEstateDeviation).toFixed(1)}%\n` : ''}
${result.commoditiesAllocation > 0 ? `Commodities: ${result.commoditiesDeviation > 0 ? 'Reduce' : 'Increase'} by ${Math.abs(result.commoditiesDeviation).toFixed(1)}%\n` : ''}

Note: Consider tax implications and transaction costs
when rebalancing your portfolio. Regular rebalancing
helps maintain your desired risk level.
    `.trim()
  }
} 