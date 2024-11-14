import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const loanFormulas: FormulaConfig = {
  'loan-amortization': {
    name: 'Loan Amortization Calculator',
    description: 'Calculate loan payments and create a detailed amortization schedule',
    variables: {
      loanAmount: {
        label: 'Loan Amount',
        type: 'currency',
        defaultValue: 100000,
        min: 0,
        helpText: 'Total amount borrowed'
      },
      interestRate: {
        label: 'Annual Interest Rate',
        type: 'percentage',
        defaultValue: 5,
        min: 0,
        max: 50,
        step: 0.125,
        helpText: 'Annual interest rate for the loan'
      },
      loanTerm: {
        label: 'Loan Term (Years)',
        type: 'number',
        defaultValue: 30,
        min: 1,
        max: 50,
        helpText: 'Length of the loan in years'
      },
      extraPayment: {
        label: 'Extra Monthly Payment',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        helpText: 'Additional amount to pay each month'
      },
      paymentFrequency: {
        label: 'Payment Frequency',
        type: 'number',
        defaultValue: 12, // Monthly
        min: 1,
        max: 52,
        helpText: '12 for monthly, 26 for bi-weekly, 52 for weekly'
      }
    },
    calculate: (inputs) => {
      const { loanAmount, interestRate, loanTerm, extraPayment, paymentFrequency } = inputs
      
      // Convert annual rate to periodic rate
      const periodicRate = (interestRate / 100) / paymentFrequency
      const totalPayments = loanTerm * paymentFrequency

      // Calculate base periodic payment
      const basePayment = loanAmount * 
        (periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
        (Math.pow(1 + periodicRate, totalPayments) - 1)

      let balance = loanAmount
      let actualPayments = 0
      let totalInterest = 0
      let totalPrincipal = 0
      const paymentSchedule = []

      // Calculate amortization with extra payments
      while (balance > 0 && actualPayments < totalPayments) {
        const interestPayment = balance * periodicRate
        const totalPayment = basePayment + extraPayment
        const principalPayment = Math.min(balance, totalPayment - interestPayment)

        balance -= principalPayment
        totalInterest += interestPayment
        totalPrincipal += principalPayment
        actualPayments++

        paymentSchedule.push({
          payment: actualPayments,
          principal: principalPayment,
          interest: interestPayment,
          balance: balance,
          totalInterest: totalInterest
        })
      }

      // Calculate savings from extra payments
      const baseInterest = loanAmount * periodicRate * totalPayments - 
        (loanAmount - basePayment * totalPayments)
      const interestSaved = baseInterest - totalInterest
      const paymentsSaved = totalPayments - actualPayments

      return {
        periodicPayment: basePayment,
        totalPayments: actualPayments,
        totalInterest,
        totalPaid: totalPrincipal + totalInterest,
        interestSaved,
        paymentsSaved,
        paymentSchedule: paymentSchedule.slice(0, 12), // Return first year's schedule
        effectiveRate: (totalInterest / loanAmount) * 100
      }
    },
    formatResult: (result) => {
      const {
        periodicPayment,
        totalPayments,
        totalInterest,
        totalPaid,
        interestSaved,
        paymentsSaved,
        effectiveRate
      } = result

      const years = Math.floor(totalPayments / 12)
      const months = totalPayments % 12

      return `Periodic Payment: ${formatCurrency(periodicPayment)}
Total Payments: ${years} years and ${months} months
Total Interest: ${formatCurrency(totalInterest)}
Total Amount Paid: ${formatCurrency(totalPaid)}
Interest Saved: ${formatCurrency(interestSaved)}
Payments Saved: ${Math.floor(paymentsSaved / 12)} years and ${paymentsSaved % 12} months
Effective Interest Rate: ${formatPercentage(effectiveRate)}`
    }
  }
} 