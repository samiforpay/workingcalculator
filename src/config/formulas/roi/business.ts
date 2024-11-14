import type { Formula } from '@/config/formulas/types'

interface BusinessRoiResult extends Record<string, number> {
  roi: number
  netProfit: number
  paybackPeriod: number
  profitMargin: number
  [key: string]: number
}

export const businessRoiCalculator: Formula<BusinessRoiResult> = {
  name: 'Business ROI Calculator',
  description: 'Calculate return on investment for business projects',
  variables: {
    initialInvestment: {
      label: 'Initial Investment',
      type: 'currency',
      defaultValue: 100000,
      min: 0,
      step: 1000,
      helpText: 'Total initial investment required'
    },
    annualRevenue: {
      label: 'Annual Revenue',
      type: 'currency',
      defaultValue: 250000,
      min: 0,
      step: 1000,
      helpText: 'Expected annual revenue'
    },
    annualCosts: {
      label: 'Annual Operating Costs',
      type: 'currency',
      defaultValue: 175000,
      min: 0,
      step: 1000,
      helpText: 'Total annual operating costs'
    },
    projectLifespan: {
      label: 'Project Lifespan (Years)',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 30,
      step: 1,
      helpText: 'Expected project duration in years'
    }
  },
  calculate: (inputs) => {
    const { initialInvestment, annualRevenue, annualCosts, projectLifespan } = inputs
    
    const netProfit = annualRevenue - annualCosts
    const totalProfit = netProfit * projectLifespan
    const roi = ((totalProfit - initialInvestment) / initialInvestment) * 100
    const paybackPeriod = initialInvestment / netProfit
    const profitMargin = (netProfit / annualRevenue) * 100

    return {
      roi,
      netProfit,
      paybackPeriod,
      profitMargin
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Business Investment Analysis:
-------------------------
ROI: ${result.roi.toFixed(2)}%
Annual Net Profit: ${formatter.format(result.netProfit)}
Payback Period: ${result.paybackPeriod.toFixed(1)} years
Profit Margin: ${result.profitMargin.toFixed(2)}%
    `.trim()
  }
} 