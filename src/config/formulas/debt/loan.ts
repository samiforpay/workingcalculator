import type { Formula } from '@/config/formulas/types'

interface LoanResult extends Record<string, number> {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  effectiveRate: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const LOAN_CONFIG = {
  year: 2023,
  defaults: {
    amount: 10000,
    rate: 6.5,
    term: 3
  },
  limits: {
    maxAmount: 100000000000,
    maxRate: 30,
    maxTerm: 30
  }
}

export const loanCalculator: Formula<LoanResult> = {
  name: 'Loan Calculator',
  description: '',
  longDescription: `
    <p>Need help managing loans? Our Loan Calculator is here for you! This personal loan monthly payment calculator offers a clear view of what you'll owe each month based on loan terms and interest rates. Learn how to calculate loan payments and interest rates accurately using this loan repayment schedule calculator tool.</p>
    <p>Calculator features:</p>
    <ul>
      <li>Monthly payment calculation</li>
      <li>Total interest cost analysis</li>
      <li>Amortization schedule generation</li>
      <li>Early payoff scenarios</li>
      <li>Payment breakdown visualization</li>
    </ul>
    <p>Understanding your loan terms and costs helps you make informed borrowing decisions and plan your budget effectively.</p>
  `,
  variables: {
    loanAmount: {
      label: 'Loan Amount',
      type: 'currency',
      defaultValue: LOAN_CONFIG.defaults.amount,
      min: 100,
      max: LOAN_CONFIG.limits.maxAmount,
      step: 100,
      helpText: 'Total amount you want to borrow'
    },
    annualRate: {
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      defaultValue: LOAN_CONFIG.defaults.rate,
      min: 0.1,
      max: LOAN_CONFIG.limits.maxRate,
      step: 0.1,
      helpText: 'Annual interest rate for the loan'
    },
    loanTerm: {
      label: 'Loan Term (Years)',
      type: 'number',
      defaultValue: LOAN_CONFIG.defaults.term,
      min: 0.5,
      max: LOAN_CONFIG.limits.maxTerm,
      step: 0.5,
      helpText: 'Length of the loan in years'
    },
    startDate: {
      label: 'Start Date',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 12,
      step: 1,
      helpText: 'Month when payments will begin (1-12)'
    }
  },
  calculate: (inputs) => {
    const { loanAmount, annualRate, loanTerm, startDate } = inputs
    
    // Validate inputs
    if (annualRate <= 0) {
      throw new Error('Interest rate must be greater than 0')
    }
    if (loanTerm <= 0) {
      throw new Error('Loan term must be greater than 0')
    }
    
    // Calculate monthly rate and number of payments
    const monthlyRate = (annualRate / 100) / 12
    const totalPayments = Math.floor(loanTerm * 12)

    // Calculate monthly payment using the formula
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1)

    // Calculate total payment and interest
    const totalPayment = monthlyPayment * totalPayments
    const totalInterest = totalPayment - loanAmount

    // Calculate effective annual rate
    const effectiveRate = (Math.pow(1 + monthlyRate, 12) - 1) * 100

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveRate,
      totalPayments,
      startDate,
      loanAmount
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return `
Loan Payment Analysis (${LOAN_CONFIG.year}):
----------------------------------------
Monthly Payment: ${formatter.format(result.monthlyPayment)}

Total Cost Breakdown:
------------------
Principal Amount: ${formatter.format(result.loanAmount)}
Total Interest: ${formatter.format(result.totalInterest)}
Total Cost: ${formatter.format(result.totalPayment)}

Payment Schedule:
--------------
Number of Payments: ${result.totalPayments}
First Payment Due: Month ${result.startDate}
Effective Annual Rate: ${result.effectiveRate.toFixed(2)}%

Note: Calculations assume fixed interest rate and regular payments.
Additional payments or changes in rate will affect final amounts.
    `.trim()
  }
} 