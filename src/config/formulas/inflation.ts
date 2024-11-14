import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const inflationFormulas: FormulaConfig = {
  'inflation': {
    name: 'Inflation Calculator',
    description: 'Calculate how inflation affects purchasing power over time',
    variables: {
      startingAmount: {
        label: 'Starting Amount',
        type: 'currency',
        defaultValue: 1000,
        min: 0,
        helpText: 'Initial amount of money'
      },
      inflationRate: {
        label: 'Annual Inflation Rate',
        type: 'percentage',
        defaultValue: 2.5,
        min: -20,
        max: 50,
        step: 0.1,
        helpText: 'Expected annual inflation rate (historically around 2-3%)'
      },
      years: {
        label: 'Time Period (Years)',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 100,
        helpText: 'Number of years to project'
      }
    },
    calculate: (inputs) => {
      const { startingAmount, inflationRate, years } = inputs
      
      // Calculate future value with inflation
      const futureValue = startingAmount * Math.pow(1 + (inflationRate / 100), years)
      
      // Calculate purchasing power loss
      const purchasingPowerLoss = startingAmount - futureValue
      
      // Calculate cumulative inflation rate
      const cumulativeRate = ((futureValue / startingAmount) - 1) * 100

      // Calculate average annual purchasing power decrease
      const annualPowerDecrease = (1 - Math.pow(futureValue / startingAmount, 1 / years)) * 100

      return {
        futureValue,
        purchasingPowerLoss,
        cumulativeRate,
        annualPowerDecrease,
        equivalentValue: startingAmount / Math.pow(1 + (inflationRate / 100), years)
      }
    },
    formatResult: (result) => {
      const {
        futureValue,
        purchasingPowerLoss,
        cumulativeRate,
        annualPowerDecrease,
        equivalentValue
      } = result

      return `Future Value: ${formatCurrency(futureValue)}
Purchasing Power Loss: ${formatCurrency(Math.abs(purchasingPowerLoss))}
Cumulative Inflation: ${formatPercentage(cumulativeRate)}
Annual Purchasing Power Decrease: ${formatPercentage(annualPowerDecrease)}
Equivalent Value Today: ${formatCurrency(equivalentValue)}`
    }
  }
} 