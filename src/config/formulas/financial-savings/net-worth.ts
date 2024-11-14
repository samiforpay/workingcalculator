import type { Formula } from '@/config/formulas/types'



interface NetWorthResult extends Record<string, number> {

  totalAssets: number

  totalLiabilities: number

  netWorth: number

  debtToAssetRatio: number

  [key: string]: number

}



// Make asset and liability categories configurable

const NET_WORTH_CONFIG = {

  year: 2023,

  categories: {

    cashAssets: {

      label: 'Cash & Liquid Assets',

      options: [

        { label: 'Basic (Checking & Savings)', value: 1 },

        { label: 'Detailed (All Accounts)', value: 2 }

      ]

    },

    investmentAssets: {

      label: 'Investment Assets',

      options: [

        { label: 'Basic (Stocks & Retirement)', value: 1 },

        { label: 'Detailed (All Investments)', value: 2 }

      ]

    },

    retirementAccounts: {

      label: 'Retirement Account Types',

      options: [

        { label: '401(k)', value: 1 },

        { label: 'Traditional IRA', value: 2 },

        { label: 'Roth IRA', value: 3 },

        { label: 'Other', value: 4 }

      ]

    }

  }

}



export const netWorthCalculator: Formula<NetWorthResult> = {

  name: 'Net Worth Calculator',

  description: 'Calculate your total net worth by analyzing your assets and liabilities',

  variables: {

    // Cash Assets section (mandatory, checked by default)

    includeCashAssets: {

      label: 'Include Cash & Liquid Assets',

      type: 'checkbox',

      defaultValue: 1, // Checked by default as it's mandatory

      helpText: 'Include cash, savings, and other liquid assets'

    },

    checkingAccounts: {

      label: 'Checking Accounts',

      type: 'currency',

      defaultValue: 5000,

      min: 0,

      step: 100,

      helpText: 'Total balance in all checking accounts',

      dependsOn: 'includeCashAssets'

    },

    savingsAccounts: {

      label: 'Savings Accounts',

      type: 'currency',

      defaultValue: 10000,

      min: 0,

      step: 100,

      helpText: 'Total balance in all savings accounts',

      dependsOn: 'includeCashAssets'

    },

    cashAssetsType: {

      label: 'Cash Assets Detail Level',

      type: 'select',

      defaultValue: 1,

      options: NET_WORTH_CONFIG.categories.cashAssets.options,

      helpText: 'Choose how detailed you want to track cash assets',

      dependsOn: 'includeCashAssets'

    },

    cashOnHand: {

      label: 'Cash on Hand',

      type: 'currency',

      defaultValue: 1000,

      min: 0,

      step: 100,

      helpText: 'Physical cash and easily accessible money',

      dependsOn: 'cashAssetsType',

      showWhen: 2

    },

    certificates: {

      label: 'Certificates of Deposit',

      type: 'currency',

      defaultValue: 5000,

      min: 0,

      step: 100,

      helpText: 'Total value of CDs',

      dependsOn: 'cashAssetsType',

      showWhen: 2

    },

    // Investment section (optional, unchecked by default)

    includeInvestments: {

      label: 'Include Investment Assets',

      type: 'checkbox',

      defaultValue: 0, // Unchecked by default

      helpText: 'Include stocks, bonds, and retirement accounts'

    },

    investmentType: {

      label: 'Investment Detail Level',

      type: 'select',

      defaultValue: 1,

      options: NET_WORTH_CONFIG.categories.investmentAssets.options,

      helpText: 'Choose how detailed you want to track investments',

      dependsOn: 'includeInvestments'

    },

    stocksAndBonds: {

      label: 'Stocks & Bonds',

      type: 'currency',

      defaultValue: 50000,

      min: 0,

      step: 1000,

      helpText: 'Total value of investment accounts',

      dependsOn: 'includeInvestments'

    },

    retirementAccounts: {

      label: 'Retirement Accounts',

      type: 'currency',

      defaultValue: 100000,

      min: 0,

      step: 1000,

      helpText: 'Value of retirement accounts',

      dependsOn: 'includeInvestments'

    },

    retirementAccountType: {

      label: 'Primary Retirement Account Type',

      type: 'select',

      defaultValue: 1,

      options: NET_WORTH_CONFIG.categories.retirementAccounts.options,

      helpText: 'Select your main retirement account type',

      dependsOn: 'includeInvestments'

    },

    cryptocurrency: {

      label: 'Cryptocurrency',

      type: 'currency',

      defaultValue: 0,

      min: 0,

      step: 100,

      helpText: 'Value of cryptocurrency holdings',

      dependsOn: 'investmentType',

      showWhen: 2

    },

    // Property section (optional, unchecked by default)

    includeProperty: {

      label: 'Include Property & Valuables',

      type: 'checkbox',

      defaultValue: 0, // Unchecked by default

      helpText: 'Include real estate and valuable items'

    },

    homeValue: {

      label: 'Primary Residence Value',

      type: 'currency',

      defaultValue: 300000,

      min: 0,

      step: 1000,

      helpText: 'Current market value of your home',

      dependsOn: 'includeProperty'

    },

    otherRealEstate: {

      label: 'Other Real Estate',

      type: 'currency',

      defaultValue: 0,

      min: 0,

      step: 1000,

      helpText: 'Value of additional properties',

      dependsOn: 'includeProperty'

    },

    // Debts section (optional, unchecked by default)

    includeDebts: {

      label: 'Include Debts & Liabilities',

      type: 'checkbox',

      defaultValue: 0, // Unchecked by default

      helpText: 'Include loans, mortgages, and other debts'

    },

    mortgageBalance: {

      label: 'Mortgage Balance',

      type: 'currency',

      defaultValue: 250000,

      min: 0,

      step: 1000,

      helpText: 'Remaining mortgage balance',

      dependsOn: 'includeDebts'

    },

    creditCardDebt: {

      label: 'Credit Card Debt',

      type: 'currency',

      defaultValue: 5000,

      min: 0,

      step: 100,

      helpText: 'Total credit card balances',

      dependsOn: 'includeDebts'

    },

    studentLoans: {

      label: 'Student Loans',

      type: 'currency',

      defaultValue: 30000,

      min: 0,

      step: 1000,

      helpText: 'Total student loan balance',

      dependsOn: 'includeDebts'

    }

  },

  calculate: (inputs) => {

    // Calculate cash assets based on detail level

    const cashAssets = inputs.includeCashAssets === 1 

      ? (inputs.checkingAccounts || 0) + 

        (inputs.savingsAccounts || 0) +

        (inputs.cashAssetsType === 2 ? (inputs.cashOnHand || 0) + (inputs.certificates || 0) : 0)

      : 0



    // Calculate investment assets

    const investmentAssets = inputs.includeInvestments === 1

      ? (inputs.stocksAndBonds || 0) + 

        (inputs.retirementAccounts || 0) +

        (inputs.investmentType === 2 ? (inputs.cryptocurrency || 0) : 0)

      : 0



    // Calculate property assets

    const propertyAssets = inputs.includeProperty === 1

      ? (inputs.homeValue || 0) + (inputs.otherRealEstate || 0)

      : 0



    // Calculate total assets

    const totalAssets = cashAssets + investmentAssets + propertyAssets



    // Calculate total liabilities

    const totalLiabilities = inputs.includeDebts === 1

      ? (inputs.mortgageBalance || 0) + 

        (inputs.creditCardDebt || 0) + 

        (inputs.studentLoans || 0)

      : 0



    // Calculate net worth and ratios

    const netWorth = totalAssets - totalLiabilities

    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0



    return {

      totalAssets,

      totalLiabilities,

      netWorth,

      debtToAssetRatio

    }

  },

  formatResult: (result) => {

    const formatter = new Intl.NumberFormat('en-US', { 

      style: 'currency', 

      currency: 'USD',

      maximumFractionDigits: 0

    })



    return `

Net Worth Summary:

----------------

Total Assets: ${formatter.format(result.totalAssets)}

Total Liabilities: ${formatter.format(result.totalLiabilities)}



Final Analysis:

------------

Net Worth: ${formatter.format(result.netWorth)}

Debt-to-Asset Ratio: ${result.debtToAssetRatio.toFixed(1)}%



Note: Values are estimates based on current market values.

Regular updates recommended for accurate tracking.

    `.trim()

  }

} 
