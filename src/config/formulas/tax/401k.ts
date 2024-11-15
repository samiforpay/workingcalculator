import type { Formula } from '@/config/formulas/types'

interface FourOhOneKResult extends Record<string, number> {
  futureValue: number
  totalContributions: number
  totalEmployerMatch: number
  totalEarnings: number
  effectiveRate: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const FOUR_OH_ONE_K_CONFIG = {
  year: 2023,
  limits: {
    contribution: 22500,      // Annual contribution limit
    catchUp: 7500,           // Additional catch-up contribution (age 50+)
    totalLimit: 66000        // Total annual limit including employer contributions
  },
  defaultRates: {
    return: 7,               // Default expected return rate
    employerMatch: 50,       // Default employer match percentage
    matchLimit: 6            // Default employer match limit (% of salary)
  }
}

export const fourOhOneKCalculator: Formula<FourOhOneKResult> = {
  name: '401(k) Calculator',
  description: '',
  longDescription: `
    <p>Maximize your retirement savings with our 401(k) Calculator! This 401(k) retirement savings calculator for 2024 helps you decide how much should I save in my 401(k). Use this simple 401(k) contribution calculator online to visualize your savings growth over time.</p>
    <p>Key features:</p>
    <ul>
      <li>Calculate projected retirement balance</li>
      <li>Account for employer matching contributions</li>
      <li>Consider contribution limits and catch-up provisions</li>
      <li>Analyze the impact of different investment returns</li>
      <li>Compare different contribution scenarios</li>
    </ul>
    <p>Use this calculator to optimize your retirement savings strategy and make the most of your employer's matching contributions.</p>
  `,
  variables: {
    currentBalance: {
      label: 'Current 401(k) Balance',
      type: 'currency',
      defaultValue: 50000,
      min: 0,
      step: 1000,
      helpText: 'Your current 401(k) balance'
    },
    annualSalary: {
      label: 'Annual Salary',
      type: 'currency',
      defaultValue: 75000,
      min: 0,
      step: 1000,
      helpText: 'Your current annual salary'
    },
    contributionPercent: {
      label: 'Contribution Rate (%)',
      type: 'percentage',
      defaultValue: 10,
      min: 0,
      max: 100,
      step: 0.5,
      helpText: 'Percentage of salary you contribute'
    },
    employerMatchPercent: {
      label: 'Employer Match (%)',
      type: 'percentage',
      defaultValue: FOUR_OH_ONE_K_CONFIG.defaultRates.employerMatch,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Percentage of your contribution your employer matches'
    },
    employerMatchLimit: {
      label: 'Employer Match Limit (%)',
      type: 'percentage',
      defaultValue: FOUR_OH_ONE_K_CONFIG.defaultRates.matchLimit,
      min: 0,
      max: 100,
      step: 0.5,
      helpText: 'Maximum salary percentage employer will match'
    },
    expectedReturn: {
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      defaultValue: FOUR_OH_ONE_K_CONFIG.defaultRates.return,
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
    }
  },
  calculate: (inputs) => {
    const {
      currentBalance,
      annualSalary,
      contributionPercent,
      employerMatchPercent,
      employerMatchLimit,
      expectedReturn,
      yearsToRetirement,
      age
    } = inputs

    // Calculate annual contribution
    const annualContribution = Math.min(
      (annualSalary * contributionPercent) / 100,
      age >= 50 
        ? FOUR_OH_ONE_K_CONFIG.limits.contribution + FOUR_OH_ONE_K_CONFIG.limits.catchUp
        : FOUR_OH_ONE_K_CONFIG.limits.contribution
    )

    // Calculate employer match
    const effectiveMatchRate = Math.min(contributionPercent, employerMatchLimit)
    const annualMatch = Math.min(
      (annualSalary * effectiveMatchRate * employerMatchPercent) / 10000, // Divide by 10000 because both percentages are in whole numbers
      annualContribution * (employerMatchPercent / 100)
    )

    // Calculate total annual contribution
    const totalAnnualContribution = annualContribution + annualMatch

    // Calculate future value using the compound interest formula
    const r = expectedReturn / 100
    const t = yearsToRetirement
    
    const futureValue = currentBalance * Math.pow(1 + r, t) + 
                       totalAnnualContribution * ((Math.pow(1 + r, t) - 1) / r)

    // Calculate totals
    const totalContributions = annualContribution * yearsToRetirement
    const totalEmployerMatch = annualMatch * yearsToRetirement
    const totalEarnings = futureValue - totalContributions - totalEmployerMatch
    const effectiveRate = (Math.pow(futureValue / currentBalance, 1/yearsToRetirement) - 1) * 100

    return {
      futureValue,
      totalContributions,
      totalEmployerMatch,
      totalEarnings,
      effectiveRate
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
401(k) Projection (${FOUR_OH_ONE_K_CONFIG.year}):
----------------------------------------
Future Value: ${formatter.format(result.futureValue)}

Contribution Analysis:
-------------------
Your Contributions: ${formatter.format(result.totalContributions)}
Employer Match: ${formatter.format(result.totalEmployerMatch)}
Investment Earnings: ${formatter.format(result.totalEarnings)}

Summary:
-------
Effective Annual Return: ${result.effectiveRate.toFixed(2)}%

Note: Projections are estimates based on constant returns.
Actual results will vary based on market performance.
    `.trim()
  }
} 