import type { Formula } from '@/config/formulas/types'

interface WealthManagementResult extends Record<string, number> {
  totalIncome: number
  totalInvestments: number
  totalSavings: number
  totalExpenses: number
  netWorth: number
  monthlyInvestmentCapacity: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const WEALTH_MANAGEMENT_CONFIG = {
  year: 2023,
  defaults: {
    salary: 75000,
    bonuses: 10000,
    rentalIncome: 0,
    stockInvestments: 50000,
    bonds: 20000,
    retirementAccounts: 100000,
    savingsAccounts: 25000,
    emergencyFund: 15000,
    monthlyExpenses: 4000,
    annualExpenses: 48000
  },
  limits: {
    maxAmount: 100000000000, // 100 billion
    minAmount: 0
  },
  recommendedRatios: {
    emergencyFund: 6, // 6 months of expenses
    investmentAllocation: 0.30, // 30% of income
    savingsRate: 0.20 // 20% of income
  }
}

export const wealthManagementCalculator: Formula<WealthManagementResult> = {
  name: 'Wealth Management Calculator',
  description: 'Track and optimize your wealth across different assets and income sources',
  variables: {
    // Income Sources
    salary: {
      label: 'Annual Salary',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.salary,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Your annual salary before taxes'
    },
    bonuses: {
      label: 'Annual Bonuses',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.bonuses,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Expected annual bonuses and commissions'
    },
    rentalIncome: {
      label: 'Rental Income',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.rentalIncome,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Annual income from rental properties'
    },
    otherIncome: {
      label: 'Other Income',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Additional income sources'
    },
    // Investment Accounts
    stockInvestments: {
      label: 'Stock Investments',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.stockInvestments,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Value of stock portfolio'
    },
    bonds: {
      label: 'Bonds',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.bonds,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Value of bond investments'
    },
    retirementAccounts: {
      label: 'Retirement Accounts',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.retirementAccounts,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Total value of retirement accounts (401k, IRA, etc.)'
    },
    // Savings Accounts
    savingsAccounts: {
      label: 'Savings Accounts',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.savingsAccounts,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Total in savings accounts'
    },
    emergencyFund: {
      label: 'Emergency Fund',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.emergencyFund,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Emergency fund balance'
    },
    // Expenses
    monthlyExpenses: {
      label: 'Monthly Expenses',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.monthlyExpenses,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Average monthly expenses'
    },
    annualExpenses: {
      label: 'Annual Fixed Expenses',
      type: 'currency',
      defaultValue: WEALTH_MANAGEMENT_CONFIG.defaults.annualExpenses,
      min: 0,
      max: WEALTH_MANAGEMENT_CONFIG.limits.maxAmount,
      helpText: 'Annual fixed expenses (insurance, taxes, etc.)'
    }
  },
  calculate: (inputs) => {
    const {
      salary,
      bonuses,
      rentalIncome,
      otherIncome,
      stockInvestments,
      bonds,
      retirementAccounts,
      savingsAccounts,
      emergencyFund,
      monthlyExpenses,
      annualExpenses
    } = inputs

    // Calculate total income
    const totalIncome = salary + bonuses + rentalIncome + otherIncome

    // Calculate total investments
    const totalInvestments = stockInvestments + bonds + retirementAccounts

    // Calculate total savings
    const totalSavings = savingsAccounts + emergencyFund

    // Calculate total expenses
    const totalExpenses = (monthlyExpenses * 12) + annualExpenses

    // Calculate net worth
    const netWorth = totalInvestments + totalSavings

    // Calculate monthly investment capacity
    const monthlyInvestmentCapacity = (totalIncome - totalExpenses) / 12

    // Calculate recommended emergency fund
    const recommendedEmergencyFund = monthlyExpenses * 
                                   WEALTH_MANAGEMENT_CONFIG.recommendedRatios.emergencyFund

    // Calculate recommended investment allocation
    const recommendedInvestment = totalIncome * 
                                WEALTH_MANAGEMENT_CONFIG.recommendedRatios.investmentAllocation

    return {
      totalIncome,
      totalInvestments,
      totalSavings,
      totalExpenses,
      netWorth,
      monthlyInvestmentCapacity,
      recommendedEmergencyFund,
      recommendedInvestment,
      emergencyFundDeficit: recommendedEmergencyFund - emergencyFund,
      investmentDeficit: recommendedInvestment - totalInvestments
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Wealth Management Analysis:
------------------------
Net Worth: ${formatter.format(result.netWorth)}

Income & Expenses:
---------------
Total Annual Income: ${formatter.format(result.totalIncome)}
Total Annual Expenses: ${formatter.format(result.totalExpenses)}
Monthly Investment Capacity: ${formatter.format(result.monthlyInvestmentCapacity)}

Asset Allocation:
--------------
Total Investments: ${formatter.format(result.totalInvestments)}
Total Savings: ${formatter.format(result.totalSavings)}

Recommendations:
-------------
Recommended Emergency Fund: ${formatter.format(result.recommendedEmergencyFund)}
Emergency Fund Deficit: ${formatter.format(result.emergencyFundDeficit)}
Recommended Investment Allocation: ${formatter.format(result.recommendedInvestment)}
Investment Deficit: ${formatter.format(result.investmentDeficit)}

Note: These are general recommendations.
Consider consulting with a financial advisor for personalized advice.
    `.trim()
  }
} 