import type { Formula } from '@/config/formulas/types'

interface RealEstateRoiResult extends Record<string, number> {
  roi: number
  netOperatingIncome: number
  cashFlow: number
  capRate: number
  [key: string]: number
}

export const realEstateRoiCalculator: Formula<RealEstateRoiResult> = {
  name: 'Real Estate ROI Calculator',
  description: '',
  longDescription: `
    <p>The Real Estate ROI Calculator helps you evaluate the potential return on investment for real estate properties. This tool considers all aspects of real estate investing, including purchase costs, rental income, operating expenses, and potential appreciation.</p>
    <p>Analysis includes:</p>
    <ul>
      <li>Cash flow projections</li>
      <li>Cap rate calculation</li>
      <li>Cash-on-cash return</li>
      <li>Total return on investment</li>
      <li>Property appreciation scenarios</li>
    </ul>
    <p>Make better real estate investment decisions by understanding both the cash flow potential and total return of a property investment.</p>
  `,
  variables: {
    purchasePrice: {
      label: 'Purchase Price',
      type: 'currency',
      defaultValue: 300000,
      min: 0,
      step: 1000,
      helpText: 'Total property purchase price'
    },
    monthlyRent: {
      label: 'Monthly Rental Income',
      type: 'currency',
      defaultValue: 2500,
      min: 0,
      step: 100,
      helpText: 'Expected monthly rental income'
    },
    monthlyExpenses: {
      label: 'Monthly Expenses',
      type: 'currency',
      defaultValue: 800,
      min: 0,
      step: 100,
      helpText: 'Total monthly expenses (maintenance, taxes, insurance, etc.)'
    },
    downPayment: {
      label: 'Down Payment',
      type: 'currency',
      defaultValue: 60000,
      min: 0,
      step: 1000,
      helpText: 'Initial investment/down payment'
    }
  },
  calculate: (inputs) => {
    const { purchasePrice, monthlyRent, monthlyExpenses, downPayment } = inputs
    
    const annualRent = monthlyRent * 12
    const annualExpenses = monthlyExpenses * 12
    const netOperatingIncome = annualRent - annualExpenses
    const cashFlow = netOperatingIncome - ((purchasePrice - downPayment) * 0.05) // Estimated mortgage payments
    const roi = (cashFlow / downPayment) * 100
    const capRate = (netOperatingIncome / purchasePrice) * 100

    return {
      roi,
      netOperatingIncome,
      cashFlow,
      capRate
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Real Estate Investment Analysis:
----------------------------
ROI: ${result.roi.toFixed(2)}%
Net Operating Income: ${formatter.format(result.netOperatingIncome)}
Annual Cash Flow: ${formatter.format(result.cashFlow)}
Cap Rate: ${result.capRate.toFixed(2)}%
    `.trim()
  }
} 