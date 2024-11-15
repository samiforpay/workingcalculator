import type { Formula } from '@/config/formulas/types'

interface BusinessValuationResult extends Record<string, number> {
  bookValue: number
  dcfValue: number
  revenueValue: number
  averageValue: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const BUSINESS_VALUATION_CONFIG = {
  year: 2023,
  defaults: {
    assets: 1000000,
    liabilities: 500000,
    revenue: 750000,
    discountRate: 10,
    industryMultiple: 3
  },
  limits: {
    maxValue: 1000000000, // 1 billion
    maxRate: 50,
    maxMultiple: 20
  },
  industryMultiples: {
    technology: 5,
    retail: 2,
    manufacturing: 3,
    services: 2.5,
    healthcare: 4
  }
}

export const businessValuationCalculator: Formula<BusinessValuationResult> = {
  name: 'Business Valuation Calculator',
  description: 'Calculate business value using multiple valuation methods',
  variables: {
    totalAssets: {
      label: 'Total Assets',
      type: 'currency',
      defaultValue: BUSINESS_VALUATION_CONFIG.defaults.assets,
      min: 0,
      max: BUSINESS_VALUATION_CONFIG.limits.maxValue,
      step: 1000,
      helpText: 'Total value of all business assets'
    },
    totalLiabilities: {
      label: 'Total Liabilities',
      type: 'currency',
      defaultValue: BUSINESS_VALUATION_CONFIG.defaults.liabilities,
      min: 0,
      max: BUSINESS_VALUATION_CONFIG.limits.maxValue,
      step: 1000,
      helpText: 'Total value of all business debts and obligations'
    },
    annualRevenue: {
      label: 'Annual Revenue',
      type: 'currency',
      defaultValue: BUSINESS_VALUATION_CONFIG.defaults.revenue,
      min: 0,
      max: BUSINESS_VALUATION_CONFIG.limits.maxValue,
      step: 1000,
      helpText: 'Annual gross revenue'
    },
    cashFlow1: {
      label: 'Expected Cash Flow Year 1',
      type: 'currency',
      defaultValue: 100000,
      min: -BUSINESS_VALUATION_CONFIG.limits.maxValue,
      max: BUSINESS_VALUATION_CONFIG.limits.maxValue,
      step: 1000,
      helpText: 'Projected cash flow for year 1'
    },
    cashFlow2: {
      label: 'Expected Cash Flow Year 2',
      type: 'currency',
      defaultValue: 120000,
      min: -BUSINESS_VALUATION_CONFIG.limits.maxValue,
      max: BUSINESS_VALUATION_CONFIG.limits.maxValue,
      step: 1000,
      helpText: 'Projected cash flow for year 2'
    },
    cashFlow3: {
      label: 'Expected Cash Flow Year 3',
      type: 'currency',
      defaultValue: 150000,
      min: -BUSINESS_VALUATION_CONFIG.limits.maxValue,
      max: BUSINESS_VALUATION_CONFIG.limits.maxValue,
      step: 1000,
      helpText: 'Projected cash flow for year 3'
    },
    discountRate: {
      label: 'Discount Rate (%)',
      type: 'percentage',
      defaultValue: BUSINESS_VALUATION_CONFIG.defaults.discountRate,
      min: 1,
      max: BUSINESS_VALUATION_CONFIG.limits.maxRate,
      step: 0.1,
      helpText: 'Required rate of return for discounting future cash flows'
    },
    industryMultiple: {
      label: 'Industry Multiple',
      type: 'number',
      defaultValue: BUSINESS_VALUATION_CONFIG.defaults.industryMultiple,
      min: 0.1,
      max: BUSINESS_VALUATION_CONFIG.limits.maxMultiple,
      step: 0.1,
      helpText: 'Industry revenue multiple for valuation'
    }
  },
  calculate: (inputs) => {
    const {
      totalAssets,
      totalLiabilities,
      annualRevenue,
      cashFlow1,
      cashFlow2,
      cashFlow3,
      discountRate,
      industryMultiple
    } = inputs

    // Calculate Book Value (Asset-Based Method)
    const bookValue = totalAssets - totalLiabilities

    // Calculate DCF Value
    const r = discountRate / 100
    const dcfValue = (cashFlow1 / (1 + r)) +
                    (cashFlow2 / Math.pow(1 + r, 2)) +
                    (cashFlow3 / Math.pow(1 + r, 3))

    // Calculate Revenue-Based Value
    const revenueValue = annualRevenue * industryMultiple

    // Calculate Average Value (weighted)
    const averageValue = (bookValue + dcfValue + revenueValue) / 3

    return {
      bookValue,
      dcfValue,
      revenueValue,
      averageValue,
      totalAssets,
      totalLiabilities,
      annualRevenue
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Business Valuation Analysis:
-------------------------
Valuation Methods:
---------------
1. Book Value (Asset-Based): ${formatter.format(result.bookValue)}
2. Discounted Cash Flow: ${formatter.format(result.dcfValue)}
3. Revenue Multiple: ${formatter.format(result.revenueValue)}

Summary:
-------
Average Business Value: ${formatter.format(result.averageValue)}

Business Metrics:
--------------
Total Assets: ${formatter.format(result.totalAssets)}
Total Liabilities: ${formatter.format(result.totalLiabilities)}
Annual Revenue: ${formatter.format(result.annualRevenue)}

Note: This is an estimate based on provided data.
Professional valuation recommended for major decisions.
    `.trim()
  }
} 