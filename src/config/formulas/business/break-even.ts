import type { Formula } from '@/config/formulas/types'

interface BreakEvenResult extends Record<string, number> {
  breakEvenUnits: number
  breakEvenRevenue: number
  contributionMargin: number
  contributionMarginRatio: number
}

export const breakEvenCalculator: Formula<BreakEvenResult> = {
  name: 'Break Even Calculator',
  description: '',
  longDescription: `
    <p>The Break Even Calculator helps you determine the point at which your total revenue equals your total costs, resulting in neither profit nor loss. This essential business planning tool helps you understand how many units you need to sell or how much revenue you need to generate to cover your costs.</p>
    <p>Analysis includes:</p>
    <ul>
      <li>Break-even point in units</li>
      <li>Break-even point in dollars</li>
      <li>Fixed and variable cost analysis</li>
      <li>Contribution margin calculation</li>
      <li>Profit and loss projections</li>
    </ul>
    <p>Understanding your break-even point is crucial for pricing decisions, production planning, and overall business strategy.</p>
  `,
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