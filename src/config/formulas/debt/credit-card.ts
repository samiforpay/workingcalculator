import type { Formula } from '@/config/formulas/types'

interface CreditCardPayoffResult {
  [key: string]: number
  totalPayment: number
  totalInterest: number
  monthsToPayoff: number
  monthlyPayment: number
  effectiveInterestRate: number
  totalDebt: number
  interestSaved: number
  timeReduction: number
}

export const creditCardPayoffCalculator: Formula<CreditCardPayoffResult> = {
  name: 'Credit Card Payoff Calculator',
  description: '',
  longDescription: `
    <p>Tired of credit card debt? Our Credit Card Payoff Calculator can help! This free credit card payoff timeline calculator shows how long it will take to pay off your balance based on different payment amounts. Discover how to calculate credit card payments and interest easily with the best credit card payoff estimator available online.</p>
    <p>Key insights:</p>
    <ul>
      <li>Time to become debt-free</li>
      <li>Total interest savings</li>
      <li>Impact of extra payments</li>
      <li>Monthly payment requirements</li>
      <li>Debt-free date projection</li>
    </ul>
    <p>Take control of your credit card debt by understanding how different payment strategies can accelerate your path to becoming debt-free.</p>
  `,
  variables: {
    balance: {
      label: 'Current Balance',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Current credit card balance'
    },
    interestRate: {
      label: 'Annual Interest Rate (APR)',
      type: 'percentage',
      defaultValue: 18.9,
      min: 0,
      max: 100,
      step: 0.1,
      helpText: 'Annual Percentage Rate (APR) on your credit card'
    },
    minimumPayment: {
      label: 'Minimum Payment',
      type: 'currency',
      defaultValue: 100,
      min: 0,
      step: 10,
      helpText: 'Minimum required monthly payment'
    },
    additionalPayment: {
      label: 'Additional Monthly Payment',
      type: 'currency',
      defaultValue: 50,
      min: 0,
      step: 10,
      helpText: 'Extra amount you can pay each month'
    },
    newPurchases: {
      label: 'Monthly New Purchases',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      step: 10,
      helpText: 'Expected new charges each month'
    }
  },
  calculate: (inputs) => {
    const {
      balance,
      interestRate,
      minimumPayment,
      additionalPayment,
      newPurchases
    } = inputs

    const monthlyRate = (interestRate / 100) / 12
    const totalMonthlyPayment = minimumPayment + additionalPayment

    // Calculate payoff with minimum payments only
    let balanceMin = balance
    let monthsMinimum = 0
    let totalInterestMin = 0

    while (balanceMin > 0 && monthsMinimum < 600) { // 50-year maximum
      const interestCharge = balanceMin * monthlyRate
      totalInterestMin += interestCharge
      balanceMin = balanceMin + interestCharge + newPurchases - minimumPayment
      monthsMinimum++
    }

    // Calculate payoff with additional payments
    let balanceExtra = balance
    let monthsWithExtra = 0
    let totalInterestExtra = 0

    while (balanceExtra > 0 && monthsWithExtra < 600) {
      const interestCharge = balanceExtra * monthlyRate
      totalInterestExtra += interestCharge
      balanceExtra = balanceExtra + interestCharge + newPurchases - totalMonthlyPayment
      monthsWithExtra++
    }

    // Calculate savings
    const interestSaved = totalInterestMin - totalInterestExtra
    const timeReduction = monthsMinimum - monthsWithExtra

    // Calculate effective interest rate
    const effectiveInterestRate = (totalInterestExtra / balance) * 100

    return {
      totalPayment: balance + totalInterestExtra + (newPurchases * monthsWithExtra),
      totalInterest: totalInterestExtra,
      monthsToPayoff: monthsWithExtra,
      monthlyPayment: totalMonthlyPayment,
      effectiveInterestRate,
      totalDebt: balance,
      interestSaved,
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
      interestSaved,
      timeReduction
    } = result

    const years = Math.floor(monthsToPayoff / 12)
    const months = monthsToPayoff % 12

    return `
Credit Card Payoff Analysis:
-------------------------
Current Debt: ${formatter.format(totalDebt)}
Monthly Payment: ${formatter.format(monthlyPayment)}

Payoff Timeline:
--------------
Time to Payoff: ${years} years and ${months} months
Total Interest: ${formatter.format(totalInterest)}
Total Payment: ${formatter.format(totalPayment)}
Effective Interest Rate: ${effectiveInterestRate.toFixed(2)}%

Savings with Extra Payments:
-------------------------
Interest Saved: ${formatter.format(interestSaved)}
Time Saved: ${Math.floor(timeReduction / 12)} years and ${timeReduction % 12} months
    `.trim()
  }
} 