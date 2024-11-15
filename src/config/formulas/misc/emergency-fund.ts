import type { Formula } from '@/config/formulas/types'

interface EmergencyFundResult extends Record<string, number> {
  recommendedFund: number
  currentShortfall: number
  monthsCovered: number
  [key: string]: number
}

const EMERGENCY_FUND_CONFIG = {
  year: 2023,
  defaults: {
    monthlyIncome: 5000,
    monthlyExpenses: 4000,
    currentSavings: 10000,
    monthsNeeded: 6,
    monthlyContribution: 500
  },
  limits: {
    maxMonthlyAmount: 10000000000,
    maxSavings: 100000000000,
    maxMonths: 24
  }
}

export const emergencyFundCalculator: Formula<EmergencyFundResult> = {
  name: 'Emergency Fund Calculator',
  description: '',
  longDescription: `
    <p>The Emergency Fund Calculator helps you determine how much money you should set aside for unexpected expenses and financial emergencies. This tool considers your monthly expenses, income stability, and personal circumstances to recommend an appropriate emergency fund size.</p>
    <p>Factors considered:</p>
    <ul>
      <li>Monthly essential expenses</li>
      <li>Income stability assessment</li>
      <li>Number of income earners</li>
      <li>Insurance coverage levels</li>
      <li>Existing emergency savings</li>
    </ul>
    <p>Having an adequate emergency fund is crucial for financial security and peace of mind. Use this calculator to set appropriate savings goals and track your progress.</p>
  `,
  variables: {
    monthlyIncome: {
      label: 'Monthly Income',
      type: 'currency',
      defaultValue: EMERGENCY_FUND_CONFIG.defaults.monthlyIncome,
      min: 0,
      max: EMERGENCY_FUND_CONFIG.limits.maxMonthlyAmount,
      step: 0.01,
      helpText: 'Your total monthly income after taxes'
    },
    monthlyExpenses: {
      label: 'Monthly Expenses',
      type: 'currency',
      defaultValue: EMERGENCY_FUND_CONFIG.defaults.monthlyExpenses,
      min: 0,
      max: EMERGENCY_FUND_CONFIG.limits.maxMonthlyAmount,
      step: 0.01,
      helpText: 'Your total monthly expenses'
    },
    currentSavings: {
      label: 'Current Emergency Savings',
      type: 'currency',
      defaultValue: EMERGENCY_FUND_CONFIG.defaults.currentSavings,
      min: 0,
      max: EMERGENCY_FUND_CONFIG.limits.maxSavings,
      step: 0.01,
      helpText: 'Amount currently saved for emergencies'
    },
    monthlyContribution: {
      label: 'Monthly Savings Contribution',
      type: 'currency',
      defaultValue: EMERGENCY_FUND_CONFIG.defaults.monthlyContribution,
      min: 0,
      validate: (value: number, inputs: Record<string, number>) => {
        const maxContribution = inputs.monthlyIncome * 0.9;
        if (value > maxContribution) {
          throw new Error(`Monthly contribution cannot exceed ${Math.floor(maxContribution)}. This is 90% of your monthly income.`);
        }
        return value;
      },
      max: EMERGENCY_FUND_CONFIG.limits.maxMonthlyAmount,
      step: 0.01,
      helpText: 'Amount you can save each month (max 90% of monthly income)'
    },
    monthsNeeded: {
      label: 'Months of Expenses',
      type: 'number',
      defaultValue: EMERGENCY_FUND_CONFIG.defaults.monthsNeeded,
      min: 1,
      max: EMERGENCY_FUND_CONFIG.limits.maxMonths,
      step: 1,
      helpText: 'Number of months to cover (typically 3-6 months)'
    }
  },
  calculate: (inputs) => {
    const { monthlyIncome, monthlyExpenses, currentSavings, monthlyContribution, monthsNeeded } = inputs
    
    const maxContribution = monthlyIncome * 0.9;
    if (monthlyContribution > maxContribution) {
      throw new Error(`Monthly contribution cannot exceed ${Math.floor(maxContribution)}. This is 90% of your monthly income.`);
    }

    const recommendedFund = monthlyExpenses * monthsNeeded
    const currentShortfall = Math.max(0, recommendedFund - currentSavings)
    const monthsCovered = currentSavings / monthlyExpenses

    return {
      recommendedFund,
      currentShortfall,
      monthsCovered,
      monthlyExpenses,
      currentSavings,
      monthlyIncome,
      monthlyContribution
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Emergency Fund Analysis:
---------------------
Recommended Fund: ${formatter.format(result.recommendedFund)}
Current Savings: ${formatter.format(result.currentSavings)}
Current Shortfall: ${formatter.format(result.currentShortfall)}

Coverage:
--------
Months Currently Covered: ${result.monthsCovered.toFixed(1)} months

Note: Your emergency fund should cover 3-6 months of expenses.
Consider your job stability and income sources when deciding.
    `.trim()
  }
} 