import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const homeFormulas: FormulaConfig = {
  'home-affordability': {
    name: 'Home Affordability Calculator',
    description: 'Calculate how much house you can afford based on your income and expenses',
    variables: {
      annualIncome: {
        label: 'Annual Income',
        type: 'currency',
        defaultValue: 75000,
        min: 0,
        helpText: 'Your total annual household income before taxes'
      },
      monthlyDebts: {
        label: 'Monthly Debts',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'Total monthly debt payments (car loans, credit cards, etc.)'
      },
      downPayment: {
        label: 'Down Payment',
        type: 'currency',
        defaultValue: 50000,
        min: 0,
        helpText: 'Amount you can pay upfront'
      },
      interestRate: {
        label: 'Mortgage Rate',
        type: 'percentage',
        defaultValue: 6.5,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Current mortgage interest rate'
      },
      loanTerm: {
        label: 'Loan Term (Years)',
        type: 'number',
        defaultValue: 30,
        min: 15,
        max: 30,
        step: 15,
        helpText: 'Length of mortgage loan'
      },
      propertyTax: {
        label: 'Annual Property Tax Rate',
        type: 'percentage',
        defaultValue: 1.5,
        min: 0,
        max: 5,
        step: 0.1,
        helpText: 'Annual property tax rate in your area'
      },
      homeInsurance: {
        label: 'Annual Insurance Rate',
        type: 'percentage',
        defaultValue: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        helpText: 'Annual homeowners insurance rate'
      }
    },
    calculate: (inputs) => {
      const {
        annualIncome,
        monthlyDebts,
        downPayment,
        interestRate,
        loanTerm,
        propertyTax,
        homeInsurance
      } = inputs

      const monthlyIncome = annualIncome / 12
      const maxMonthlyPayment = monthlyIncome * 0.28 // Front-end ratio
      const maxTotalPayment = monthlyIncome * 0.36 - monthlyDebts // Back-end ratio
      const maxPITI = Math.min(maxMonthlyPayment, maxTotalPayment)

      // Calculate monthly mortgage payment factors
      const monthlyRate = interestRate / 100 / 12
      const numberOfPayments = loanTerm * 12
      const mortgageFactor = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

      // Calculate max home price considering all costs
      const taxAndInsuranceRate = (propertyTax + homeInsurance) / 100 / 12
      const maxLoanPayment = maxPITI / (1 + taxAndInsuranceRate)
      const maxLoanAmount = maxLoanPayment / mortgageFactor
      const maxHomePrice = maxLoanAmount + downPayment

      // Calculate monthly costs for max home price
      const loanAmount = maxHomePrice - downPayment
      const monthlyMortgage = loanAmount * mortgageFactor
      const monthlyTaxAndInsurance = maxHomePrice * taxAndInsuranceRate
      const totalMonthlyPayment = monthlyMortgage + monthlyTaxAndInsurance + monthlyDebts

      return {
        maxHomePrice,
        downPayment,
        loanAmount,
        monthlyMortgage,
        monthlyTaxAndInsurance,
        totalMonthlyPayment,
        debtToIncomeRatio: (totalMonthlyPayment / monthlyIncome) * 100
      }
    },
    formatResult: (result) => {
      const {
        maxHomePrice,
        downPayment,
        loanAmount,
        monthlyMortgage,
        monthlyTaxAndInsurance,
        totalMonthlyPayment,
        debtToIncomeRatio
      } = result

      return `Maximum Home Price: ${formatCurrency(maxHomePrice)}
Down Payment: ${formatCurrency(downPayment)}
Loan Amount: ${formatCurrency(loanAmount)}
Monthly Mortgage Payment: ${formatCurrency(monthlyMortgage)}
Monthly Tax & Insurance: ${formatCurrency(monthlyTaxAndInsurance)}
Total Monthly Payment: ${formatCurrency(totalMonthlyPayment)}
Debt-to-Income Ratio: ${formatPercentage(debtToIncomeRatio)}`
    }
  }
} 