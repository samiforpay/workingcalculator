import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const optionsFormulas: FormulaConfig = {
  'stock-options': {
    name: 'Stock Options Calculator',
    description: 'Calculate potential profits and break-even points for stock options trading',
    variables: {
      optionType: {
        label: 'Option Type',
        type: 'number',
        defaultValue: 1, // 1 for Call, 0 for Put
        min: 0,
        max: 1,
        step: 1,
        helpText: 'Call (1) or Put (0) option'
      },
      strikePrice: {
        label: 'Strike Price',
        type: 'currency',
        defaultValue: 100,
        min: 0.01,
        helpText: 'Price at which the option can be exercised'
      },
      currentPrice: {
        label: 'Current Stock Price',
        type: 'currency',
        defaultValue: 100,
        min: 0.01,
        helpText: 'Current market price of the underlying stock'
      },
      optionPremium: {
        label: 'Option Premium',
        type: 'currency',
        defaultValue: 5,
        min: 0.01,
        helpText: 'Price paid for the option contract'
      },
      contracts: {
        label: 'Number of Contracts',
        type: 'number',
        defaultValue: 1,
        min: 1,
        helpText: 'Each contract represents 100 shares'
      }
    },
    calculate: (inputs) => {
      const { optionType, strikePrice, currentPrice, optionPremium, contracts } = inputs
      const sharesPerContract = 100
      const totalShares = contracts * sharesPerContract
      const totalPremium = optionPremium * totalShares

      // Calculate break-even point
      const breakEven = optionType === 1
        ? strikePrice + optionPremium // Call option
        : strikePrice - optionPremium // Put option

      // Calculate potential profit/loss at current price
      let profitLoss
      if (optionType === 1) { // Call option
        profitLoss = currentPrice > strikePrice
          ? (currentPrice - strikePrice - optionPremium) * totalShares
          : -totalPremium
      } else { // Put option
        profitLoss = currentPrice < strikePrice
          ? (strikePrice - currentPrice - optionPremium) * totalShares
          : -totalPremium
      }

      // Calculate maximum risk and potential return
      const maxRisk = totalPremium
      const maxReturn = optionType === 1
        ? Infinity // Call option theoretical max profit is unlimited
        : (strikePrice - optionPremium) * totalShares // Put option max profit

      return {
        breakEven,
        profitLoss,
        maxRisk,
        maxReturn: maxReturn === Infinity ? 999999999 : maxReturn, // Handle Infinity for formatting
        returnOnRisk: (profitLoss / maxRisk) * 100
      }
    },
    formatResult: (result) => {
      const { breakEven, profitLoss, maxRisk, maxReturn, returnOnRisk } = result
      
      return `Break-even Price: ${formatCurrency(breakEven)}
Current Profit/Loss: ${formatCurrency(profitLoss)}
Maximum Risk: ${formatCurrency(maxRisk)}
Maximum Return: ${maxReturn === 999999999 ? 'Unlimited' : formatCurrency(maxReturn)}
Return on Risk: ${formatPercentage(returnOnRisk)}`
    }
  }
} 