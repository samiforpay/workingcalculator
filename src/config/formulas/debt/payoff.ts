import type { Formula } from '@/config/formulas/types'

interface DebtPayoffResult {
  [key: string]: number
  totalPayment: number
  totalInterest: number
  monthsToPayoff: number
  monthlyPayment: number
  effectiveInterestRate: number
  totalDebt: number
  savingsFromExtra: number
  timeReduction: number
}

export const debtPayoffCalculator: Formula<DebtPayoffResult> = {
  name: 'Debt Payoff Calculator',
  description: 'Calculate how quickly you can pay off your debt and how much you can save',
  variables: {
    debtAmount: {
      label: 'Total Debt Amount',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 100,
      helpText: 'Total amount of debt to be paid off'
    },
    interestRate: {
      label: 'Annual Interest Rate',
      type: 'percentage',
      defaultValue: 15,
      min: 0,
      max: 100,
      step: 0.1,
      helpText: 'Annual interest rate on your debt'
    },
    minimumPayment: {
      label: 'Minimum Monthly Payment',
      type: 'currency',
      defaultValue: 200,
      min: 0,
      step: 10,
      helpText: 'Minimum required monthly payment'
    },
    extraPayment: {
      label: 'Extra Monthly Payment',
      type: 'currency',
      defaultValue: 100,
      min: 0,
      step: 10,
      helpText: 'Additional amount you can pay each month'
    },
    paymentFrequency: {
      label: 'Payment Frequency',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 52,
      step: 1,
      helpText: 'Number of payments per year (12 for monthly, 26 for bi-weekly, 52 for weekly)'
    }
  },
  calculate: (inputs) => {
    const {
      debtAmount,
      interestRate,
      minimumPayment,
      extraPayment,
      paymentFrequency
    } = inputs

    const monthlyRate = (interestRate / 100) / 12
    const totalMonthlyPayment = minimumPayment + extraPayment

    // Calculate payoff with minimum payments
    let balance = debtAmount
    let monthsMinimum = 0
    let totalInterestMinimum = 0

    while (balance > 0 && monthsMinimum < 360) { // 30-year maximum
      const interestCharge = balance * monthlyRate
      totalInterestMinimum += interestCharge
      balance = balance + interestCharge - minimumPayment
      monthsMinimum++
    }

    // Calculate payoff with extra payments
    balance = debtAmount
    let monthsWithExtra = 0
    let totalInterestWithExtra = 0

    while (balance > 0 && monthsWithExtra < 360) {
      const interestCharge = balance * monthlyRate
      totalInterestWithExtra += interestCharge
      balance = balance + interestCharge - totalMonthlyPayment
      monthsWithExtra++
    }

    // Calculate savings and time reduction
    const savingsFromExtra = totalInterestMinimum - totalInterestWithExtra
    const timeReduction = monthsMinimum - monthsWithExtra

    // Calculate effective interest rate
    const effectiveInterestRate = (totalInterestWithExtra / debtAmount) * 100

    return {
      totalPayment: debtAmount + totalInterestWithExtra,
      totalInterest: totalInterestWithExtra,
      monthsToPayoff: monthsWithExtra,
      monthlyPayment: totalMonthlyPayment,
      effectiveInterestRate,
      totalDebt: debtAmount,
      savingsFromExtra,
      timeReduction
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const {
      totalPayment,
      totalInterest,
      monthsToPayoff,
      monthlyPayment,
      effectiveInterestRate,
      totalDebt,
      savingsFromExtra,
      timeReduction
    } = result

    const years = Math.floor(monthsToPayoff / 12)
    const months = monthsToPayoff % 12

    return `
Debt Payoff Analysis:
-------------------
Total Debt: ${formatter.format(totalDebt)}
Monthly Payment: ${formatter.format(monthlyPayment)}

Payoff Timeline:
--------------
Time to Payoff: ${years} years and ${months} months
Total Interest: ${formatter.format(totalInterest)}
Total Payment: ${formatter.format(totalPayment)}
Effective Interest Rate: ${effectiveInterestRate.toFixed(2)}%

Savings from Extra Payments:
-------------------------
Interest Savings: ${formatter.format(savingsFromExtra)}
Time Saved: ${Math.floor(timeReduction / 12)} years and ${timeReduction % 12} months
    `.trim()
  }
} 