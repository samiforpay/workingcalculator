import type { Formula } from '@/config/formulas/types'

interface HomeAffordabilityResult extends Record<string, number> {
  maxHomePrice: number
  downPayment: number
  loanAmount: number
  monthlyPayment: number
  monthlyTaxes: number
  monthlyInsurance: number
  monthlyHOA: number
  totalMonthlyPayment: number
  debtToIncomeRatio: number
  frontEndRatio: number
  backEndRatio: number
}

export const homeAffordabilityCalculator: Formula<HomeAffordabilityResult> = {
  name: 'Home Affordability Calculator',
  description: 'Calculate how much home you can afford based on your income and expenses',
  variables: {
    annualIncome: {
      label: 'Annual Income',
      type: 'currency',
      defaultValue: 100000,
      min: 0,
      step: 1000,
      helpText: 'Your total annual household income before taxes'
    },
    monthlyDebts: {
      label: 'Monthly Debts',
      type: 'currency',
      defaultValue: 500,
      min: 0,
      step: 100,
      helpText: 'Total monthly debt payments (car loans, credit cards, etc.)'
    },
    downPaymentPercent: {
      label: 'Down Payment Percentage',
      type: 'percentage',
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Percentage of home price you plan to put down'
    },
    interestRate: {
      label: 'Mortgage Interest Rate',
      type: 'percentage',
      defaultValue: 6.5,
      min: 0,
      max: 20,
      step: 0.125,
      helpText: 'Annual mortgage interest rate'
    },
    loanTerm: {
      label: 'Loan Term (Years)',
      type: 'number',
      defaultValue: 30,
      min: 10,
      max: 40,
      step: 5,
      helpText: 'Length of mortgage loan in years'
    },
    propertyTaxRate: {
      label: 'Annual Property Tax Rate',
      type: 'percentage',
      defaultValue: 1.2,
      min: 0,
      max: 5,
      step: 0.1,
      helpText: 'Annual property tax rate in your area'
    },
    monthlyHOA: {
      label: 'Monthly HOA Fees',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      step: 50,
      helpText: 'Monthly homeowners association fees'
    }
  },
  calculate: (inputs) => {
    const {
      annualIncome,
      monthlyDebts,
      downPaymentPercent,
      interestRate,
      loanTerm,
      propertyTaxRate,
      monthlyHOA
    } = inputs

    const monthlyIncome = annualIncome / 12
    const monthlyRate = (interestRate / 100) / 12
    const numberOfPayments = loanTerm * 12

    // Maximum 43% back-end DTI ratio (total monthly payments including mortgage / monthly income)
    const maxBackEndRatio = 0.43
    const maxMonthlyPayment = monthlyIncome * maxBackEndRatio - monthlyDebts

    // Calculate max home price using mortgage payment formula
    // P = L[c(1 + c)^n]/[(1 + c)^n - 1]
    // where: P = payment, L = loan amount, c = monthly rate, n = number of payments
    const paymentFactor = (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                         (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    // Account for taxes, insurance, and HOA in monthly payment
    const taxAndInsuranceFactor = (propertyTaxRate / 100) / 12 + 0.0058 // 0.58% annual for insurance
    const maxLoanPayment = maxMonthlyPayment - monthlyHOA

    // Solve for maximum loan amount
    const maxLoanAmount = maxLoanPayment / (paymentFactor + taxAndInsuranceFactor)

    // Calculate maximum home price
    const maxHomePrice = maxLoanAmount / (1 - (downPaymentPercent / 100))
    const downPayment = maxHomePrice * (downPaymentPercent / 100)
    const loanAmount = maxHomePrice - downPayment

    // Calculate monthly payments
    const monthlyPrincipalAndInterest = loanAmount * paymentFactor
    const monthlyTaxes = (maxHomePrice * propertyTaxRate / 100) / 12
    const monthlyInsurance = (maxHomePrice * 0.0058) / 12
    const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyTaxes + monthlyInsurance + monthlyHOA

    // Calculate ratios
    const debtToIncomeRatio = (monthlyDebts / monthlyIncome) * 100
    const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100
    const backEndRatio = ((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100

    return {
      maxHomePrice,
      downPayment,
      loanAmount,
      monthlyPayment: monthlyPrincipalAndInterest,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyPayment,
      debtToIncomeRatio,
      frontEndRatio,
      backEndRatio
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const {
      maxHomePrice,
      downPayment,
      loanAmount,
      monthlyPayment,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyPayment,
      debtToIncomeRatio,
      frontEndRatio,
      backEndRatio
    } = result

    return `
Home Affordability Analysis:
-------------------------
Maximum Home Price: ${formatter.format(maxHomePrice)}
Down Payment: ${formatter.format(downPayment)}
Loan Amount: ${formatter.format(loanAmount)}

Monthly Payments:
--------------
Principal & Interest: ${formatter.format(monthlyPayment)}
Property Taxes: ${formatter.format(monthlyTaxes)}
Insurance: ${formatter.format(monthlyInsurance)}
HOA Fees: ${formatter.format(monthlyHOA)}
Total Payment: ${formatter.format(totalMonthlyPayment)}

Debt Ratios:
----------
Debt-to-Income: ${debtToIncomeRatio.toFixed(1)}%
Front-End: ${frontEndRatio.toFixed(1)}%
Back-End: ${backEndRatio.toFixed(1)}%
    `.trim()
  }
} 