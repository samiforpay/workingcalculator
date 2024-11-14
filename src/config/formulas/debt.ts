import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const debtFormulas: FormulaConfig = {
  'debt-payoff': {
    name: 'Debt Payoff Calculator',
    description: 'Calculate how long it will take to pay off debt and compare different repayment strategies',
    variables: {
      totalDebt: {
        label: 'Total Debt Amount',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'Combined total of all your debts'
      },
      averageInterestRate: {
        label: 'Average Interest Rate',
        type: 'percentage',
        defaultValue: 15,
        min: 0,
        max: 100,
        step: 0.1,
        helpText: 'Weighted average interest rate of all your debts'
      },
      monthlyPayment: {
        label: 'Monthly Payment',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'Amount you can pay towards debt each month'
      },
      extraPayment: {
        label: 'Extra Monthly Payment',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        helpText: 'Additional amount you can pay each month'
      },
      minimumPayment: {
        label: 'Minimum Payment Required',
        type: 'currency',
        defaultValue: 200,
        min: 0,
        helpText: 'Combined minimum payments required on all debts'
      },
      paymentStrategy: {
        label: 'Payment Strategy',
        type: 'number',
        defaultValue: 0, // 0 for avalanche, 1 for snowball
        min: 0,
        max: 1,
        helpText: 'Avalanche (highest interest first) or Snowball (lowest balance first)'
      }
    },
    calculate: (inputs) => {
      const { totalDebt, averageInterestRate, monthlyPayment, extraPayment, minimumPayment } = inputs
      const monthlyRate = averageInterestRate / 100 / 12
      const totalMonthlyPayment = monthlyPayment + extraPayment

      if (totalMonthlyPayment < minimumPayment) {
        throw new Error('Total payment must be at least the minimum payment required')
      }

      let balance = totalDebt
      let months = 0
      let totalInterest = 0
      let totalPaid = 0

      // Calculate with extra payments
      while (balance > 0 && months < 360) { // 30-year maximum
        const interestPayment = balance * monthlyRate
        const principalPayment = Math.min(balance, totalMonthlyPayment - interestPayment)
        
        balance -= principalPayment
        totalInterest += interestPayment
        totalPaid += (principalPayment + interestPayment)
        months++
      }

      // Calculate without extra payments
      let baseBalance = totalDebt
      let baseMonths = 0
      let baseTotalInterest = 0

      while (baseBalance > 0 && baseMonths < 360) {
        const interestPayment = baseBalance * monthlyRate
        const principalPayment = Math.min(baseBalance, monthlyPayment - interestPayment)
        
        baseBalance -= principalPayment
        baseTotalInterest += interestPayment
        baseMonths++
      }

      return {
        months,
        totalInterest,
        totalPaid,
        monthsSaved: baseMonths - months,
        interestSaved: baseTotalInterest - totalInterest,
        monthlyPaymentNeeded: totalMonthlyPayment,
        effectiveInterestRate: (totalInterest / totalDebt) * 100
      }
    },
    formatResult: (result) => {
      const {
        months,
        totalInterest,
        totalPaid,
        monthsSaved,
        interestSaved,
        monthlyPaymentNeeded,
        effectiveInterestRate
      } = result

      const years = Math.floor(months / 12)
      const remainingMonths = months % 12

      return `Time to Debt-Free: ${years} years and ${remainingMonths} months
Total Interest: ${formatCurrency(totalInterest)}
Total Amount Paid: ${formatCurrency(totalPaid)}
Monthly Payment Needed: ${formatCurrency(monthlyPaymentNeeded)}
Effective Interest Rate: ${formatPercentage(effectiveInterestRate)}
${monthsSaved > 0 ? `
Time Saved with Extra Payments: ${Math.floor(monthsSaved / 12)} years and ${monthsSaved % 12} months
Interest Saved: ${formatCurrency(interestSaved)}` : ''}`
    }
  }
} 