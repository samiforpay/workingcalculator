import type { Formula } from '@/config/formulas/types'

interface MortgageResult extends Record<string, number> {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  loanAmount: number
  downPaymentAmount: number
  principalPaid: number
  interestRate: number
  loanTerm: number
}

export const mortgageCalculator: Formula<MortgageResult> = {
  name: 'Mortgage Calculator',
  description: 'Calculate your monthly mortgage payments and total costs',
  variables: {
    homePrice: {
      label: 'Home Price',
      type: 'currency',
      defaultValue: 300000,
      min: 0,
      step: 1000,
      helpText: 'Total purchase price of the home'
    },
    downPaymentPercent: {
      label: 'Down Payment (%)',
      type: 'percentage',
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 0.1,
      helpText: 'Percentage of home price as down payment'
    },
    interestRate: {
      label: 'Annual Interest Rate',
      type: 'percentage',
      defaultValue: 6.5,
      min: 0,
      max: 30,
      step: 0.1,
      helpText: 'Annual interest rate for the mortgage'
    },
    loanTerm: {
      label: 'Loan Term (Years)',
      type: 'number',
      defaultValue: 30,
      min: 1,
      max: 50,
      step: 1,
      helpText: 'Length of the mortgage in years'
    },
    propertyTax: {
      label: 'Annual Property Tax',
      type: 'percentage',
      defaultValue: 1.2,
      min: 0,
      max: 10,
      step: 0.1,
      helpText: 'Annual property tax rate'
    },
    homeInsurance: {
      label: 'Annual Home Insurance',
      type: 'currency',
      defaultValue: 1200,
      min: 0,
      step: 100,
      helpText: 'Annual home insurance premium'
    }
  },
  calculate: (inputs) => {
    const {
      homePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      propertyTax,
      homeInsurance
    } = inputs

    // Calculate loan details
    const downPaymentAmount = (homePrice * downPaymentPercent) / 100
    const loanAmount = homePrice - downPaymentAmount
    const monthlyRate = (interestRate / 100) / 12
    const numberOfPayments = loanTerm * 12

    // Calculate monthly mortgage payment (P&I)
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    // Calculate additional costs
    const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12
    const monthlyInsurance = homeInsurance / 12

    // Calculate total monthly payment including escrow
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance

    // Calculate total amounts
    const totalPayment = totalMonthlyPayment * numberOfPayments
    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount
    const principalPaid = loanAmount

    return {
      monthlyPayment: totalMonthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount,
      downPaymentAmount,
      principalPaid,
      interestRate,
      loanTerm
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const {
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount,
      downPaymentAmount,
      principalPaid,
      interestRate,
      loanTerm
    } = result

    return `
Mortgage Payment Analysis:
-----------------------
Monthly Payment: ${formatter.format(monthlyPayment)}
Loan Amount: ${formatter.format(loanAmount)}
Down Payment: ${formatter.format(downPaymentAmount)}

Loan Details:
-----------
Interest Rate: ${interestRate.toFixed(2)}%
Loan Term: ${loanTerm} years

Total Costs:
----------
Total of Payments: ${formatter.format(totalPayment)}
Total Interest: ${formatter.format(totalInterest)}
Principal Paid: ${formatter.format(principalPaid)}
    `.trim()
  }
} 