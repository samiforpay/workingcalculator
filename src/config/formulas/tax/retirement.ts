import type { Formula } from '@/config/formulas/types'

interface RetirementTaxResult extends Record<string, number> {
  totalContributions: number
  taxSavings: number
  effectiveTaxRate: number
  annualTaxSavings: number
  monthlyTaxSavings: number
  [key: string]: number
}

// Make tax rates and limits configurable for easy updates
const RETIREMENT_TAX_CONFIG = {
  year: 2023,
  limits: {
    traditional401k: 22500,    // 401(k) contribution limit
    traditionalIRA: 6500,      // Traditional IRA contribution limit
    catchUp401k: 7500,         // 401(k) catch-up contribution (age 50+)
    catchUpIRA: 1000,          // IRA catch-up contribution (age 50+)
    rothIRAPhaseout: {         // Roth IRA income phaseout ranges
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
  taxBrackets: [
    { rate: 0.37, min: 578125, name: '37% Bracket' },
    { rate: 0.35, min: 231250, name: '35% Bracket' },
    { rate: 0.32, min: 182100, name: '32% Bracket' },
    { rate: 0.24, min: 95375, name: '24% Bracket' },
    { rate: 0.22, min: 44725, name: '22% Bracket' },
    { rate: 0.12, min: 11000, name: '12% Bracket' },
    { rate: 0.10, min: 0, name: '10% Bracket' }
  ]
}

export const retirementContributionsCalculator: Formula<RetirementTaxResult> = {
  name: 'Retirement Contributions Calculator',
  description: '',
  longDescription: `
    <p>Planning for retirement? Our Retirement Contributions Calculator will guide you on how much you should contribute to your 401(k) or other retirement accounts. Use this free retirement savings contribution estimator to ensure you're on track for a comfortable retirement.</p>
    <p>Features included:</p>
    <ul>
      <li>401(k) contribution analysis</li>
      <li>IRA contribution limits</li>
      <li>Catch-up contribution eligibility</li>
      <li>Tax savings estimation</li>
      <li>Multiple account optimization</li>
    </ul>
    <p>Make informed decisions about your retirement savings strategy and understand how to maximize available tax benefits.</p>
  `,
  variables: {
    annualIncome: {
      label: 'Annual Income',
      type: 'currency',
      defaultValue: 75000,
      min: 0,
      step: 1000,
      helpText: 'Your total annual income before taxes'
    },
    traditional401k: {
      label: '401(k) Contribution',
      type: 'currency',
      defaultValue: 10000,
      min: 0,
      max: RETIREMENT_TAX_CONFIG.limits.traditional401k,
      step: 500,
      helpText: `Annual 401(k) contribution (limit: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(RETIREMENT_TAX_CONFIG.limits.traditional401k)})`
    },
    traditionalIRA: {
      label: 'Traditional IRA Contribution',
      type: 'currency',
      defaultValue: 3000,
      min: 0,
      max: RETIREMENT_TAX_CONFIG.limits.traditionalIRA,
      step: 500,
      helpText: `Annual Traditional IRA contribution (limit: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(RETIREMENT_TAX_CONFIG.limits.traditionalIRA)})`
    },
    age: {
      label: 'Your Age',
      type: 'number',
      defaultValue: 35,
      min: 18,
      max: 99,
      step: 1,
      helpText: 'Your current age (affects catch-up contribution limits)'
    },
    filingStatus: {
      label: 'Filing Status',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 2,
      step: 1,
      helpText: '1 for Single, 2 for Married Filing Jointly'
    }
  },
  calculate: (inputs) => {
    const { annualIncome, traditional401k, traditionalIRA, age, filingStatus } = inputs
    
    // Calculate total contributions (including catch-up if eligible)
    let maxContribution401k = RETIREMENT_TAX_CONFIG.limits.traditional401k
    let maxContributionIRA = RETIREMENT_TAX_CONFIG.limits.traditionalIRA
    
    if (age >= 50) {
      maxContribution401k += RETIREMENT_TAX_CONFIG.limits.catchUp401k
      maxContributionIRA += RETIREMENT_TAX_CONFIG.limits.catchUpIRA
    }
    
    const validContribution401k = Math.min(traditional401k, maxContribution401k)
    const validContributionIRA = Math.min(traditionalIRA, maxContributionIRA)
    const totalContributions = validContribution401k + validContributionIRA
    
    // Calculate tax savings based on marginal tax rates
    let taxableIncome = annualIncome
    let taxSavings = 0
    let remainingContribution = totalContributions

    for (const bracket of RETIREMENT_TAX_CONFIG.taxBrackets) {
      if (taxableIncome > bracket.min && remainingContribution > 0) {
        const amountInBracket = Math.min(
          remainingContribution,
          taxableIncome - bracket.min
        )
        taxSavings += amountInBracket * bracket.rate
        remainingContribution -= amountInBracket
        if (remainingContribution <= 0) break
      }
    }

    // Calculate effective rates
    const effectiveTaxRate = (taxSavings / totalContributions) * 100
    const monthlyTaxSavings = taxSavings / 12

    return {
      totalContributions,
      taxSavings,
      effectiveTaxRate,
      annualTaxSavings: taxSavings,
      monthlyTaxSavings,
      validContribution401k,
      validContributionIRA
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    return `
Retirement Contributions Analysis (${RETIREMENT_TAX_CONFIG.year}):
----------------------------------------
Contribution Summary:
------------------
401(k) Contribution: ${formatter.format(result.validContribution401k)}
IRA Contribution: ${formatter.format(result.validContributionIRA)}
Total Contributions: ${formatter.format(result.totalContributions)}

Tax Benefits:
-----------
Annual Tax Savings: ${formatter.format(result.annualTaxSavings)}
Monthly Tax Savings: ${formatter.format(result.monthlyTaxSavings)}
Effective Tax Rate: ${result.effectiveTaxRate.toFixed(1)}%

Note: Tax brackets and contribution limits shown for ${RETIREMENT_TAX_CONFIG.year}. 
Limits may be adjusted annually for inflation.
    `.trim()
  }
} 