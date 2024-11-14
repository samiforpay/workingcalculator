import type { Formula } from '@/config/formulas/types'

export const generalRoiCalculator: Formula = {
  name: 'General ROI Calculator',
  description: 'Calculate return on investment for various scenarios',
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