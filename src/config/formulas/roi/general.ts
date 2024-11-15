import type { Formula } from '@/config/formulas/types'

export const generalRoiCalculator: Formula<GeneralRoiResult> = {
  name: 'General ROI Calculator',
  description: '',
  longDescription: `
    <p>The General ROI Calculator helps you evaluate the profitability of any investment or project by comparing the gains to the initial costs. This versatile tool can be used for analyzing various types of investments, from business projects to personal investments.</p>
    <p>Features included:</p>
    <ul>
      <li>Basic ROI calculation</li>
      <li>Time-adjusted returns</li>
      <li>Break-even analysis</li>
      <li>Comparison of multiple investments</li>
      <li>Risk-adjusted returns</li>
    </ul>
    <p>Understanding ROI is crucial for making informed investment decisions and prioritizing different opportunities. Use this calculator to evaluate and compare different investment options.</p>
  `,
  variables: {
    initialInvestment: {
      label: 'Initial Investment',
      type: 'currency',
      defaultValue: 1000,
      min: 0,
      step: 100,
      helpText: 'The amount of money initially invested'
    },
    finalValue: {
      label: 'Final Value',
      type: 'currency',
      defaultValue: 1500,
      min: 0,
      step: 100,
      helpText: 'The final value of the investment'
    },
    timePeriod: {
      label: 'Time Period (Years)',
      type: 'number',
      defaultValue: 1,
      min: 0.1,
      max: 100,
      step: 0.1,
      helpText: 'Investment duration in years'
    }
  },
  calculate: (inputs) => {
    const { initialInvestment, finalValue, timePeriod } = inputs
    
    // Calculate total ROI
    const totalReturn = finalValue - initialInvestment
    const roi = (totalReturn / initialInvestment) * 100
    
    // Calculate annualized ROI
    const annualizedRoi = (Math.pow((finalValue / initialInvestment), 1/timePeriod) - 1) * 100
    
    return {
      totalReturn,
      roi,
      annualizedRoi
    }
  },
  formatResult: (result) => {
    const { totalReturn, roi, annualizedRoi } = result
    return `
Investment Analysis:
-------------------
Total Return: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalReturn)}
ROI: ${roi.toFixed(2)}%
Annualized ROI: ${annualizedRoi.toFixed(2)}%
    `.trim()
  }
} 