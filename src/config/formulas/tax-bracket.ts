import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

interface TaxBracketResult {
  adjustedGrossIncome: number
  taxableIncome: number
  totalTax: number
  taxAfterCredits: number
  effectiveRate: number
  marginalRate: number
  bracketBreakdown: Array<{
    rate: number
    amount: number
    income: number
  }>
}

export const taxBracketFormulas: FormulaConfig = {
  'tax-bracket': {
    name: 'Tax Bracket Calculator',
    description: 'Calculate your tax liability and marginal tax rate',
    variables: {
      annualIncome: {
        label: 'Annual Income',
        type: 'currency',
        defaultValue: 75000,
        min: 0,
        helpText: 'Your total annual income before deductions'
      },
      filingStatus: {
        label: 'Filing Status',
        type: 'number',
        defaultValue: 0, // 0 = Single, 1 = Married Filing Jointly
        min: 0,
        max: 1,
        helpText: '0 for Single, 1 for Married Filing Jointly'
      },
      deductions: {
        label: 'Total Deductions',
        type: 'currency',
        defaultValue: 13850, // 2024 standard deduction for single filers
        min: 0,
        helpText: 'Standard deduction or itemized deductions'
      },
      adjustments: {
        label: 'Above-the-line Adjustments',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        helpText: 'IRA contributions, student loan interest, etc.'
      },
      credits: {
        label: 'Tax Credits',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        helpText: 'Child tax credit, education credits, etc.'
      }
    },
    calculate: (inputs): TaxBracketResult => {
      const { annualIncome, filingStatus, deductions, adjustments, credits } = inputs

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

      const adjustedGrossIncome = annualIncome - adjustments
      const taxableIncome = Math.max(0, adjustedGrossIncome - deductions)
      let totalTax = 0
      let marginalRate = 0
      const bracketBreakdown = []

      // Calculate tax for each bracket
      for (let i = 0; i < brackets.length; i++) {
        const currentBracket = brackets[i]
        const nextBracket = brackets[i + 1]
        const bracketIncome = nextBracket
          ? Math.min(taxableIncome, nextBracket.threshold) - currentBracket.threshold
          : taxableIncome - currentBracket.threshold

        if (bracketIncome > 0) {
          const bracketTax = bracketIncome * currentBracket.rate
          totalTax += bracketTax
          marginalRate = currentBracket.rate
          bracketBreakdown.push({
            rate: currentBracket.rate * 100,
            amount: bracketTax,
            income: bracketIncome
          })
        }

        if (!nextBracket || taxableIncome <= nextBracket.threshold) break
      }

      const taxAfterCredits = Math.max(0, totalTax - credits)
      const effectiveRate = taxableIncome > 0 ? (taxAfterCredits / taxableIncome) * 100 : 0

      return {
        adjustedGrossIncome,
        taxableIncome,
        totalTax,
        taxAfterCredits,
        effectiveRate,
        marginalRate: marginalRate * 100,
        bracketBreakdown
      }
    },
    formatResult: (result: TaxBracketResult) => {
      const {
        adjustedGrossIncome,
        taxableIncome,
        totalTax,
        taxAfterCredits,
        effectiveRate,
        marginalRate,
        bracketBreakdown
      } = result

      const bracketDetails = bracketBreakdown
        .map(bracket => 
          `${formatPercentage(bracket.rate)} bracket: ${formatCurrency(bracket.amount)} on ${formatCurrency(bracket.income)}`
        )
        .join('\n')

      return `Adjusted Gross Income: ${formatCurrency(adjustedGrossIncome)}
Taxable Income: ${formatCurrency(taxableIncome)}
Total Tax: ${formatCurrency(totalTax)}
Tax After Credits: ${formatCurrency(taxAfterCredits)}
Effective Tax Rate: ${formatPercentage(effectiveRate)}
Marginal Tax Rate: ${formatPercentage(marginalRate)}

Tax Breakdown:
${bracketDetails}`
    }
  }
} 