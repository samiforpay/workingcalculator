import type { Formula } from '@/config/formulas/types'

export const breakEvenCalculator: Formula = {
  name: 'Break-Even Analysis Calculator',
  description: 'Calculate your break-even point in units and revenue',
  variables: {
    fixedCosts: {
      label: 'Fixed Costs',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 100,
      helpText: 'Total fixed costs per period'
    },
    pricePerUnit: {
      label: 'Price Per Unit',
      type: 'currency',
      defaultValue: 100,
      min: 0.01,
      step: 0.01,
      helpText: 'Selling price per unit'
    },
    variableCostPerUnit: {
      label: 'Variable Cost Per Unit',
      type: 'currency',
      defaultValue: 60,
      min: 0,
      step: 0.01,
      helpText: 'Variable cost per unit'
    }
  },
  calculate: (inputs) => {
    const { fixedCosts, pricePerUnit, variableCostPerUnit } = inputs
    const contributionMargin = pricePerUnit - variableCostPerUnit
    const breakEvenUnits = fixedCosts / contributionMargin
    const breakEvenRevenue = breakEvenUnits * pricePerUnit

    return {
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio: (contributionMargin / pricePerUnit) * 100
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return `
Break-Even Analysis Results:
---------------------------
Break-Even Units: ${Math.ceil(result.breakEvenUnits)} units
Break-Even Revenue: ${formatter.format(result.breakEvenRevenue)}
Contribution Margin: ${formatter.format(result.contributionMargin)} per unit
Contribution Margin Ratio: ${result.contributionMarginRatio.toFixed(2)}%
    `.trim()
  }
} 