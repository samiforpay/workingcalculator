import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const mortgageFormulas: FormulaConfig = {
  'mortgage-refinance': {
    name: 'Mortgage Refinance Calculator',
    description: 'Calculate potential savings from refinancing your mortgage',
    variables: {
      currentLoanBalance: {
        label: 'Current Loan Balance',
        type: 'currency',
        defaultValue: 300000,
        min: 0,
        helpText: 'Your current mortgage balance'
      },
      currentRate: {
        label: 'Current Interest Rate',
        type: 'percentage',
        defaultValue: 6.5,
        min: 0,
        max: 20,
        step: 0.125,
        helpText: 'Your current mortgage interest rate'
      },
      newRate: {
        label: 'New Interest Rate',
        type: 'percentage',
        defaultValue: 5.5,
        min: 0,
        max: 20,
        step: 0.125,
        helpText: 'Interest rate offered for refinancing'
      },
      remainingTerm: {
        label: 'Remaining Term (Years)',
        type: 'number',
        defaultValue: 25,
        min: 1,
        max: 30,
        helpText: 'Years remaining on your current mortgage'
      },
      newTerm: {
        label: 'New Term (Years)',
        type: 'number',
        defaultValue: 30,
        min: 1,
        max: 30,
        helpText: 'Length of the new mortgage'
      },
      closingCosts: {
        label: 'Closing Costs',
        type: 'currency',
        defaultValue: 5000,
        min: 0,
        helpText: 'Total costs to refinance (fees, points, etc.)'
      }
    },
    calculate: (inputs) => {
      const { currentLoanBalance, currentRate, newRate, remainingTerm, newTerm, closingCosts } = inputs
      
      // Calculate current monthly payment
      const currentMonthlyRate = currentRate / 100 / 12
      const currentMonths = remainingTerm * 12
      const currentPayment = currentLoanBalance * 
        (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths)) /
        (Math.pow(1 + currentMonthlyRate, currentMonths) - 1)

      // Calculate new monthly payment
      const newMonthlyRate = newRate / 100 / 12
      const newMonths = newTerm * 12
      const newPayment = currentLoanBalance * 
        (newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths)) /
        (Math.pow(1 + newMonthlyRate, newMonths) - 1)

      // Calculate total costs and savings
      const currentTotalCost = currentPayment * currentMonths
      const newTotalCost = (newPayment * newMonths) + closingCosts
      const monthlySavings = currentPayment - newPayment
      const totalSavings = currentTotalCost - newTotalCost

      // Calculate break-even point
      const breakEvenMonths = Math.ceil(closingCosts / monthlySavings)

      return {
        currentPayment,
        newPayment,
        monthlySavings,
        totalSavings,
        breakEvenMonths,
        currentTotalCost,
        newTotalCost
      }
    },
    formatResult: (result) => {
      const {
        currentPayment,
        newPayment,
        monthlySavings,
        totalSavings,
        breakEvenMonths,
        currentTotalCost,
        newTotalCost
      } = result

      const years = Math.floor(breakEvenMonths / 12)
      const months = breakEvenMonths % 12

      return `Current Monthly Payment: ${formatCurrency(currentPayment)}
New Monthly Payment: ${formatCurrency(newPayment)}
Monthly Savings: ${formatCurrency(monthlySavings)}
Total Savings: ${formatCurrency(totalSavings)}
Break-even Point: ${years > 0 ? `${years} years and ` : ''}${months} months
Current Total Cost: ${formatCurrency(currentTotalCost)}
New Total Cost: ${formatCurrency(newTotalCost)}`
    }
  }
} 