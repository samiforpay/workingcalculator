import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const taxFormulas: FormulaConfig = {
  'income-tax': {
    name: 'Income Tax Calculator',
    description: 'Calculate your estimated income tax liability',
    variables: {
      annualIncome: {
        label: 'Annual Income',
        type: 'currency',
        defaultValue: 75000,
        min: 0,
        helpText: 'Your total annual income before taxes'
      },
      filingStatus: {
        label: 'Filing Status',
        type: 'number',
        defaultValue: 0, // 0: Single, 1: Married Filing Jointly
        min: 0,
        max: 1,
        helpText: 'Your tax filing status'
      },
      deductions: {
        label: 'Total Deductions',
        type: 'currency',
        defaultValue: 13850, // 2024 standard deduction for single filers
        min: 0,
        helpText: 'Standard deduction or itemized deductions'
      },
      dependents: {
        label: 'Number of Dependents',
        type: 'number',
        defaultValue: 0,
        min: 0,
        helpText: 'Number of qualifying dependents'
      },
      withheld: {
        label: 'Taxes Already Withheld',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        helpText: 'Total taxes withheld from paychecks'
      }
    },
    calculate: (inputs) => {
      const { annualIncome, filingStatus, deductions, dependents, withheld } = inputs

      // 2024 tax brackets
      const brackets = filingStatus === 0 ? [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 11600 },
        { rate: 0.22, threshold: 47150 },
        { rate: 0.24, threshold: 100525 },
        { rate: 0.32, threshold: 191950 },
        { rate: 0.35, threshold: 243725 },
        { rate: 0.37, threshold: 609350 }
      ] : [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 23200 },
        { rate: 0.22, threshold: 94300 },
        { rate: 0.24, threshold: 201050 },
        { rate: 0.32, threshold: 383900 },
        { rate: 0.35, threshold: 487450 },
        { rate: 0.37, threshold: 731200 }
      ]

      // Calculate taxable income
      const dependentCredit = dependents * 2000 // Child Tax Credit
      const taxableIncome = Math.max(0, annualIncome - deductions)
      let totalTax = 0
      let remainingIncome = taxableIncome

      // Calculate tax for each bracket
      for (let i = 0; i < brackets.length; i++) {
        const currentBracket = brackets[i]
        const nextBracket = brackets[i + 1]
        const bracketIncome = nextBracket
          ? Math.min(remainingIncome, nextBracket.threshold - currentBracket.threshold)
          : remainingIncome

        if (bracketIncome > 0) {
          totalTax += bracketIncome * currentBracket.rate
          remainingIncome -= bracketIncome
        }

        if (remainingIncome <= 0) break
      }

      // Apply credits and calculate final amounts
      const taxAfterCredits = Math.max(0, totalTax - dependentCredit)
      const effectiveRate = (taxAfterCredits / annualIncome) * 100
      const remainingDue = taxAfterCredits - withheld
      const marginalRate = brackets.find(b => b.threshold <= taxableIncome)?.rate ?? 0

      return {
        taxableIncome,
        totalTax,
        taxAfterCredits,
        effectiveRate,
        marginalRate: marginalRate * 100,
        remainingDue,
        dependentCredit
      }
    },
    formatResult: (result) => {
      const {
        taxableIncome,
        totalTax,
        taxAfterCredits,
        effectiveRate,
        marginalRate,
        remainingDue,
        dependentCredit
      } = result

      return `Taxable Income: ${formatCurrency(taxableIncome)}
Total Tax: ${formatCurrency(totalTax)}
Dependent Credits: ${formatCurrency(dependentCredit)}
Tax After Credits: ${formatCurrency(taxAfterCredits)}
Effective Tax Rate: ${formatPercentage(effectiveRate)}
Marginal Tax Rate: ${formatPercentage(marginalRate)}
${remainingDue > 0 
  ? `Tax Due: ${formatCurrency(remainingDue)}`
  : `Refund Amount: ${formatCurrency(Math.abs(remainingDue))}`}`
    }
  }
} 