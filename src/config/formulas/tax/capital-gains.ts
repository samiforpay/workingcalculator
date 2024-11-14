import type { Formula } from '@/config/formulas/types'

interface CapitalGainsResult extends Record<string, number> {
  capitalGains: number
  taxAmount: number
  effectiveRate: number
  netProfit: number
  [key: string]: number
}

export const capitalGainsTaxCalculator: Formula<CapitalGainsResult> = {
  name: 'Capital Gains Tax Calculator',
  description: 'Calculate tax on investment profits',
  variables: {
    purchasePrice: {
      label: 'Purchase Price',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 100,
      helpText: 'Original purchase price of the investment'
    },
    salePrice: {
      label: 'Sale Price',
      type: 'currency',
      defaultValue: 15000,
      min: 0,
      step: 100,
      helpText: 'Price at which the investment was sold'
    },
    holdingPeriod: {
      label: 'Holding Period (Months)',
      type: 'number',
      defaultValue: 24,
      min: 0,
      step: 1,
      helpText: 'Number of months the investment was held'
    },
    taxBracket: {
      label: 'Tax Bracket (%)',
      type: 'percentage',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1,
      helpText: 'Your current income tax bracket'
    }
  },
  calculate: (inputs) => {
    const { purchasePrice, salePrice, holdingPeriod, taxBracket } = inputs
    
    const capitalGains = salePrice - purchasePrice
    
    // Determine tax rate based on holding period
    const isLongTerm = holdingPeriod >= 12
    const taxRate = isLongTerm ? Math.min(20, taxBracket) : taxBracket
    
    const taxAmount = Math.max(0, capitalGains * (taxRate / 100))
    const effectiveRate = capitalGains > 0 ? (taxAmount / capitalGains) * 100 : 0
    const netProfit = capitalGains - taxAmount

    return {
      capitalGains,
      taxAmount,
      effectiveRate,
      netProfit
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Capital Gains Analysis:
--------------------
Capital Gains: ${formatter.format(result.capitalGains)}
Tax Amount: ${formatter.format(result.taxAmount)}
Effective Tax Rate: ${result.effectiveRate.toFixed(1)}%
Net Profit: ${formatter.format(result.netProfit)}
    `.trim()
  }
} 