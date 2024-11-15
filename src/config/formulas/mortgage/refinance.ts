import type { Formula } from '@/config/formulas/types'

interface RefinanceResult extends Record<string, number> {
  newMonthlyPayment: number
  oldMonthlyPayment: number
  monthlySavings: number
  totalSavings: number
  breakEvenMonths: number
  [key: string]: number
}

export const refinanceCalculator: Formula<RefinanceResult> = {
  name: 'Mortgage Refinance Calculator',
  description: '',
  longDescription: `
    <p>Discover potential savings with our Refinance Calculator. This easy refinance calculator helps you evaluate how much you can save by refinancing your existing mortgage. Input your current loan details and new interest rate to see a breakdown of your refinance mortgage payment options. Our refinance cost estimator also provides insights into associated costs, making it easier for you to decide if refinancing is the right choice</p>
    <p>Use this calculator to:</p>
    <ul>
      <li>Compare your current mortgage payment with potential new payments</li>
      <li>Calculate potential monthly savings from refinancing</li>
      <li>Determine your break-even point considering closing costs</li>
      <li>Evaluate total interest savings over the life of the loan</li>
    </ul>
  `,
  variables: {
    currentBalance: {
      label: 'Current Loan Balance',
      type: 'currency',
      defaultValue: 250000,
      min: 0,
      step: 1000,
      helpText: 'Remaining balance on your current mortgage'
    },
    currentRate: {
      label: 'Current Interest Rate',
      type: 'percentage',
      defaultValue: 5.5,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: 'Your current mortgage interest rate'
    },
    newRate: {
      label: 'New Interest Rate',
      type: 'percentage',
      defaultValue: 4.0,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: 'Interest rate for the new loan'
    },
    remainingYears: {
      label: 'Remaining Years',
      type: 'number',
      defaultValue: 25,
      min: 1,
      max: 50,
      step: 1,
      helpText: 'Years remaining on your current mortgage'
    },
    closingCosts: {
      label: 'Closing Costs',
      type: 'currency',
      defaultValue: 3000,
      min: 0,
      step: 100,
      helpText: 'Total costs to refinance the loan'
    }
  },
  calculate: (inputs) => {
    const { currentBalance, currentRate, newRate, remainingYears, closingCosts } = inputs
    const monthlyPayments = remainingYears * 12
    const currentMonthlyRate = currentRate / 100 / 12
    const newMonthlyRate = newRate / 100 / 12

    // Calculate current monthly payment
    const oldMonthlyPayment = currentBalance * 
      (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, monthlyPayments)) / 
      (Math.pow(1 + currentMonthlyRate, monthlyPayments) - 1)

    // Calculate new monthly payment
    const newMonthlyPayment = currentBalance * 
      (newMonthlyRate * Math.pow(1 + newMonthlyRate, monthlyPayments)) / 
      (Math.pow(1 + newMonthlyRate, monthlyPayments) - 1)

    const monthlySavings = oldMonthlyPayment - newMonthlyPayment
    const totalSavings = (monthlySavings * monthlyPayments) - closingCosts
    const breakEvenMonths = Math.ceil(closingCosts / monthlySavings)

    return {
      newMonthlyPayment,
      oldMonthlyPayment,
      monthlySavings,
      totalSavings,
      breakEvenMonths
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Refinance Analysis:
----------------
Current Payment: ${formatter.format(result.oldMonthlyPayment)}
New Payment: ${formatter.format(result.newMonthlyPayment)}
Monthly Savings: ${formatter.format(result.monthlySavings)}

Long-term Impact:
--------------
Total Savings: ${formatter.format(result.totalSavings)}
Break-even Period: ${result.breakEvenMonths} months
    `.trim()
  }
} 