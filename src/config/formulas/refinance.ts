import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const refinanceFormulas: FormulaConfig = {
  'mortgage-refinance': {
    name: 'Mortgage Refinance Calculator',
    description: 'Calculate potential savings from refinancing your mortgage',
    variables: {
      currentBalance: {
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
      remainingYears: {
        label: 'Remaining Years on Current Loan',
        type: 'number',
        defaultValue: 25,
        min: 1,
        max: 30,
        helpText: 'Years remaining on your current mortgage'
      },
      newTerm: {
        label: 'New Loan Term (Years)',
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
      },
      propertyTax: {
        label: 'Annual Property Tax',
        type: 'currency',
        defaultValue: 3000,
        min: 0,
        helpText: 'Annual property tax amount'
      },
      insurance: {
        label: 'Annual Insurance',
        type: 'currency',
        defaultValue: 1200,
        min: 0,
        helpText: 'Annual homeowners insurance'
      }
    },
    calculate: (inputs) => {
      const { 
        currentBalance, 
        currentRate, 
        newRate, 
        remainingYears, 
        newTerm, 
        closingCosts,
        propertyTax,
        insurance
      } = inputs

      // Calculate current monthly payment
      const currentMonthlyRate = currentRate / 100 / 12
      const currentMonths = remainingYears * 12
      const currentPayment = currentBalance * 
        (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths)) /
        (Math.pow(1 + currentMonthlyRate, currentMonths) - 1)

      // Calculate new monthly payment
      const newMonthlyRate = newRate / 100 / 12
      const newMonths = newTerm * 12
      const newPayment = currentBalance * 
        (newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths)) /
        (Math.pow(1 + newMonthlyRate, newMonths) - 1)

      // Calculate monthly escrow (taxes and insurance)
      const monthlyEscrow = (propertyTax + insurance) / 12

      // Calculate total costs and savings
      const currentTotalCost = (currentPayment + monthlyEscrow) * currentMonths
      const newTotalCost = (newPayment + monthlyEscrow) * newMonths + closingCosts
      const monthlySavings = currentPayment - newPayment
      const totalSavings = currentTotalCost - newTotalCost

      // Calculate break-even point
      const breakEvenMonths = Math.ceil(closingCosts / monthlySavings)

      // Calculate interest savings
      const currentTotalInterest = (currentPayment * currentMonths) - currentBalance
      const newTotalInterest = (newPayment * newMonths) - currentBalance
      const interestSavings = currentTotalInterest - newTotalInterest

      return {
        currentPayment,
        newPayment,
        monthlySavings,
        totalSavings,
        breakEvenMonths,
        interestSavings,
        totalMonthlyPayment: newPayment + monthlyEscrow,
        lifetimeSavings: totalSavings - closingCosts
      }
    },
    formatResult: (result) => {
      const {
        currentPayment,
        newPayment,
        monthlySavings,
        totalSavings,
        breakEvenMonths,
        interestSavings,
        totalMonthlyPayment,
        lifetimeSavings
      } = result

      const years = Math.floor(breakEvenMonths / 12)
      const months = breakEvenMonths % 12

      return `Current Monthly Principal & Interest: ${formatCurrency(currentPayment)}
New Monthly Principal & Interest: ${formatCurrency(newPayment)}
Total Monthly Payment (with escrow): ${formatCurrency(totalMonthlyPayment)}
Monthly Savings: ${formatCurrency(monthlySavings)}
Break-even Point: ${years > 0 ? `${years} years and ` : ''}${months} months
Interest Savings: ${formatCurrency(interestSavings)}
Lifetime Savings: ${formatCurrency(lifetimeSavings)}
Total Savings: ${formatCurrency(totalSavings)}`
    }
  }
} 