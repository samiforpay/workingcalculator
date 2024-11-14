import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const roiFormulas: FormulaConfig = {
  'roi/general': {
    name: 'General ROI Calculator',
    description: 'Calculate return on investment for any scenario',
    variables: {
      initialInvestment: {
        label: 'Initial Investment',
        type: 'currency',
        defaultValue: 1000,
        min: 0,
        helpText: 'The amount of money initially invested'
      },
      finalValue: {
        label: 'Final Value',
        type: 'currency',
        defaultValue: 1500,
        min: 0,
        helpText: 'The final value of the investment'
      },
      timePeriod: {
        label: 'Time Period (Years)',
        type: 'number',
        defaultValue: 1,
        min: 0,
        step: 0.1,
        helpText: 'Investment duration in years'
      }
    },
    calculate: (inputs) => {
      const { initialInvestment, finalValue, timePeriod } = inputs
      
      if (initialInvestment === 0) {
        throw new Error('Initial investment cannot be zero')
      }

      const totalReturn = finalValue - initialInvestment
      const roi = (totalReturn / initialInvestment) * 100
      const annualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / timePeriod) - 1) * 100

      return {
        roi,
        annualizedRoi,
        totalReturn,
        profitRatio: finalValue / initialInvestment
      }
    },
    formatResult: (result) => {
      const { roi, annualizedRoi, totalReturn, profitRatio } = result
      return `ROI: ${formatPercentage(roi)}
Annualized ROI: ${formatPercentage(annualizedRoi)}
Total Return: ${formatCurrency(totalReturn)}
Profit Ratio: ${profitRatio.toFixed(2)}x`
    }
  },
  'roi/real-estate': {
    name: 'Real Estate ROI Calculator',
    description: 'Calculate return on investment for real estate properties',
    variables: {
      purchasePrice: {
        label: 'Purchase Price',
        type: 'currency',
        defaultValue: 200000,
        min: 0,
        helpText: 'Total property purchase price'
      },
      downPayment: {
        label: 'Down Payment',
        type: 'currency',
        defaultValue: 40000,
        min: 0,
        helpText: 'Initial down payment amount'
      },
      monthlyRent: {
        label: 'Monthly Rent',
        type: 'currency',
        defaultValue: 2000,
        min: 0,
        helpText: 'Expected monthly rental income'
      },
      monthlyExpenses: {
        label: 'Monthly Expenses',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'Total monthly expenses (maintenance, taxes, insurance, etc.)'
      },
      propertyValueGrowth: {
        label: 'Annual Property Value Growth',
        type: 'percentage',
        defaultValue: 3,
        min: -20,
        max: 20,
        step: 0.1,
        helpText: 'Expected annual property value appreciation'
      }
    },
    calculate: (inputs) => {
      const { purchasePrice, downPayment, monthlyRent, monthlyExpenses, propertyValueGrowth } = inputs
      
      const annualRent = monthlyRent * 12
      const annualExpenses = monthlyExpenses * 12
      const netOperatingIncome = annualRent - annualExpenses
      
      const cashOnCashReturn = (netOperatingIncome / downPayment) * 100
      const appreciationReturn = (purchasePrice * (propertyValueGrowth / 100)) / downPayment * 100
      const totalRoi = cashOnCashReturn + appreciationReturn
      
      return {
        cashOnCashReturn,
        appreciationReturn,
        totalRoi,
        netOperatingIncome
      }
    },
    formatResult: (result) => {
      const { cashOnCashReturn, appreciationReturn, totalRoi, netOperatingIncome } = result
      return `Cash-on-Cash Return: ${formatPercentage(cashOnCashReturn)}
Appreciation Return: ${formatPercentage(appreciationReturn)}
Total ROI: ${formatPercentage(totalRoi)}
Net Operating Income: ${formatCurrency(netOperatingIncome)}`
    }
  }
} 