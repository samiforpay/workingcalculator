import type { Formula } from '@/config/formulas/types'

interface OptionsResult extends Record<string, number> {
  callProfit: number
  putProfit: number
  breakEvenCall: number
  breakEvenPut: number
  maxLoss: number
  returnOnInvestment: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const OPTIONS_TRADING_CONFIG = {
  year: 2023,
  defaults: {
    sharePrice: 100,
    strikePrice: 105,
    optionPrice: 2.50,
    contracts: 1
  },
  limits: {
    maxPrice: 1000000,  // $1M per share
    maxContracts: 10000, // 10,000 contracts
    minPrice: 0.01      // 1 cent minimum
  },
  contractSize: 100,    // Standard 100 shares per contract
  fees: {
    commission: 0.65,   // Per contract
    assignment: 5.00,   // Exercise/assignment fee
    regulatory: 0.02    // Per contract regulatory fees
  }
}

export const optionsTradingCalculator: Formula<OptionsResult> = {
  name: 'Options Trading Calculator',
  description: 'Calculate potential profits and losses for call and put options',
  variables: {
    currentPrice: {
      label: 'Current Share Price',
      type: 'currency',
      defaultValue: OPTIONS_TRADING_CONFIG.defaults.sharePrice,
      min: OPTIONS_TRADING_CONFIG.limits.minPrice,
      max: OPTIONS_TRADING_CONFIG.limits.maxPrice,
      step: 0.01,
      helpText: 'Current market price of the underlying stock'
    },
    strikePrice: {
      label: 'Strike Price',
      type: 'currency',
      defaultValue: OPTIONS_TRADING_CONFIG.defaults.strikePrice,
      min: OPTIONS_TRADING_CONFIG.limits.minPrice,
      max: OPTIONS_TRADING_CONFIG.limits.maxPrice,
      step: 0.01,
      helpText: 'Strike price of the option contract'
    },
    optionPrice: {
      label: 'Option Premium',
      type: 'currency',
      defaultValue: OPTIONS_TRADING_CONFIG.defaults.optionPrice,
      min: OPTIONS_TRADING_CONFIG.limits.minPrice,
      max: OPTIONS_TRADING_CONFIG.limits.maxPrice,
      step: 0.01,
      helpText: 'Price paid/received per share for the option'
    },
    contracts: {
      label: 'Number of Contracts',
      type: 'number',
      defaultValue: OPTIONS_TRADING_CONFIG.defaults.contracts,
      min: 1,
      max: OPTIONS_TRADING_CONFIG.limits.maxContracts,
      step: 1,
      helpText: 'Number of option contracts (each controls 100 shares)'
    },
    optionType: {
      label: 'Option Type',
      type: 'select',
      defaultValue: 1,
      options: [
        { label: 'Call Option', value: 1 },
        { label: 'Put Option', value: 2 }
      ],
      helpText: 'Type of option contract'
    },
    position: {
      label: 'Position',
      type: 'select',
      defaultValue: 1,
      options: [
        { label: 'Long (Buy)', value: 1 },
        { label: 'Short (Sell)', value: 2 }
      ],
      helpText: 'Whether you are buying or selling the option'
    }
  },
  calculate: (inputs) => {
    const {
      currentPrice,
      strikePrice,
      optionPrice,
      contracts,
      optionType,
      position
    } = inputs

    const contractMultiplier = OPTIONS_TRADING_CONFIG.contractSize
    const totalContracts = contracts * contractMultiplier

    // Calculate total fees
    const totalFees = (OPTIONS_TRADING_CONFIG.fees.commission * contracts) +
                     (OPTIONS_TRADING_CONFIG.fees.regulatory * contracts)

    // Calculate Call Option Profit/Loss
    const callProfit = optionType === 1
      ? ((currentPrice - strikePrice - optionPrice) * totalContracts) - totalFees
      : 0

    // Calculate Put Option Profit/Loss
    const putProfit = optionType === 2
      ? ((strikePrice - currentPrice - optionPrice) * totalContracts) - totalFees
      : 0

    // Adjust for position (long/short)
    const finalProfit = position === 2 
      ? (optionType === 1 ? -callProfit : -putProfit)
      : (optionType === 1 ? callProfit : putProfit)

    // Calculate Break-Even Points
    const breakEvenCall = strikePrice + optionPrice
    const breakEvenPut = strikePrice - optionPrice

    // Calculate Maximum Loss
    const maxLoss = position === 1
      ? (optionPrice * totalContracts) + totalFees
      : optionType === 1
        ? (currentPrice > strikePrice 
           ? ((currentPrice - strikePrice + optionPrice) * totalContracts) + totalFees
           : (optionPrice * totalContracts) + totalFees)
        : ((strikePrice - currentPrice + optionPrice) * totalContracts) + totalFees

    // Calculate Return on Investment
    const investment = optionPrice * totalContracts
    const returnOnInvestment = investment > 0 
      ? (finalProfit / investment) * 100 
      : 0

    return {
      callProfit,
      putProfit,
      breakEvenCall,
      breakEvenPut,
      maxLoss,
      returnOnInvestment,
      finalProfit,
      totalFees,
      investment
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

    return `
Options Trading Analysis:
----------------------
Profit/Loss: ${formatter.format(result.finalProfit)}
Return on Investment: ${percentFormatter.format(result.returnOnInvestment)}%

Break-Even Analysis:
-----------------
Break-Even (Call): ${formatter.format(result.breakEvenCall)}
Break-Even (Put): ${formatter.format(result.breakEvenPut)}

Risk Assessment:
-------------
Maximum Loss: ${formatter.format(result.maxLoss)}
Total Investment: ${formatter.format(result.investment)}
Total Fees: ${formatter.format(result.totalFees)}

Note: Options trading involves significant risk.
This is a simplified calculation that doesn't include all market factors.
Past performance does not guarantee future results.
    `.trim()
  }
} 