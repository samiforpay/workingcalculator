import type { Formula } from '@/config/formulas/types'

interface CapitalGainsResult extends Record<string, number> {
  capitalGains: number
  taxAmount: number
  effectiveRate: number
  netProfit: number
  shortTermTax: number
  longTermTax: number
  [key: string]: number
}

// Make tax rates configurable for easy updates
const CAPITAL_GAINS_CONFIG = {
  year: 2023,
  shortTerm: {
    brackets: [
      { rate: 0.37, min: 578125, name: '37% Bracket' },
      { rate: 0.35, min: 231250, name: '35% Bracket' },
      { rate: 0.32, min: 182100, name: '32% Bracket' },
      { rate: 0.24, min: 95375, name: '24% Bracket' },
      { rate: 0.22, min: 44725, name: '22% Bracket' },
      { rate: 0.12, min: 11000, name: '12% Bracket' },
      { rate: 0.10, min: 0, name: '10% Bracket' }
    ]
  },
  longTerm: {
    brackets: [
      { rate: 0.20, min: 492300, name: '20% Bracket (High Income)' },
      { rate: 0.15, min: 44625, name: '15% Bracket (Middle Income)' },
      { rate: 0.00, min: 0, name: '0% Bracket (Low Income)' }
    ]
  },
  netInvestmentIncomeTax: 0.038, // 3.8% additional tax for high-income investors
  netInvestmentIncomeThreshold: 200000
}

export const capitalGainsTaxCalculator: Formula<CapitalGainsResult> = {
  name: 'Capital Gains Tax Calculator',
  description: '',
  longDescription: `
    <p>Selling an asset? Use our Capital Gains Tax Calculator to figure out what taxes you'll owe on profits from real estate or stocks. This easy capital gains tax estimator simplifies the process of calculating capital gains tax on various investments, ensuring you're prepared when it comes time to file.</p>
    <p>Features included:</p>
    <ul>
      <li>Short-term vs long-term gains analysis</li>
      <li>Tax bracket consideration</li>
      <li>Investment expense deductions</li>
      <li>Net investment income tax calculations</li>
      <li>State tax implications</li>
    </ul>
    <p>Use this calculator to make informed decisions about timing your investment sales and understanding your potential tax liability.</p>
  `,
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
    annualIncome: {
      label: 'Annual Income',
      type: 'currency',
      defaultValue: 75000,
      min: 0,
      step: 1000,
      helpText: 'Your total annual income (affects tax rate)'
    },
    otherDeductions: {
      label: 'Investment Expenses',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      step: 100,
      helpText: 'Investment-related expenses (commissions, fees, etc.)'
    }
  },
  calculate: (inputs) => {
    const { purchasePrice, salePrice, holdingPeriod, annualIncome, otherDeductions } = inputs
    
    const capitalGains = salePrice - purchasePrice - otherDeductions
    const isLongTerm = holdingPeriod >= 12
    
    let taxAmount = 0
    let shortTermTax = 0
    let longTermTax = 0
    let taxByBracket: Record<string, number> = {}

    if (isLongTerm) {
      // Calculate long-term capital gains tax
      for (const bracket of CAPITAL_GAINS_CONFIG.longTerm.brackets) {
        if (annualIncome > bracket.min) {
          longTermTax = capitalGains * bracket.rate
          taxByBracket[bracket.name] = longTermTax
          break
        }
      }
    } else {
      // Calculate short-term capital gains tax (as ordinary income)
      let remainingGains = capitalGains
      for (const bracket of CAPITAL_GAINS_CONFIG.shortTerm.brackets) {
        if (annualIncome > bracket.min) {
          const taxableInThisBracket = Math.min(remainingGains, annualIncome - bracket.min)
          const taxForBracket = taxableInThisBracket * bracket.rate
          shortTermTax += taxForBracket
          taxByBracket[bracket.name] = taxForBracket
          remainingGains -= taxableInThisBracket
          if (remainingGains <= 0) break
        }
      }
    }

    taxAmount = shortTermTax + longTermTax

    // Add Net Investment Income Tax if applicable
    if (annualIncome > CAPITAL_GAINS_CONFIG.netInvestmentIncomeThreshold) {
      const niit = capitalGains * CAPITAL_GAINS_CONFIG.netInvestmentIncomeTax
      taxAmount += niit
      taxByBracket['Net Investment Income Tax'] = niit
    }

    const effectiveRate = (taxAmount / capitalGains) * 100
    const netProfit = capitalGains - taxAmount

    return {
      capitalGains,
      taxAmount,
      effectiveRate,
      netProfit,
      shortTermTax,
      longTermTax,
      ...taxByBracket
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    let taxBreakdown = ''
    if (result.shortTermTax > 0) {
      taxBreakdown = `\nShort-term Capital Gains Tax: ${formatter.format(result.shortTermTax)}`
    }
    if (result.longTermTax > 0) {
      taxBreakdown = `\nLong-term Capital Gains Tax: ${formatter.format(result.longTermTax)}`
    }

    return `
Capital Gains Analysis (${CAPITAL_GAINS_CONFIG.year}):
--------------------
Total Gain: ${formatter.format(result.capitalGains)}
Tax Type: ${result.shortTermTax > 0 ? 'Short-term' : 'Long-term'}

Tax Breakdown:${taxBreakdown}
Total Tax: ${formatter.format(result.taxAmount)}
Effective Tax Rate: ${result.effectiveRate.toFixed(1)}%

Final Results:
------------
Net Profit After Tax: ${formatter.format(result.netProfit)}

Note: Tax brackets and rates shown for ${CAPITAL_GAINS_CONFIG.year}. 
Rates and thresholds may be adjusted annually.
    `.trim()
  }
} 