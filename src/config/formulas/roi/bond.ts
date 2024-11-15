import type { Formula } from '@/config/formulas/types'

interface BondResult extends Record<string, number> {
  currentYield: number
  yieldToMaturity: number
  totalPayments: number
  totalInterest: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const BOND_CONFIG = {
  year: 2023,
  defaults: {
    parValue: 1000,
    couponRate: 5,
    bondQuote: 980,
    redemptionValue: 1000,
    frequency: 2 // Semi-annual payments
  },
  limits: {
    maxValue: 1000000000, // 1 billion
    maxRate: 30,
    maxYears: 50
  },
  paymentFrequencies: {
    annual: 1,
    semiannual: 2,
    quarterly: 4,
    monthly: 12
  }
}

export const bondCalculator: Formula<BondResult> = {
  name: 'Bond Calculator',
  description: '',
  longDescription: `
    <p>Investing in bonds? Our Bond Calculator is an essential tool for understanding bond yields and prices. Use this bond yield calculator for fixed income investments or learn how to calculate bond prices and yields simply. It’s a straightforward resource for both novice and experienced investors looking to optimize their bond portfolios.</p>
    <p>Calculations include:</p>
    <ul>
      <li>Yield to maturity (YTM)</li>
      <li>Current yield</li>
      <li>Bond price calculations</li>
      <li>Interest payment schedules</li>
      <li>Duration and convexity measures</li>
    </ul>
    <p>Understanding bond metrics helps you make informed decisions about fixed-income investments and manage interest rate risk in your portfolio.</p>
  `,
  variables: {
    parValue: {
      label: 'Par Value',
      type: 'currency',
      defaultValue: BOND_CONFIG.defaults.parValue,
      min: 100,
      max: BOND_CONFIG.limits.maxValue,
      helpText: 'Face value of the bond'
    },
    couponRate: {
      label: 'Coupon Rate (%)',
      type: 'percentage',
      defaultValue: BOND_CONFIG.defaults.couponRate,
      min: 0,
      max: BOND_CONFIG.limits.maxRate,
      step: 0.125,
      helpText: 'Annual interest rate paid by the bond'
    },
    bondQuote: {
      label: 'Bond Quote (Price)',
      type: 'currency',
      defaultValue: BOND_CONFIG.defaults.bondQuote,
      min: 1,
      max: BOND_CONFIG.limits.maxValue,
      helpText: 'Current market price of the bond'
    },
    yearsToMaturity: {
      label: 'Years to Maturity',
      type: 'number',
      defaultValue: 10,
      min: 0.5,
      max: BOND_CONFIG.limits.maxYears,
      step: 0.5,
      helpText: 'Time until bond matures'
    },
    redemptionValue: {
      label: 'Redemption Value',
      type: 'currency',
      defaultValue: BOND_CONFIG.defaults.redemptionValue,
      min: 1,
      max: BOND_CONFIG.limits.maxValue,
      helpText: 'Value paid at maturity'
    },
    paymentFrequency: {
      label: 'Payment Frequency',
      type: 'select',
      defaultValue: BOND_CONFIG.defaults.frequency,
      options: [
        { label: 'Annual', value: BOND_CONFIG.paymentFrequencies.annual },
        { label: 'Semi-Annual', value: BOND_CONFIG.paymentFrequencies.semiannual },
        { label: 'Quarterly', value: BOND_CONFIG.paymentFrequencies.quarterly },
        { label: 'Monthly', value: BOND_CONFIG.paymentFrequencies.monthly }
      ],
      helpText: 'How often interest is paid'
    }
  },
  calculate: (inputs) => {
    const {
      parValue,
      couponRate,
      bondQuote,
      yearsToMaturity,
      redemptionValue,
      paymentFrequency
    } = inputs

    // Calculate Current Yield
    const annualCouponPayment = (couponRate / 100) * parValue
    const currentYield = (annualCouponPayment / bondQuote) * 100

    // Calculate total number of payments
    const totalPayments = yearsToMaturity * paymentFrequency
    const paymentPerPeriod = annualCouponPayment / paymentFrequency

    // Calculate Yield to Maturity using iterative approach
    // This is a simplified approximation of YTM
    const priceChange = redemptionValue - bondQuote
    const annualPriceGain = priceChange / yearsToMaturity
    const totalAnnualReturn = annualCouponPayment + annualPriceGain
    const yieldToMaturity = (totalAnnualReturn / bondQuote) * 100

    // Calculate total interest payments
    const totalInterest = annualCouponPayment * yearsToMaturity

    // Calculate accrued interest if applicable
    const daysInYear = 365
    const daysAccrued = 0 // This would come from settlement date
    const accruedInterest = (annualCouponPayment * daysAccrued) / daysInYear

    return {
      currentYield,
      yieldToMaturity,
      totalPayments,
      totalInterest,
      paymentPerPeriod,
      accruedInterest,
      annualCouponPayment,
      priceChange
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    })

    return `
Bond Analysis:
------------
Current Yield: ${percentFormatter.format(result.currentYield)}%
Yield to Maturity: ${percentFormatter.format(result.yieldToMaturity)}%

Payment Schedule:
--------------
Annual Coupon Payment: ${formatter.format(result.annualCouponPayment)}
Payment per Period: ${formatter.format(result.paymentPerPeriod)}
Total Number of Payments: ${result.totalPayments}

Returns:
-------
Total Interest Payments: ${formatter.format(result.totalInterest)}
Price Change: ${formatter.format(result.priceChange)}
Accrued Interest: ${formatter.format(result.accruedInterest)}

Note: YTM calculation is simplified.
Actual returns may vary based on reinvestment rates.
    `.trim()
  }
} 