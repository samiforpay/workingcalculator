import type { Formula } from '@/config/formulas/types'

interface RetirementSavingsResult {
  [key: string]: number
  totalSavings: number
  monthlyIncome: number
  savingsShortfall: number
  requiredMonthlyContribution: number
  yearsToRetirement: number
  retirementIncome: number
  savingsRate: number
}

export const retirementSavingsCalculator: Formula<RetirementSavingsResult> = {
  name: 'Retirement Savings Calculator',
  description: 'Plan your retirement savings and calculate required contributions',
  variables: {
    currentAge: {
      label: 'Current Age',
      type: 'number',
      defaultValue: 30,
      min: 18,
      max: 100,
      step: 1,
      helpText: 'Your current age'
    },
    retirementAge: {
      label: 'Retirement Age',
      type: 'number',
      defaultValue: 65,
      min: 50,
      max: 100,
      step: 1,
      helpText: 'Age at which you plan to retire'
    },
    currentSavings: {
      label: 'Current Savings',
      type: 'currency',
      defaultValue: 50000,
      min: 0,
      step: 1000,
      helpText: 'Total amount currently saved for retirement'
    },
    monthlyContribution: {
      label: 'Monthly Contribution',
      type: 'currency',
      defaultValue: 500,
      min: 0,
      step: 100,
      helpText: 'Amount you save each month'
    },
    expectedReturn: {
      label: 'Expected Annual Return',
      type: 'percentage',
      defaultValue: 7,
      min: -100,
      max: 100,
      step: 0.1,
      helpText: 'Expected annual investment return rate'
    },
    desiredIncome: {
      label: 'Desired Retirement Income',
      type: 'currency',
      defaultValue: 60000,
      min: 0,
      step: 1000,
      helpText: 'Annual income needed in retirement'
    },
    inflationRate: {
      label: 'Inflation Rate',
      type: 'percentage',
      defaultValue: 2.5,
      min: 0,
      max: 20,
      step: 0.1,
      helpText: 'Expected annual inflation rate'
    },
    lifeExpectancy: {
      label: 'Life Expectancy',
      type: 'number',
      defaultValue: 90,
      min: 50,
      max: 120,
      step: 1,
      helpText: 'Age until which you need retirement income'
    }
  },
  calculate: (inputs) => {
    const {
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      expectedReturn,
      desiredIncome,
      inflationRate,
      lifeExpectancy
    } = inputs

    const yearsToRetirement = retirementAge - currentAge
    const retirementDuration = lifeExpectancy - retirementAge

    // Adjust return rate for inflation
    const realReturnRate = (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1
    const monthlyRate = Math.pow(1 + realReturnRate, 1/12) - 1

    // Calculate future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + realReturnRate, yearsToRetirement)

    // Calculate future value of monthly contributions
    const monthlyContributionFV = monthlyContribution * 
      ((Math.pow(1 + monthlyRate, yearsToRetirement * 12) - 1) / monthlyRate) * 
      (1 + monthlyRate)

    const totalSavings = futureValueCurrentSavings + monthlyContributionFV

    // Calculate required savings for retirement
    const requiredSavings = desiredIncome * 
      ((1 - Math.pow(1 + inflationRate/100, -retirementDuration)) / (inflationRate/100))

    const savingsShortfall = Math.max(0, requiredSavings - totalSavings)

    // Calculate required monthly contribution to meet goal
    const requiredMonthlyContribution = 
      (savingsShortfall * monthlyRate) / 
      ((Math.pow(1 + monthlyRate, yearsToRetirement * 12) - 1) * (1 + monthlyRate))

    // Calculate monthly retirement income
    const monthlyIncome = (totalSavings * (realReturnRate / 12)) / 
      (1 - Math.pow(1 + realReturnRate / 12, -retirementDuration * 12))

    // Calculate savings rate
    const annualIncome = monthlyContribution * 12
    const savingsRate = (monthlyContribution * 12) / (annualIncome || 1) * 100

    return {
      totalSavings,
      monthlyIncome,
      savingsShortfall,
      requiredMonthlyContribution,
      yearsToRetirement,
      retirementIncome: monthlyIncome * 12,
      savingsRate
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const {
      totalSavings,
      monthlyIncome,
      savingsShortfall,
      requiredMonthlyContribution,
      yearsToRetirement,
      retirementIncome,
      savingsRate
    } = result

    return `
Retirement Savings Analysis:
-------------------------
Years to Retirement: ${yearsToRetirement} years
Projected Total Savings: ${formatter.format(totalSavings)}

Monthly Income in Retirement: ${formatter.format(monthlyIncome)}
Annual Retirement Income: ${formatter.format(retirementIncome)}

Savings Gap:
----------
Shortfall: ${formatter.format(savingsShortfall)}
Required Additional Monthly Contribution: ${formatter.format(requiredMonthlyContribution)}

Current Status:
-------------
Current Savings Rate: ${savingsRate.toFixed(1)}%
    `.trim()
  }
} 