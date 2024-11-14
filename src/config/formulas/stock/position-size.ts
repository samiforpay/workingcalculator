import type { Formula } from '@/config/formulas/types'

interface PositionSizeResult extends Record<string, number> {
  positionSize: number
  numberOfShares: number
  riskAmount: number
  riskPercentage: number
  potentialProfit: number
  riskRewardRatio: number
  maxLoss: number
  breakEvenPrice: number
}

export const stockPositionCalculator: Formula<PositionSizeResult> = {
  name: 'Stock Position Size Calculator',
  description: 'Calculate optimal position size and risk management for stock trades',
  variables: {
    accountSize: {
      label: 'Account Size',
      type: 'currency',
      defaultValue: 100000,
      min: 0,
      step: 1000,
      helpText: 'Total trading account value'
    },
    riskPerTrade: {
      label: 'Risk Per Trade',
      type: 'percentage',
      defaultValue: 1,
      min: 0,
      max: 100,
      step: 0.1,
      helpText: 'Maximum risk percentage per trade'
    },
    entryPrice: {
      label: 'Entry Price',
      type: 'currency',
      defaultValue: 50,
      min: 0,
      step: 0.01,
      helpText: 'Stock entry price'
    },
    stopLoss: {
      label: 'Stop Loss Price',
      type: 'currency',
      defaultValue: 48,
      min: 0,
      step: 0.01,
      helpText: 'Stop loss price level'
    },
    targetPrice: {
      label: 'Target Price',
      type: 'currency',
      defaultValue: 55,
      min: 0,
      step: 0.01,
      helpText: 'Profit target price level'
    },
    commission: {
      label: 'Commission per Trade',
      type: 'currency',
      defaultValue: 5,
      min: 0,
      step: 0.5,
      helpText: 'Trading commission per transaction'
    }
  },
  calculate: (inputs) => {
    const {
      accountSize,
      riskPerTrade,
      entryPrice,
      stopLoss,
      targetPrice,
      commission
    } = inputs

    // Calculate risk per share
    const riskPerShare = Math.abs(entryPrice - stopLoss)

    // Calculate maximum risk amount
    const maxRiskAmount = (accountSize * riskPerTrade) / 100

    // Calculate position size
    const numberOfShares = Math.floor((maxRiskAmount - (2 * commission)) / riskPerShare)
    const positionSize = numberOfShares * entryPrice

    // Calculate actual risk amount including commissions
    const riskAmount = (numberOfShares * riskPerShare) + (2 * commission)
    const riskPercentage = (riskAmount / accountSize) * 100

    // Calculate potential profit
    const potentialProfit = numberOfShares * (targetPrice - entryPrice) - (2 * commission)

    // Calculate risk/reward ratio
    const riskRewardRatio = potentialProfit / riskAmount

    // Calculate maximum loss
    const maxLoss = numberOfShares * (entryPrice - stopLoss) + (2 * commission)

    // Calculate break-even price
    const breakEvenPrice = entryPrice + ((2 * commission) / numberOfShares)

    return {
      positionSize,
      numberOfShares,
      riskAmount,
      riskPercentage,
      potentialProfit,
      riskRewardRatio,
      maxLoss,
      breakEvenPrice
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 2
    })

    const {
      positionSize,
      numberOfShares,
      riskAmount,
      riskPercentage,
      potentialProfit,
      riskRewardRatio,
      maxLoss,
      breakEvenPrice
    } = result

    return `
Position Size Analysis:
--------------------
Position Size: ${formatter.format(positionSize)}
Number of Shares: ${numberOfShares}
Break-even Price: ${formatter.format(breakEvenPrice)}

Risk Analysis:
------------
Risk Amount: ${formatter.format(riskAmount)}
Risk Percentage: ${riskPercentage.toFixed(2)}%
Maximum Loss: ${formatter.format(maxLoss)}

Profit Potential:
--------------
Potential Profit: ${formatter.format(potentialProfit)}
Risk/Reward Ratio: ${riskRewardRatio.toFixed(2)}:1
    `.trim()
  }
} 