import type { Formula } from '@/config/formulas/types'

interface QuarterlyTaxResult extends Record<string, number> {
  quarterlyPayment: number
  totalTax: number
  effectiveRate: number
  [key: string]: number
}

// Make tax rates and dates configurable for easy updates
const QUARTERLY_TAX_CONFIG = {
  year: 2023,
  dueDates: {
    q1: 'April 18, 2023',
    q2: 'June 15, 2023',
    q3: 'September 15, 2023',
    q4: 'January 15, 2024'
  },
  brackets: [
    { rate: 0.37, min: 578125, name: '37% Bracket' },
    { rate: 0.35, min: 231250, name: '35% Bracket' },
    { rate: 0.32, min: 182100, name: '32% Bracket' },
    { rate: 0.24, min: 95375, name: '24% Bracket' },
    { rate: 0.22, min: 44725, name: '22% Bracket' },
    { rate: 0.12, min: 11000, name: '12% Bracket' },
    { rate: 0.10, min: 0, name: '10% Bracket' }
  ],
  selfEmploymentTax: 0.153, // 15.3% SE tax
  standardDeduction: {
    single: 13850,
    married: 27700
  },
  safeHarborPercentage: 0.90, // Need to pay 90% of tax liability or 100% of prior year
  quarterlyPercentages: {
    q1: 0.25,  // 25% due for Q1
    q2: 0.25,  // 25% due for Q2
    q3: 0.25,  // 25% due for Q3
    q4: 0.25   // 25% due for Q4
  }
}

export const quarterlyTaxCalculator: Formula<QuarterlyTaxResult> = {
  name: 'Quarterly Tax Calculator',
  description: '',
  longDescription: `
    <p>Freelancers and business owners can simplify their finances with our Quarterly Tax Calculator. This quarterly estimated tax payment calculator helps you determine what you need to pay each quarter based on income projections. Learn how to calculate quarterly taxes effectively with this free quarterly tax estimator tool.</p>
    <p>Calculator includes:</p>
    <ul>
      <li>Estimated tax payment calculations</li>
      <li>Self-employment tax estimation</li>
      <li>Safe harbor payment analysis</li>
      <li>Payment deadline tracking</li>
      <li>Annual tax projection</li>
    </ul>
    <p>Stay compliant with IRS requirements and manage your cash flow effectively by planning your quarterly tax payments.</p>
  `,
  variables: {
    projectedIncome: {
      label: 'Projected Annual Income',
      type: 'currency',
      defaultValue: 100000,
      min: 0,
      step: 1000,
      helpText: 'Expected total income for the year'
    },
    selfEmploymentIncome: {
      label: 'Self-Employment Income',
      type: 'currency',
      defaultValue: 80000,
      min: 0,
      step: 1000,
      helpText: 'Portion of income from self-employment'
    },
    otherIncome: {
      label: 'Other Income',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Interest, dividends, rental income, etc.'
    },
    estimatedDeductions: {
      label: 'Estimated Deductions',
      type: 'currency',
      defaultValue: QUARTERLY_TAX_CONFIG.standardDeduction.single,
      min: 0,
      step: 500,
      helpText: 'Total estimated deductions including business expenses'
    },
    filingStatus: {
      label: 'Filing Status',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 2,
      step: 1,
      helpText: '1 for Single, 2 for Married Filing Jointly'
    },
    priorYearTax: {
      label: 'Prior Year Tax',
      type: 'currency',
      defaultValue: 20000,
      min: 0,
      step: 100,
      helpText: 'Total tax liability from previous year'
    }
  },
  calculate: (inputs) => {
    const { 
      projectedIncome, 
      selfEmploymentIncome, 
      otherIncome, 
      estimatedDeductions,
      filingStatus,
      priorYearTax 
    } = inputs

    // Calculate self-employment tax
    const selfEmploymentTaxableIncome = selfEmploymentIncome * 0.9235 // 92.35% of SE income is taxable
    const selfEmploymentTax = selfEmploymentTaxableIncome * QUARTERLY_TAX_CONFIG.selfEmploymentTax
    
    // Calculate taxable income
    const totalIncome = projectedIncome + otherIncome
    const taxableIncome = Math.max(0, totalIncome - estimatedDeductions)
    
    // Calculate income tax using brackets
    let incomeTax = 0
    let remainingIncome = taxableIncome
    
    for (const bracket of QUARTERLY_TAX_CONFIG.brackets) {
      if (remainingIncome > bracket.min) {
        const taxableAtThisRate = remainingIncome - bracket.min
        incomeTax += taxableAtThisRate * bracket.rate
        remainingIncome = bracket.min
      }
    }
    
    // Calculate total tax
    const totalTax = incomeTax + selfEmploymentTax
    
    // Calculate required payments based on safe harbor rule
    const requiredTax = Math.max(
      totalTax * QUARTERLY_TAX_CONFIG.safeHarborPercentage,
      priorYearTax
    )
    
    // Calculate quarterly payments
    const q1Payment = requiredTax * QUARTERLY_TAX_CONFIG.quarterlyPercentages.q1
    const q2Payment = requiredTax * QUARTERLY_TAX_CONFIG.quarterlyPercentages.q2
    const q3Payment = requiredTax * QUARTERLY_TAX_CONFIG.quarterlyPercentages.q3
    const q4Payment = requiredTax * QUARTERLY_TAX_CONFIG.quarterlyPercentages.q4
    
    // Calculate effective tax rate
    const effectiveRate = (totalTax / totalIncome) * 100

    return {
      q1Payment,
      q2Payment,
      q3Payment,
      q4Payment,
      totalTax,
      effectiveRate,
      incomeTax,
      selfEmploymentTax,
      requiredTax
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Quarterly Tax Estimates (${QUARTERLY_TAX_CONFIG.year}):
----------------------------------------
Quarterly Payments:
----------------
Q1 (Due ${QUARTERLY_TAX_CONFIG.dueDates.q1}): ${formatter.format(result.q1Payment)}
Q2 (Due ${QUARTERLY_TAX_CONFIG.dueDates.q2}): ${formatter.format(result.q2Payment)}
Q3 (Due ${QUARTERLY_TAX_CONFIG.dueDates.q3}): ${formatter.format(result.q3Payment)}
Q4 (Due ${QUARTERLY_TAX_CONFIG.dueDates.q4}): ${formatter.format(result.q4Payment)}

Tax Breakdown:
------------
Income Tax: ${formatter.format(result.incomeTax)}
Self-Employment Tax: ${formatter.format(result.selfEmploymentTax)}
Total Estimated Tax: ${formatter.format(result.totalTax)}
Required Safe Harbor: ${formatter.format(result.requiredTax)}

Summary:
-------
Effective Tax Rate: ${result.effectiveRate.toFixed(1)}%

Note: These are estimates only. Actual tax liability may vary.
Due dates and rates shown for ${QUARTERLY_TAX_CONFIG.year}.
    `.trim()
  }
} 