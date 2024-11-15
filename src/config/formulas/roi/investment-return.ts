import type { Formula } from '@/config/formulas/types'

interface InvestmentReturnResult extends Record<string, number> {
  roi: number
  absoluteReturn: number
  annualizedReturn: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const INVESTMENT_RETURN_CONFIG = {
  year: 2023,
  defaults: {
    initialInvestment: 10000,
    finalValue: 15000,
    investmentPeriod: 3,
    reinvestedDividends: 500
  },
  limits: {
    maxInvestment: 1000000000, // 1 billion
    maxPeriod: 50,  // 50 years
    minPeriod: 0.1  // 1.2 months
  }
}

export const investmentReturnCalculator: Formula<InvestmentReturnResult> = {
  name: 'Investment Return Calculator',
  description: '',
  longDescription: `
    <p>Curious about how your investments will grow? Our Investment Returns Calculator provides a straightforward way to estimate your future investment value. With this investment growth rate calculator, you can see how different rates of return affect your portfolio over time. Easily calculate investment returns and understand the impact of compound interest with our compound interest returns calculator—perfect for long-term planning.</p>
    <p>Key metrics calculated:</p>
    <ul>
      <li>Total Return on Investment (ROI)</li>
      <li>Annualized Rate of Return</li>
      <li>Real Return (Adjusted for Inflation)</li>
      <li>Income Return (Dividends/Interest)</li>
      <li>Capital Gains Return</li>
    </ul>
    <p>Use this calculator to evaluate investment performance and make informed decisions about your portfolio management strategy.</p>
  `,
  variables: {
    initialInvestment: {
      label: 'Initial Investment',
      type: 'currency',
      defaultValue: INVESTMENT_RETURN_CONFIG.defaults.initialInvestment,
      min: 0,
      max: INVESTMENT_RETURN_CONFIG.limits.maxInvestment,
      step: 100,
      helpText: 'Amount initially invested'
    },
    finalValue: {
      label: 'Final Investment Value',
      type: 'currency',
      defaultValue: INVESTMENT_RETURN_CONFIG.defaults.finalValue,
      min: 0,
      max: INVESTMENT_RETURN_CONFIG.limits.maxInvestment,
      step: 100,
      helpText: 'Current or final value of investment'
    },
    investmentPeriod: {
      label: 'Investment Period (Years)',
      type: 'number',
      defaultValue: INVESTMENT_RETURN_CONFIG.defaults.investmentPeriod,
      min: INVESTMENT_RETURN_CONFIG.limits.minPeriod,
      max: INVESTMENT_RETURN_CONFIG.limits.maxPeriod,
      step: 0.1,
      helpText: 'Length of time investment was held'
    },
    reinvestedDividends: {
      label: 'Reinvested Dividends',
      type: 'currency',
      defaultValue: INVESTMENT_RETURN_CONFIG.defaults.reinvestedDividends,
      min: 0,
      max: INVESTMENT_RETURN_CONFIG.limits.maxInvestment,
      step: 100,
      helpText: 'Total dividends reinvested during period'
    }
  },
  calculate: (inputs) => {
    const { initialInvestment, finalValue, investmentPeriod, reinvestedDividends } = inputs
    
    // Calculate total cost basis
    const totalInvested = initialInvestment + reinvestedDividends
    
    // Calculate absolute return
    const absoluteReturn = finalValue - totalInvested
    
    // Calculate ROI percentage
    const roi = (absoluteReturn / totalInvested) * 100
    
    // Calculate annualized return using geometric mean
    const annualizedReturn = (Math.pow(finalValue / initialInvestment, 1/investmentPeriod) - 1) * 100

    return {
      roi,
      absoluteReturn,
      annualizedReturn,
      totalInvested,
      finalValue
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return `
Investment Return Analysis:
------------------------
Total Return: ${formatter.format(result.absoluteReturn)}
ROI: ${percentFormatter.format(result.roi)}%
Annualized Return: ${percentFormatter.format(result.annualizedReturn)}%

Investment Summary:
----------------
Total Invested: ${formatter.format(result.totalInvested)}
Final Value: ${formatter.format(result.finalValue)}

Note: Past performance does not guarantee future results.
Returns shown are before taxes and fees.
    `.trim()
  }
} 