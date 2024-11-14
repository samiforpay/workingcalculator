import type { Formula } from '@/config/formulas/types'

interface NetWorthResult extends Record<string, number> {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  debtToAssetRatio: number
  liquidAssets: number
  illiquidAssets: number
  shortTermLiabilities: number
  longTermLiabilities: number
}

export const netWorthCalculator: Formula<NetWorthResult> = {
  name: 'Net Worth Calculator',
  description: 'Calculate and track your total net worth',
  variables: {
    // Assets
    cashAndSavings: {
      label: 'Cash and Savings',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      step: 100,
      helpText: 'Total amount in cash, checking, and savings accounts'
    },
    investments: {
      label: 'Investments',
      type: 'currency',
      defaultValue: 50000,
      min: 0,
      step: 100,
      helpText: 'Total value of stocks, bonds, mutual funds, etc.'
    },
    retirement: {
      label: 'Retirement Accounts',
      type: 'currency',
      defaultValue: 100000,
      min: 0,
      step: 100,
      helpText: '401(k), IRA, and other retirement accounts'
    },
    realEstate: {
      label: 'Real Estate',
      type: 'currency',
      defaultValue: 300000,
      min: 0,
      step: 1000,
      helpText: 'Market value of your home and other properties'
    },
    vehicles: {
      label: 'Vehicles',
      type: 'currency',
      defaultValue: 25000,
      min: 0,
      step: 100,
      helpText: 'Current value of cars, boats, etc.'
    },
    otherAssets: {
      label: 'Other Assets',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Value of other significant assets'
    },
    // Liabilities
    mortgages: {
      label: 'Mortgages',
      type: 'currency',
      defaultValue: 250000,
      min: 0,
      step: 1000,
      helpText: 'Total mortgage balances'
    },
    carLoans: {
      label: 'Car Loans',
      type: 'currency',
      defaultValue: 15000,
      min: 0,
      step: 100,
      helpText: 'Total auto loan balances'
    },
    creditCards: {
      label: 'Credit Card Debt',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Total credit card balances'
    },
    studentLoans: {
      label: 'Student Loans',
      type: 'currency',
      defaultValue: 30000,
      min: 0,
      step: 100,
      helpText: 'Total student loan balances'
    },
    otherDebts: {
      label: 'Other Debts',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      step: 100,
      helpText: 'Any other debts or liabilities'
    }
  },
  calculate: (inputs) => {
    const {
      cashAndSavings,
      investments,
      retirement,
      realEstate,
      vehicles,
      otherAssets,
      mortgages,
      carLoans,
      creditCards,
      studentLoans,
      otherDebts
    } = inputs

    // Calculate liquid assets
    const liquidAssets = cashAndSavings + investments

    // Calculate illiquid assets
    const illiquidAssets = retirement + realEstate + vehicles + otherAssets

    // Calculate total assets
    const totalAssets = liquidAssets + illiquidAssets

    // Calculate short-term liabilities
    const shortTermLiabilities = creditCards

    // Calculate long-term liabilities
    const longTermLiabilities = mortgages + carLoans + studentLoans + otherDebts

    // Calculate total liabilities
    const totalLiabilities = shortTermLiabilities + longTermLiabilities

    // Calculate net worth
    const netWorth = totalAssets - totalLiabilities

    // Calculate debt-to-asset ratio
    const debtToAssetRatio = (totalLiabilities / totalAssets) * 100

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
      liquidAssets,
      illiquidAssets,
      shortTermLiabilities,
      longTermLiabilities
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
      liquidAssets,
      illiquidAssets,
      shortTermLiabilities,
      longTermLiabilities
    } = result

    return `
Net Worth Summary:
----------------
Net Worth: ${formatter.format(netWorth)}

Assets:
------
Total Assets: ${formatter.format(totalAssets)}
Liquid Assets: ${formatter.format(liquidAssets)}
Illiquid Assets: ${formatter.format(illiquidAssets)}

Liabilities:
-----------
Total Liabilities: ${formatter.format(totalLiabilities)}
Short-term Liabilities: ${formatter.format(shortTermLiabilities)}
Long-term Liabilities: ${formatter.format(longTermLiabilities)}

Ratios:
------
Debt-to-Asset Ratio: ${debtToAssetRatio.toFixed(1)}%
    `.trim()
  }
} 