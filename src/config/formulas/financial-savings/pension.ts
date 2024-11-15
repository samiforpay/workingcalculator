import type { Formula } from '@/config/formulas/types'



interface PensionResult extends Record<string, number> {

  pensionAmount: number

  totalContributions: number

  averageSalary: number

  replacementRatio: number

  [key: string]: number

}



// Make rates and limits configurable for easy updates

const PENSION_CONFIG = {

  year: 2023,

  defaults: {

    yearsContributed: 25,

    accrualRate: 1.5,

    currentSalary: 75000,

    salaryGrowth: 2.5,

    contributionRate: 5,

    averagingYears: 5 // Final average salary period

  },

  limits: {

    maxYears: 50,

    minYears: 1,

    maxRate: 10.0,      // Increased from 3.0% to 10.0% for more flexibility

    minRate: 0.1,       // Keep minimum accrual rate at 0.1%

    maxSalary: 100000000000, // Increased to 100 billion like other calculators

    minSalary: 0,

    maxGrowth: 100,     // Increased from 10% to 100% for extreme scenarios

    minGrowth: 0        // Keep minimum growth at 0%

  },

  thresholds: {

    earlyRetirement: 55,

    normalRetirement: 65,

    maxRetirement: 75

  }

}



export const pensionCalculator: Formula<PensionResult> = {

  name: 'Pension Calculator',

  description: '',

  longDescription: `
    <p>Understand your retirement benefits better with our Pension Calculator. This pension payout calculator provides estimates on how much you can expect from your pension upon retirement. Use the pension benefits estimator to evaluate different scenarios based on contributions and years of service, ensuring you're prepared for a secure retirement.</p>
    <p>Calculations include:</p>
    <ul>
      <li>Monthly pension payment estimates</li>
      <li>Final average salary calculations</li>
      <li>Years of service multiplier effects</li>
      <li>Early retirement impact analysis</li>
      <li>Survivor benefit options</li>
    </ul>
    <p>Understanding your pension benefits helps you better plan for retirement and make informed decisions about timing and benefit options.</p>
  `,

  variables: {

    yearsContributed: {

      label: 'Years of Service',

      type: 'number',

      defaultValue: PENSION_CONFIG.defaults.yearsContributed,

      min: PENSION_CONFIG.limits.minYears,

      max: PENSION_CONFIG.limits.maxYears,

      step: 1,

      helpText: 'Total number of years worked and contributed to pension'

    },

    accrualRate: {

      label: 'Annual Accrual Rate (%)',

      type: 'percentage',

      defaultValue: PENSION_CONFIG.defaults.accrualRate,

      min: PENSION_CONFIG.limits.minRate,

      max: PENSION_CONFIG.limits.maxRate,

      step: 0.1,

      helpText: 'Percentage of salary earned as pension per year of service'

    },

    currentSalary: {

      label: 'Current Annual Salary',

      type: 'currency',

      defaultValue: PENSION_CONFIG.defaults.currentSalary,

      min: PENSION_CONFIG.limits.minSalary,

      max: PENSION_CONFIG.limits.maxSalary,

      helpText: 'Your current annual salary'

    },

    salaryGrowth: {

      label: 'Expected Annual Salary Growth (%)',

      type: 'percentage',

      defaultValue: PENSION_CONFIG.defaults.salaryGrowth,

      min: PENSION_CONFIG.limits.minGrowth,

      max: PENSION_CONFIG.limits.maxGrowth,

      step: 0.1,

      helpText: 'Expected annual salary increase rate'

    },

    contributionRate: {

      label: 'Employee Contribution Rate (%)',

      type: 'percentage',

      defaultValue: PENSION_CONFIG.defaults.contributionRate,

      min: 0,

      max: 20,

      step: 0.5,

      helpText: 'Percentage of salary contributed to pension'

    },

    averagingYears: {

      label: 'Final Average Salary Years',

      type: 'number',

      defaultValue: PENSION_CONFIG.defaults.averagingYears,

      min: 1,

      max: 10,

      step: 1,

      helpText: 'Number of years used to calculate final average salary'

    }

  },

  calculate: (inputs) => {

    const {

      yearsContributed,

      accrualRate,

      currentSalary,

      salaryGrowth,

      contributionRate,

      averagingYears

    } = inputs



    // Calculate salary progression for averaging period

    const salaries = []

    let projectedSalary = currentSalary

    for (let i = 0; i < averagingYears; i++) {

      salaries.push(projectedSalary)

      projectedSalary *= (1 + salaryGrowth / 100)

    }



    // Calculate average salary

    const averageSalary = salaries.reduce((sum, salary) => sum + salary, 0) / averagingYears



    // Calculate annual pension amount

    const pensionAmount = (yearsContributed * (accrualRate / 100) * averageSalary)



    // Calculate total contributions

    const totalContributions = currentSalary * (contributionRate / 100) * yearsContributed



    // Calculate replacement ratio (pension as % of final salary)

    const replacementRatio = (pensionAmount / projectedSalary) * 100



    return {

      pensionAmount,

      totalContributions,

      averageSalary,

      replacementRatio,

      yearsContributed,

      finalSalary: projectedSalary,

      monthlyPension: pensionAmount / 12

    }

  },

  formatResult: (result) => {

    const formatter = new Intl.NumberFormat('en-US', { 

      style: 'currency', 

      currency: 'USD',

      maximumFractionDigits: 0

    })



    return `

Pension Benefit Analysis:

----------------------

Annual Pension: ${formatter.format(result.pensionAmount)}

Monthly Pension: ${formatter.format(result.monthlyPension)}



Salary Information:

----------------

Final Average Salary: ${formatter.format(result.averageSalary)}

Final Year Salary: ${formatter.format(result.finalSalary)}

Income Replacement: ${result.replacementRatio.toFixed(1)}%



Contributions:

-----------

Years of Service: ${result.yearsContributed}

Total Contributions: ${formatter.format(result.totalContributions)}



Note: This is an estimate based on current salary and growth projections.

Actual pension benefits may vary based on plan specifics and future changes.

    `.trim()

  }

} 
