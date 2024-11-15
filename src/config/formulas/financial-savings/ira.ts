import type { Formula } from '@/config/formulas/types'

interface IraResult extends Record<string, number> {
  futureValue: number
  totalContributions: number
  totalEarnings: number
  effectiveRate: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const IRA_CONFIG = {
  year: 2023,
  limits: {
    contribution: 6500,       // Fixed: Annual contribution limit for 2023
    catchUp: 1000,           // Additional catch-up contribution (age 50+)
    rothIncomeLimit: {        // Roth IRA income phase-out ranges
      single: {
        start: 138000,
        end: 153000
      },
      married: {
        start: 218000,
        end: 228000
      }
    }
  },
  defaultRates: {
    return: 7,               // Default expected return rate
    inflation: 2.5           // Default inflation rate
  }
}

export const iraCalculator: Formula<IraResult> = {
  name: 'IRA Calculator',
  description: '',
  longDescription: `
    <p>Plan for retirement with confidence using our IRA Calculator. This simple IRA calculator helps you estimate your potential retirement savings based on contributions to both traditional and Roth IRAs. Discover how different contribution levels affect growth over time with our IRA contribution calculator and plan effectively with our IRA retirement savings estimator.</p>
    <p>Calculator features:</p>
    <ul>
      <li>Project retirement account growth over time</li>
      <li>Compare Traditional vs Roth IRA benefits</li>
      <li>Account for annual contribution limits</li>
      <li>Consider catch-up contributions for those 50 and older</li>
      <li>Estimate tax advantages of different IRA types</li>
    </ul>
    <p>Use this tool to optimize your retirement savings strategy and ensure you're on track to meet your retirement goals.</p>
  `,
  variables: {
    currentBalance: {
      label: 'Current IRA Balance',
      type: 'currency',
      defaultValue: 25000,
      min: 0,
      step: 1000,
      helpText: 'Your current IRA balance'
    },
    annualContribution: {
      label: 'Annual Contribution',
      type: 'currency',
      defaultValue: 6000,
      min: 0,
      max: IRA_CONFIG.limits.contribution + IRA_CONFIG.limits.catchUp,
      step: 500,
      helpText: `Annual contribution (limit: $6,500, or $7,500 if age 50+)`
    },
    expectedReturn: {
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      defaultValue: IRA_CONFIG.defaultRates.return,
      min: -20,
      max: 30,
      step: 0.1,
      helpText: 'Expected annual investment return'
    },
    yearsToRetirement: {
      label: 'Years Until Retirement',
      type: 'number',
      defaultValue: 25,
      min: 1,
      max: 50,
      step: 1,
      helpText: 'Number of years until retirement'
    },
    age: {
      label: 'Current Age',
      type: 'number',
      defaultValue: 35,
      min: 18,
      max: 99,
      step: 1,
      helpText: 'Your current age (affects contribution limits)'
    },
    accountType: {
      label: 'IRA Type',
      type: 'select',
      defaultValue: 1,
      options: [
        { label: 'Traditional IRA', value: 1 },
        { label: 'Roth IRA', value: 2 }
      ],
      helpText: 'Type of IRA account'
    },
    annualIncome: {
      label: 'Annual Income',
      type: 'currency',
      defaultValue: 75000,
      min: 0,
      step: 1000,
      helpText: 'Your current annual income (affects Roth eligibility)'
    }
  },
  calculate: (inputs) => {
    const {
      currentBalance,
      annualContribution,
      expectedReturn,
      yearsToRetirement,
      age,
      accountType,
      annualIncome
    } = inputs

    // Calculate contribution limit based on age
    const maxContribution = age >= 50 
      ? IRA_CONFIG.limits.contribution + IRA_CONFIG.limits.catchUp
      : IRA_CONFIG.limits.contribution

    // Validate Roth IRA contribution based on income
    let validContribution = Math.min(annualContribution, maxContribution)
    if (accountType === 2) { // Roth IRA
      const { start, end } = IRA_CONFIG.limits.rothIncomeLimit.single
      if (annualIncome > end) {
        validContribution = 0
      } else if (annualIncome > start) {
        const reductionRatio = (end - annualIncome) / (end - start)
        validContribution = validContribution * reductionRatio
      }
    }

    // Calculate future value using compound interest formula
    const r = expectedReturn / 100
    const t = yearsToRetirement
    
    const futureValue = currentBalance * Math.pow(1 + r, t) + 
                       validContribution * ((Math.pow(1 + r, t) - 1) / r)

    // Calculate totals
    const totalContributions = validContribution * yearsToRetirement
    const totalEarnings = futureValue - totalContributions - currentBalance
    const effectiveRate = (Math.pow(futureValue / currentBalance, 1/yearsToRetirement) - 1) * 100

    return {
      futureValue,
      totalContributions,
      totalEarnings,
      effectiveRate,
      validContribution,
      maxContribution
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
IRA Projection:
-------------
Future Value: ${formatter.format(result.futureValue)}

Contribution Analysis:
-------------------
Annual Contribution: ${formatter.format(result.validContribution)}
Maximum Allowed: ${formatter.format(result.maxContribution)}
Total Contributions: ${formatter.format(result.totalContributions)}
Investment Earnings: ${formatter.format(result.totalEarnings)}

Summary:
-------
Effective Annual Return: ${result.effectiveRate.toFixed(2)}%

Note: Projections are estimates based on constant returns.
Actual results will vary based on market performance.
Tax implications vary by IRA type and withdrawal timing.
    `.trim()
  }
} 