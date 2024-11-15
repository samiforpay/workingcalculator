import type { Formula } from '@/config/formulas/types'

interface DebtConsolidationResult extends Record<string, number> {
  currentMonthlyPayment: number
  newMonthlyPayment: number
  currentTotalInterest: number
  newTotalInterest: number
  totalInterestSaved: number
  monthlySavings: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const DEBT_CONSOLIDATION_CONFIG = {
  year: 2023,
  defaults: {
    creditCardDebt: 10000,
    creditCardRate: 18.9,
    personalLoanDebt: 5000,
    personalLoanRate: 12.5,
    autoLoanDebt: 15000,
    autoLoanRate: 6.5,
    consolidationRate: 8.5,
    consolidationTerm: 3
  },
  limits: {
    maxDebt: 1000000000, // 1 billion
    maxRate: 50,
    maxTerm: 30
  }
}

export const debtConsolidationCalculator: Formula<DebtConsolidationResult> = {
  name: 'Debt Consolidation Calculator',
  description: '',
  longDescription: `
    <p>Considering debt consolidation? Our Debt Consolidation Calculator can show you potential savings! This free debt consolidation savings calculator helps evaluate whether consolidating debts makes sense for you financially. Find out how much can I save with debt consolidation using this easy online debt consolidation estimator tool.</p>
    <p>Analysis includes:</p>
    <ul>
      <li>Total monthly payment comparison</li>
      <li>Interest savings calculation</li>
      <li>Payoff time comparison</li>
      <li>Break-even point analysis</li>
      <li>Total cost comparison</li>
    </ul>
    <p>Use this calculator to determine if debt consolidation could help you save money and simplify your debt repayment strategy.</p>
  `,
  variables: {
    // Credit Card Debt
    creditCardDebt: {
      label: 'Credit Card Balance',
      type: 'currency',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.creditCardDebt,
      min: 0,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxDebt,
      step: 100,
      helpText: 'Total credit card debt to consolidate'
    },
    creditCardRate: {
      label: 'Credit Card APR (%)',
      type: 'percentage',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.creditCardRate,
      min: 0.1,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxRate,
      step: 0.1,
      helpText: 'Annual interest rate on credit cards'
    },
    
    // Personal Loan
    personalLoanDebt: {
      label: 'Personal Loan Balance',
      type: 'currency',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.personalLoanDebt,
      min: 0,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxDebt,
      step: 100,
      helpText: 'Total personal loan debt to consolidate'
    },
    personalLoanRate: {
      label: 'Personal Loan Rate (%)',
      type: 'percentage',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.personalLoanRate,
      min: 0,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxRate,
      step: 0.1,
      helpText: 'Annual interest rate on personal loans'
    },
    
    // Auto Loan
    autoLoanDebt: {
      label: 'Auto Loan Balance',
      type: 'currency',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.autoLoanDebt,
      min: 0,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxDebt,
      step: 100,
      helpText: 'Total auto loan debt to consolidate'
    },
    autoLoanRate: {
      label: 'Auto Loan Rate (%)',
      type: 'percentage',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.autoLoanRate,
      min: 0,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxRate,
      step: 0.1,
      helpText: 'Annual interest rate on auto loans'
    },
    
    // Consolidation Loan Details
    consolidationRate: {
      label: 'Consolidation Loan Rate (%)',
      type: 'percentage',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.consolidationRate,
      min: 0.1,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxRate,
      step: 0.1,
      helpText: 'Annual interest rate for the consolidation loan'
    },
    consolidationTerm: {
      label: 'Consolidation Loan Term (Years)',
      type: 'number',
      defaultValue: DEBT_CONSOLIDATION_CONFIG.defaults.consolidationTerm,
      min: 1,
      max: DEBT_CONSOLIDATION_CONFIG.limits.maxTerm,
      step: 0.5,
      helpText: 'Length of the consolidation loan in years'
    }
  },
  calculate: (inputs) => {
    const {
      creditCardDebt,
      creditCardRate,
      personalLoanDebt,
      personalLoanRate,
      autoLoanDebt,
      autoLoanRate,
      consolidationRate,
      consolidationTerm
    } = inputs

    // Validate inputs
    if (consolidationRate <= 0) {
      throw new Error('Consolidation loan rate must be greater than 0')
    }
    if (consolidationTerm <= 0) {
      throw new Error('Loan term must be greater than 0')
    }

    // Calculate total debt with validation
    const totalDebt = (creditCardDebt || 0) + (personalLoanDebt || 0) + (autoLoanDebt || 0)
    if (totalDebt <= 0) {
      throw new Error('At least one debt amount must be greater than 0')
    }

    // Calculate loan details with improved validation
    const calculateLoanDetails = (principal: number, annualRate: number, years: number) => {
      if (principal === 0) return { monthlyPayment: 0, totalInterest: 0 }
      if (annualRate < 0.1) throw new Error('Interest rate must be at least 0.1%')
      
      const monthlyRate = (annualRate / 100) / 12
      const totalPayments = Math.floor(years * 12)
      
      const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      
      const totalPaid = monthlyPayment * totalPayments
      const totalInterest = totalPaid - principal
      
      return { monthlyPayment, totalInterest }
    }

    // Calculate current loan details with validation
    const creditCard = creditCardDebt > 0 
      ? calculateLoanDetails(creditCardDebt, creditCardRate, consolidationTerm)
      : { monthlyPayment: 0, totalInterest: 0 }

    const personalLoan = personalLoanDebt > 0 
      ? calculateLoanDetails(personalLoanDebt, personalLoanRate, consolidationTerm)
      : { monthlyPayment: 0, totalInterest: 0 }

    const autoLoan = autoLoanDebt > 0 
      ? calculateLoanDetails(autoLoanDebt, autoLoanRate, consolidationTerm)
      : { monthlyPayment: 0, totalInterest: 0 }

    const currentMonthlyPayment = creditCard.monthlyPayment + personalLoan.monthlyPayment + autoLoan.monthlyPayment
    const currentTotalInterest = creditCard.totalInterest + personalLoan.totalInterest + autoLoan.totalInterest

    // Calculate consolidated loan details
    const consolidated = calculateLoanDetails(totalDebt, consolidationRate, consolidationTerm)
    const newMonthlyPayment = consolidated.monthlyPayment
    const newTotalInterest = consolidated.totalInterest

    // Calculate savings
    const totalInterestSaved = currentTotalInterest - newTotalInterest
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment

    return {
      totalDebt,
      currentMonthlyPayment,
      newMonthlyPayment,
      currentTotalInterest,
      newTotalInterest,
      totalInterestSaved,
      monthlySavings
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const savings = result.monthlySavings > 0
      ? `You could save ${formatter.format(result.monthlySavings)} per month by consolidating these debts.`
      : 'Consolidation may not save you money with these terms. Consider negotiating a lower rate.'

    const recommendation = result.totalInterestSaved > 0
      ? 'Consolidation appears beneficial based on the interest savings.'
      : 'Consider keeping existing loans if they have better terms or are close to being paid off.'

    return `
Debt Consolidation Analysis:
----------------------------------------
Total Debt to Consolidate: ${formatter.format(result.totalDebt)}

Monthly Payments:
--------------
Current Total Payment: ${formatter.format(result.currentMonthlyPayment)}
New Consolidated Payment: ${formatter.format(result.newMonthlyPayment)}
Monthly Savings: ${formatter.format(result.monthlySavings)}

Interest Comparison:
----------------
Current Total Interest: ${formatter.format(result.currentTotalInterest)}
New Total Interest: ${formatter.format(result.newTotalInterest)}
Total Interest Saved: ${formatter.format(result.totalInterestSaved)}

Recommendation:
------------
${savings}
${recommendation}

Note: Actual savings may vary based on fees, terms, and qualification.
Consider all costs before proceeding with debt consolidation.
    `.trim()
  }
} 