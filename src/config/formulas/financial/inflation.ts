import type { Formula } from '@/config/formulas/types'

export const inflationCalculator: Formula = {
  name: 'Inflation Impact Calculator',
  description: 'Calculate how inflation affects your purchasing power over time',
  variables: {
    currentAmount: {
      label: 'Current Amount',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 100,
      helpText: 'Amount to calculate future value for'
    },
    inflationRate: {
      label: 'Annual Inflation Rate (%)',
      type: 'percentage',
      defaultValue: 3,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: 'Expected annual inflation rate'
    },
    years: {
      label: 'Time Period (Years)',
      type: 'number',
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
      helpText: 'Number of years to project'
    }
  },
  calculate: (inputs) => {
    const { currentAmount, inflationRate, years } = inputs
    
    // Calculate future value needed for same purchasing power
    const futureAmount = currentAmount * Math.pow(1 + inflationRate/100, years)
    
    // Calculate purchasing power loss
    const purchasingPowerLoss = futureAmount - currentAmount
    
    // Calculate equivalent value today of future amount
    const presentValue = currentAmount * Math.pow(1 + inflationRate/100, -years)

    return {
      futureAmount,
      purchasingPowerLoss,
      presentValue,
      percentageLoss: (purchasingPowerLoss / currentAmount) * 100
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Inflation Impact Analysis:
------------------------
Future Amount Needed: ${formatter.format(result.futureAmount)}
Purchasing Power Loss: ${formatter.format(result.purchasingPowerLoss)}
Present Value: ${formatter.format(result.presentValue)}
Percentage Loss: ${result.percentageLoss.toFixed(2)}%
    `.trim()
  }
} 