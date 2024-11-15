import type { Formula } from '@/config/formulas/types'

interface RiskAssessmentResult extends Record<string, number | string> {
  riskScore: number
  sharpeRatio: number
  annualizedRisk: number
  riskAdjustedReturn: number
  riskCategoryName: string
  riskCategoryDescription: string
  [key: string]: number | string
}

// Make rates and limits configurable for easy updates
const RISK_ASSESSMENT_CONFIG = {
  year: 2023,
  defaults: {
    expectedReturn: 10,
    standardDeviation: 15,
    timeHorizon: 5,
    riskFreeRate: 4.5  // Current 10-year Treasury yield
  },
  limits: {
    maxReturn: 100,    // 100% max return
    maxDeviation: 50,  // 50% max standard deviation
    maxHorizon: 30,    // 30 years max
    riskLevels: {
      low: 0.5,        // Risk score < 0.5 is high risk
      medium: 1.0,     // Risk score 0.5-1.0 is medium risk
      high: 1.5        // Risk score > 1.5 is low risk
    }
  },
  riskCategories: [
    { name: 'Conservative', minScore: 1.5, description: 'Lower returns but more stable' },
    { name: 'Moderate', minScore: 1.0, description: 'Balanced risk and return' },
    { name: 'Aggressive', minScore: 0.5, description: 'Higher returns but more volatile' },
    { name: 'Very Aggressive', minScore: 0, description: 'Highest potential returns and risk' }
  ]
}

export const riskAssessmentCalculator: Formula<RiskAssessmentResult> = {
  name: 'Risk Assessment Calculator',
  description: 'Evaluate investment risk and calculate risk-adjusted returns',
  variables: {
    expectedReturn: {
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      defaultValue: RISK_ASSESSMENT_CONFIG.defaults.expectedReturn,
      min: -RISK_ASSESSMENT_CONFIG.limits.maxReturn,
      max: RISK_ASSESSMENT_CONFIG.limits.maxReturn,
      step: 0.1,
      helpText: 'Expected annual return of the investment'
    },
    standardDeviation: {
      label: 'Standard Deviation (%)',
      type: 'percentage',
      defaultValue: RISK_ASSESSMENT_CONFIG.defaults.standardDeviation,
      min: 0.1,
      max: RISK_ASSESSMENT_CONFIG.limits.maxDeviation,
      step: 0.1,
      helpText: 'Historical volatility of returns'
    },
    timeHorizon: {
      label: 'Investment Time Horizon (Years)',
      type: 'number',
      defaultValue: RISK_ASSESSMENT_CONFIG.defaults.timeHorizon,
      min: 1,
      max: RISK_ASSESSMENT_CONFIG.limits.maxHorizon,
      step: 1,
      helpText: 'Expected length of investment period'
    },
    riskFreeRate: {
      label: 'Risk-Free Rate (%)',
      type: 'percentage',
      defaultValue: RISK_ASSESSMENT_CONFIG.defaults.riskFreeRate,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: 'Current risk-free rate (e.g., Treasury yield)'
    },
    investmentType: {
      label: 'Investment Type',
      type: 'select',
      defaultValue: 1,
      options: [
        { label: 'Stocks', value: 1 },
        { label: 'Bonds', value: 2 },
        { label: 'Real Estate', value: 3 },
        { label: 'Cryptocurrency', value: 4 }
      ],
      helpText: 'Type of investment being analyzed'
    }
  },
  calculate: (inputs) => {
    const {
      expectedReturn,
      standardDeviation,
      timeHorizon,
      riskFreeRate
    } = inputs

    // Calculate basic risk score (return/risk ratio)
    const riskScore = standardDeviation > 0 
      ? expectedReturn / standardDeviation 
      : 0

    // Calculate Sharpe Ratio (risk-adjusted excess return)
    const sharpeRatio = standardDeviation > 0 
      ? (expectedReturn - riskFreeRate) / standardDeviation 
      : 0

    // Calculate annualized risk (standard deviation over time)
    const annualizedRisk = standardDeviation * Math.sqrt(timeHorizon)

    // Calculate risk-adjusted return
    const riskAdjustedReturn = expectedReturn - (standardDeviation * 0.5)

    // Determine risk category
    const riskCategory = RISK_ASSESSMENT_CONFIG.riskCategories.find(
      category => riskScore >= category.minScore
    ) || RISK_ASSESSMENT_CONFIG.riskCategories[RISK_ASSESSMENT_CONFIG.riskCategories.length - 1]

    return {
      riskScore,
      sharpeRatio,
      annualizedRisk,
      riskAdjustedReturn,
      expectedReturn,
      standardDeviation,
      riskFreeRate,
      riskCategoryName: riskCategory.name,
      riskCategoryDescription: riskCategory.description
    }
  },
  formatResult: (result) => {
    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const scoreFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    })

    return `
Risk Assessment Analysis:
----------------------
Risk Category: ${result.riskCategoryName}
${result.riskCategoryDescription}

Risk Metrics:
----------
Risk Score: ${scoreFormatter.format(result.riskScore)}
Sharpe Ratio: ${scoreFormatter.format(result.sharpeRatio)}
Annualized Risk: ${percentFormatter.format(result.annualizedRisk)}%

Return Analysis:
-------------
Expected Return: ${percentFormatter.format(result.expectedReturn)}%
Risk-Adjusted Return: ${percentFormatter.format(result.riskAdjustedReturn)}%
Volatility (Std Dev): ${percentFormatter.format(result.standardDeviation)}%

Note: Past performance and volatility do not guarantee future results.
Consider your risk tolerance and investment goals when making decisions.
    `.trim()
  }
} 