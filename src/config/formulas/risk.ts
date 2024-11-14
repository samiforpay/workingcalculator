import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const riskFormulas: FormulaConfig = {
  'risk-assessment': {
    name: 'Investment Risk Assessment Calculator',
    description: 'Calculate and analyze investment risk metrics including volatility, beta, and Sharpe ratio',
    variables: {
      expectedReturn: {
        label: 'Expected Annual Return',
        type: 'percentage',
        defaultValue: 10,
        min: -100,
        max: 100,
        step: 0.1,
        helpText: 'Expected annual return of the investment'
      },
      volatility: {
        label: 'Annual Volatility',
        type: 'percentage',
        defaultValue: 15,
        min: 0,
        max: 100,
        step: 0.1,
        helpText: 'Standard deviation of annual returns'
      },
      marketReturn: {
        label: 'Market Return',
        type: 'percentage',
        defaultValue: 8,
        min: -100,
        max: 100,
        step: 0.1,
        helpText: 'Expected market return (e.g., S&P 500)'
      },
      riskFreeRate: {
        label: 'Risk-Free Rate',
        type: 'percentage',
        defaultValue: 3,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Return rate of risk-free investment (e.g., Treasury bills)'
      },
      investmentAmount: {
        label: 'Investment Amount',
        type: 'currency',
        defaultValue: 100000,
        min: 0,
        helpText: 'Amount to invest'
      }
    },
    calculate: (inputs) => {
      const { expectedReturn, volatility, marketReturn, riskFreeRate, investmentAmount } = inputs

      // Calculate Beta (assuming market correlation of 0.6 as example)
      const marketCorrelation = 0.6
      const marketVolatility = 20 // Standard market volatility
      const beta = (volatility / marketVolatility) * marketCorrelation

      // Calculate Sharpe Ratio
      const sharpeRatio = (expectedReturn - riskFreeRate) / volatility

      // Calculate Value at Risk (VaR) at 95% confidence
      const z95 = 1.645 // Z-score for 95% confidence
      const monthlyVaR = investmentAmount * (volatility / Math.sqrt(12)) * z95

      // Calculate Maximum Drawdown (simplified estimation)
      const maxDrawdown = -2.5 * (volatility / 100) * investmentAmount

      // Calculate Risk-Adjusted Return
      const riskAdjustedReturn = expectedReturn / volatility

      return {
        beta,
        sharpeRatio,
        monthlyVaR,
        maxDrawdown,
        riskAdjustedReturn,
        annualizedRisk: volatility,
        excessReturn: expectedReturn - riskFreeRate,
        systematicRisk: beta * marketVolatility,
        unsystematicRisk: Math.sqrt(volatility ** 2 - (beta * marketVolatility) ** 2)
      }
    },
    formatResult: (result) => {
      const {
        beta,
        sharpeRatio,
        monthlyVaR,
        maxDrawdown,
        riskAdjustedReturn,
        annualizedRisk,
        excessReturn,
        systematicRisk,
        unsystematicRisk
      } = result

      return `Beta (Market Sensitivity): ${beta.toFixed(2)}
Sharpe Ratio: ${sharpeRatio.toFixed(2)}
Monthly Value at Risk (95%): ${formatCurrency(monthlyVaR)}
Maximum Expected Drawdown: ${formatCurrency(maxDrawdown)}
Risk-Adjusted Return: ${formatPercentage(riskAdjustedReturn)}
Annualized Risk: ${formatPercentage(annualizedRisk)}
Excess Return: ${formatPercentage(excessReturn)}
Systematic Risk: ${formatPercentage(systematicRisk)}
Unsystematic Risk: ${formatPercentage(unsystematicRisk)}`
    }
  }
} 