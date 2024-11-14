import type { Formula } from '@/config/formulas/types'

interface InvestmentGrowthResult extends Record<string, number> {
  futureValue: number
  totalContributions: number
  totalInterest: number
  effectiveRate: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const INVESTMENT_GROWTH_CONFIG = {
  year: 2023,
  compoundingFrequencies: {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365
  },
  defaults: {
    initialInvestment: 10000,
    monthlyContribution: 500,
    annualRate: 7,
    years: 10,
    compoundingFrequency: 12 // monthly
  }
}

export const investmentGrowthCalculator: Formula<InvestmentGrowthResult> = {
  name: 'Investment Growth Calculator',
  description: 'Calculate how your investments grow over time with compound interest and regular contributions',
  variables: {
    initialInvestment: {
      label: 'Initial Investment',
      type: 'currency',
      defaultValue: INVESTMENT_GROWTH_CONFIG.defaults.initialInvestment,
      min: 0,
      step: 100,
      helpText: 'Starting amount to invest'
    },
    monthlyContribution: {
      label: 'Monthly Contribution',
      type: 'currency',
      defaultValue: INVESTMENT_GROWTH_CONFIG.defaults.monthlyContribution,
      min: 0,
      step: 50,
      helpText: 'Regular monthly investment amount'
    },
    annualRate: {
      label: 'Annual Return Rate (%)',
      type: 'percentage',
      defaultValue: INVESTMENT_GROWTH_CONFIG.defaults.annualRate,
      min: -20,
      max: 50,
      step: 0.1,
      helpText: 'Expected annual return rate'
    },
    years: {
      label: 'Investment Period (Years)',
      type: 'number',
      defaultValue: INVESTMENT_GROWTH_CONFIG.defaults.years,
      min: 1,
      max: 50,
      step: 1,
      helpText: 'Number of years to invest'
    },
    compoundingFrequency: {
      label: 'Compounding Frequency',
      type: 'number',
      defaultValue: INVESTMENT_GROWTH_CONFIG.defaults.compoundingFrequency,
      min: 1,
      max: 365,
      step: 1,
      helpText: 'Number of times interest is compounded per year'
    }
  },
  calculate: (inputs) => {
    const { initialInvestment, monthlyContribution, annualRate, years, compoundingFrequency } = inputs
    
    // Convert annual rate to decimal
    const r = annualRate / 100
    
    // Calculate future value using the compound interest formula with periodic contributions
    const m = compoundingFrequency
    const t = years
    const pmt = monthlyContribution * (12 / m) // Adjust contribution for compounding frequency
    
    // Calculate future value: FV = PV(1 + r/m)^(mt) + PMT*((1 + r/m)^(mt) - 1)/(r/m)
    const base = 1 + (r / m)
    const exp = m * t
    const futureValue = initialInvestment * Math.pow(base, exp) + 
                       pmt * (Math.pow(base, exp) - 1) / (r / m)
    
    // Calculate total contributions
    const totalContributions = initialInvestment + (monthlyContribution * 12 * years)
    
    // Calculate total interest earned
    const totalInterest = futureValue - totalContributions
    
    // Calculate effective annual rate
    const effectiveRate = (Math.pow(futureValue / totalContributions, 1/years) - 1) * 100

    return {
      futureValue,
      totalContributions,
      totalInterest,
      effectiveRate
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Investment Growth Analysis (${INVESTMENT_GROWTH_CONFIG.year}):
----------------------------------------
Future Value: ${formatter.format(result.futureValue)}

Breakdown:
--------
Total Contributions: ${formatter.format(result.totalContributions)}
Total Interest Earned: ${formatter.format(result.totalInterest)}
Effective Annual Rate: ${result.effectiveRate.toFixed(2)}%

Note: Results are estimates based on constant returns.
Actual investment performance may vary.
    `.trim()
  }
} 