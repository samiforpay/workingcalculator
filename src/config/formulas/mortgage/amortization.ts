import type { Formula } from '@/config/formulas/types'

interface AmortizationResult extends Record<string, number | AmortizationSchedule[]> {
  monthlyPayment: number
  totalPayments: number
  totalInterest: number
  schedule: AmortizationSchedule[]
  [key: string]: number | AmortizationSchedule[]
}

interface AmortizationSchedule {
  paymentNumber: number
  payment: number
  principal: number
  interest: number
  remainingBalance: number
}

// Make rates and limits configurable for easy updates
const AMORTIZATION_CONFIG = {
  year: 2023,
  defaults: {
    loanAmount: 300000,
    interestRate: 6.5,
    loanTerm: 30,
    extraPayment: 0
  },
  limits: {
    maxLoan: 100000000, // 100 million
    maxRate: 25,        // 25% interest rate
    maxTerm: 40,        // 40 years
    maxExtra: 10000     // $10k max extra monthly payment
  }
}

export const amortizationCalculator: Formula<AmortizationResult> = {
  name: 'Mortgage Amortization Calculator',
  description: 'Calculate your mortgage payment schedule and see how extra payments affect your loan',
  variables: {
    loanAmount: {
      label: 'Loan Amount',
      type: 'currency',
      defaultValue: AMORTIZATION_CONFIG.defaults.loanAmount,
      min: 1000,
      max: AMORTIZATION_CONFIG.limits.maxLoan,
      helpText: 'Total amount borrowed'
    },
    interestRate: {
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      defaultValue: AMORTIZATION_CONFIG.defaults.interestRate,
      min: 0.1,
      max: AMORTIZATION_CONFIG.limits.maxRate,
      helpText: 'Annual interest rate for the loan'
    },
    loanTerm: {
      label: 'Loan Term (Years)',
      type: 'number',
      defaultValue: AMORTIZATION_CONFIG.defaults.loanTerm,
      min: 1,
      max: AMORTIZATION_CONFIG.limits.maxTerm,
      step: 1,
      helpText: 'Length of the loan in years'
    },
    extraPayment: {
      label: 'Extra Monthly Payment',
      type: 'currency',
      defaultValue: AMORTIZATION_CONFIG.defaults.extraPayment,
      min: 0,
      max: AMORTIZATION_CONFIG.limits.maxExtra,
      helpText: 'Additional amount to pay each month'
    }
  },
  calculate: (inputs) => {
    const { loanAmount, interestRate, loanTerm, extraPayment } = inputs

    // Calculate monthly rate and number of payments
    const monthlyRate = (interestRate / 100) / 12
    const totalPayments = loanTerm * 12

    // Calculate base monthly payment using amortization formula
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1)

    // Generate amortization schedule
    let remainingBalance = loanAmount
    let totalInterest = 0
    const schedule: AmortizationSchedule[] = []

    for (let i = 1; remainingBalance > 0 && i <= totalPayments; i++) {
      // Calculate interest and principal portions
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = Math.min(
        monthlyPayment + extraPayment - interestPayment,
        remainingBalance
      )
      const totalPayment = principalPayment + interestPayment

      // Update running totals
      totalInterest += interestPayment
      remainingBalance -= principalPayment

      // Add payment to schedule
      schedule.push({
        paymentNumber: i,
        payment: totalPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: remainingBalance
      })

      // Break if loan is paid off early due to extra payments
      if (remainingBalance <= 0) break
    }

    return {
      monthlyPayment,
      totalPayments: schedule.length,
      totalInterest,
      schedule,
      loanAmount,
      actualTerm: schedule.length / 12,
      totalPaid: loanAmount + totalInterest
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    // Format first few payments for display
    const scheduleDisplay = (result.schedule as AmortizationSchedule[])
      .slice(0, 12)
      .map(payment => `
Payment ${payment.paymentNumber}:
  Total Payment: ${formatter.format(payment.payment)}
  Principal: ${formatter.format(payment.principal)}
  Interest: ${formatter.format(payment.interest)}
  Remaining Balance: ${formatter.format(payment.remainingBalance)}
      `).join('\n')

    return `
Mortgage Amortization Summary:
--------------------------
Monthly Payment: ${formatter.format(result.monthlyPayment)}
Loan Amount: ${formatter.format(result.loanAmount)}
Total Interest: ${formatter.format(result.totalInterest)}
Total Amount Paid: ${formatter.format(result.totalPaid)}

Loan Details:
----------
Number of Payments: ${result.totalPayments}
Actual Loan Term: ${result.actualTerm.toFixed(1)} years

First Year Payment Schedule:
------------------------
${scheduleDisplay}

Note: Extra payments can significantly reduce the loan term
and total interest paid. Consider making additional payments
when possible.
    `.trim()
  }
} 