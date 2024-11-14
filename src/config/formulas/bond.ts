import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const bondFormulas: FormulaConfig = {
  'bond-calculator': {
    name: 'Bond Yield Calculator',
    description: 'Calculate bond yields, prices, and interest payments',
    variables: {
      faceValue: {
        label: 'Face Value',
        type: 'currency',
        defaultValue: 1000,
        min: 0,
        helpText: 'The par value or nominal value of the bond'
      },
      couponRate: {
        label: 'Coupon Rate',
        type: 'percentage',
        defaultValue: 5,
        min: 0,
        max: 100,
        step: 0.1,
        helpText: 'Annual interest rate paid by the bond'
      },
      marketPrice: {
        label: 'Market Price',
        type: 'currency',
        defaultValue: 950,
        min: 0,
        helpText: 'Current market price of the bond'
      },
      yearsToMaturity: {
        label: 'Years to Maturity',
        type: 'number',
        defaultValue: 10,
        min: 0,
        max: 100,
        step: 1,
        helpText: 'Time until the bond matures'
      },
      paymentFrequency: {
        label: 'Payments per Year',
        type: 'number',
        defaultValue: 2,
        min: 1,
        max: 12,
        step: 1,
        helpText: 'Number of interest payments per year'
      }
    },
    calculate: (inputs) => {
      const { faceValue, couponRate, marketPrice, yearsToMaturity, paymentFrequency } = inputs
      
      // Calculate annual coupon payment
      const annualCouponPayment = faceValue * (couponRate / 100)
      const paymentPerPeriod = annualCouponPayment / paymentFrequency
      
      // Calculate current yield
      const currentYield = (annualCouponPayment / marketPrice) * 100
      
      // Calculate yield to maturity (YTM) using Newton's method
      let ytm = currentYield / 100 // Initial guess
      const periodsRemaining = yearsToMaturity * paymentFrequency
      const tolerance = 0.0001
      let maxIterations = 100
      
      while (maxIterations > 0) {
        const r = ytm / paymentFrequency
        let pvSum = 0
        for (let i = 1; i <= periodsRemaining; i++) {
          pvSum += paymentPerPeriod / Math.pow(1 + r, i)
        }
        pvSum += faceValue / Math.pow(1 + r, periodsRemaining)
        
        const diff = pvSum - marketPrice
        if (Math.abs(diff) < tolerance) break
        
        // Calculate derivative for Newton's method
        let derivSum = 0
        for (let i = 1; i <= periodsRemaining; i++) {
          derivSum -= (i * paymentPerPeriod) / Math.pow(1 + r, i + 1)
        }
        derivSum -= (periodsRemaining * faceValue) / Math.pow(1 + r, periodsRemaining + 1)
        
        ytm -= diff / derivSum
        maxIterations--
      }
      
      // Calculate duration
      const r = ytm / paymentFrequency
      let durationNum = 0
      let durationDen = marketPrice
      for (let i = 1; i <= periodsRemaining; i++) {
        const pv = paymentPerPeriod / Math.pow(1 + r, i)
        durationNum += i * pv
      }
      durationNum += periodsRemaining * (faceValue / Math.pow(1 + r, periodsRemaining))
      const duration = durationNum / durationDen / paymentFrequency
      
      return {
        currentYield,
        yieldToMaturity: ytm * 100,
        duration,
        annualCouponPayment,
        totalPayments: annualCouponPayment * yearsToMaturity
      }
    },
    formatResult: (result) => {
      const { currentYield, yieldToMaturity, duration, annualCouponPayment, totalPayments } = result
      return `Current Yield: ${formatPercentage(currentYield)}
Yield to Maturity: ${formatPercentage(yieldToMaturity)}
Duration: ${duration.toFixed(2)} years
Annual Coupon Payment: ${formatCurrency(annualCouponPayment)}
Total Interest Payments: ${formatCurrency(totalPayments)}`
    }
  }
} 