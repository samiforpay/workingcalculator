import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const wealthFormulas: FormulaConfig = {
  'net-worth': {
    name: 'Net Worth Calculator',
    description: 'Calculate your total net worth and track your wealth growth',
    variables: {
      cashAndSavings: {
        label: 'Cash and Savings',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'Total amount in bank accounts and cash'
      },
      investments: {
        label: 'Investment Accounts',
        type: 'currency',
        defaultValue: 50000,
        min: 0,
        helpText: 'Value of stocks, bonds, mutual funds, etc.'
      },
      retirementAccounts: {
        label: 'Retirement Accounts',
        type: 'currency',
        defaultValue: 100000,
        min: 0,
        helpText: '401(k), IRA, and other retirement savings'
      },
      realEstate: {
        label: 'Real Estate',
        type: 'currency',
        defaultValue: 300000,
        min: 0,
        helpText: 'Market value of your properties'
      },
      vehicles: {
        label: 'Vehicles',
        type: 'currency',
        defaultValue: 25000,
        min: 0,
        helpText: 'Current value of cars, boats, etc.'
      },
      otherAssets: {
        label: 'Other Assets',
        type: 'currency',
        defaultValue: 10000,
        min: 0,
        helpText: 'Jewelry, art, collectibles, etc.'
      },
      mortgages: {
        label: 'Mortgages',
        type: 'currency',
        defaultValue: 250000,
        min: 0,
        helpText: 'Total mortgage balances'
      },
      carLoans: {
        label: 'Vehicle Loans',
        type: 'currency',
        defaultValue: 15000,
        min: 0,
        helpText: 'Total auto loan balances'
      },
      studentLoans: {
        label: 'Student Loans',
        type: 'currency',
        defaultValue: 30000,
        min: 0,
        helpText: 'Total student loan debt'
      },
      creditCardDebt: {
        label: 'Credit Card Debt',
        type: 'currency',
        defaultValue: 5000,
        min: 0,
        helpText: 'Total credit card balances'
      },
      otherDebts: {
        label: 'Other Debts',
        type: 'currency',
        defaultValue: 0,
        min: 0,
        helpText: 'Any other liabilities'
      }
    },
    calculate: (inputs) => {
      const {
        cashAndSavings,
        investments,
        retirementAccounts,
        realEstate,
        vehicles,
        otherAssets,
        mortgages,
        carLoans,
        studentLoans,
        creditCardDebt,
        otherDebts
      } = inputs

      // Calculate total assets
      const totalAssets = cashAndSavings + investments + retirementAccounts + 
        realEstate + vehicles + otherAssets

      // Calculate liquid assets
      const liquidAssets = cashAndSavings + investments

      // Calculate retirement assets
      const retirementAssets = retirementAccounts

      // Calculate total liabilities
      const totalLiabilities = mortgages + carLoans + studentLoans + 
        creditCardDebt + otherDebts

      // Calculate net worth
      const netWorth = totalAssets - totalLiabilities

      // Calculate ratios
      const debtToAssetRatio = (totalLiabilities / totalAssets) * 100
      const liquidityRatio = (liquidAssets / totalAssets) * 100
      const retirementRatio = (retirementAssets / totalAssets) * 100

      return {
        totalAssets,
        liquidAssets,
        retirementAssets,
        totalLiabilities,
        netWorth,
        debtToAssetRatio,
        liquidityRatio,
        retirementRatio
      }
    },
    formatResult: (result) => {
      const {
        totalAssets,
        liquidAssets,
        retirementAssets,
        totalLiabilities,
        netWorth,
        debtToAssetRatio,
        liquidityRatio,
        retirementRatio
      } = result

      return `Total Assets: ${formatCurrency(totalAssets)}
Liquid Assets: ${formatCurrency(liquidAssets)}
Retirement Assets: ${formatCurrency(retirementAssets)}
Total Liabilities: ${formatCurrency(totalLiabilities)}
Net Worth: ${formatCurrency(netWorth)}
Debt-to-Asset Ratio: ${formatPercentage(debtToAssetRatio)}
Liquidity Ratio: ${formatPercentage(liquidityRatio)}
Retirement Ratio: ${formatPercentage(retirementRatio)}`
    }
  }
} 