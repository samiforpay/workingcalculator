import type { Formula } from '@/config/formulas/types'

interface InvestmentResult extends Record<string, number> {
  totalReturn: number
  annualizedReturn: number
  totalDividends: number
  capitalGains: number
  finalValue: number
  [key: string]: number
}

export const investmentReturnsCalculator: Formula<InvestmentResult> = {
  name: 'Investment Returns Calculator',
  description: 'Calculate total returns including dividends and capital gains',
  variables: {
    initialInvestment: {
      label: 'Initial Investment',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 100,
      helpText: 'Starting investment amount'
    },
    yearsHeld: {
      label: 'Investment Period (Years)',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 50,
      step: 1,
      helpText: 'Number of years investment is held'
    },
    annualDividendYield: {
      label: 'Annual Dividend Yield (%)',
      type: 'percentage',
      defaultValue: 2,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: 'Expected annual dividend yield percentage'
    },
    expectedGrowthRate: {
      label: 'Expected Annual Growth Rate (%)',
      type: 'percentage',
      defaultValue: 7,
      min: -20,
      max: 30,
      step: 0.1,
      helpText: 'Expected annual price appreciation rate'
    }
  },
  calculate: (inputs) => {
    const { initialInvestment, yearsHeld, annualDividendYield, expectedGrowthRate } = inputs
    
    // Calculate final value with compound growth
    const finalValue = initialInvestment * Math.pow(1 + expectedGrowthRate/100, yearsHeld)
    
    // Calculate capital gains
    const capitalGains = finalValue - initialInvestment
    
    // Calculate total dividends (simplified, not accounting for dividend reinvestment)
    const totalDividends = initialInvestment * (annualDividendYield/100) * yearsHeld
    
    // Calculate total return
    const totalReturn = capitalGains + totalDividends
    
    // Calculate annualized return
    const annualizedReturn = (Math.pow((finalValue + totalDividends)/initialInvestment, 1/yearsHeld) - 1) * 100

    return {
      totalReturn,
      annualizedReturn,
      totalDividends,
      capitalGains,
      finalValue
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Investment Returns Analysis:
-------------------------
Total Return: ${formatter.format(result.totalReturn)}
Annualized Return: ${result.annualizedReturn.toFixed(2)}%

Components:
---------
Capital Gains: ${formatter.format(result.capitalGains)}
Total Dividends: ${formatter.format(result.totalDividends)}
Final Value: ${formatter.format(result.finalValue)}
    `.trim()
  }
} 