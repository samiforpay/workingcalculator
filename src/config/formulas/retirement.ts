import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const retirementFormulas: FormulaConfig = {
  'retirement-savings': {
    name: 'Retirement Savings Calculator',
    description: 'Calculate how much you need to save for retirement and track your progress',
    variables: {
      currentAge: {
        label: 'Current Age',
        type: 'number',
        defaultValue: 30,
        min: 18,
        max: 100,
        helpText: 'Your current age in years'
      },
      retirementAge: {
        label: 'Retirement Age',
        type: 'number',
        defaultValue: 65,
        min: 50,
        max: 100,
        helpText: 'Age at which you plan to retire'
      },
      currentSavings: {
        label: 'Current Retirement Savings',
        type: 'currency',
        defaultValue: 50000,
        min: 0,
        helpText: 'Total amount currently saved for retirement'
      },
      monthlySavings: {
        label: 'Monthly Savings',
        type: 'currency',
        defaultValue: 500,
        min: 0,
        helpText: 'Amount you save each month for retirement'
      },
      expectedReturn: {
        label: 'Expected Annual Return',
        type: 'percentage',
        defaultValue: 7,
        min: 0,
        max: 20,
        step: 0.1,
        helpText: 'Expected annual investment return (7-8% is a common long-term average)'
      },
      desiredIncome: {
        label: 'Desired Annual Retirement Income',
        type: 'currency',
        defaultValue: 60000,
        min: 0,
        helpText: 'How much annual income you want in retirement'
      },
      socialSecurity: {
        label: 'Expected Monthly Social Security',
        type: 'currency',
        defaultValue: 1500,
        min: 0,
        helpText: 'Expected monthly Social Security benefit'
      },
      inflationRate: {
        label: 'Expected Inflation Rate',
        type: 'percentage',
        defaultValue: 2.5,
        min: 0,
        max: 10,
        step: 0.1,
        helpText: 'Expected annual inflation rate (historically around 2-3%)'
      }
    },
    calculate: (inputs) => {
      const {
        currentAge,
        retirementAge,
        currentSavings,
        monthlySavings,
        expectedReturn,
        desiredIncome,
        socialSecurity,
        inflationRate
      } = inputs

      const yearsToRetirement = retirementAge - currentAge
      const monthlyReturn = (1 + expectedReturn / 100) ** (1/12) - 1
      const monthsToRetirement = yearsToRetirement * 12

      // Calculate future value of current savings
      const futureValueCurrentSavings = currentSavings * 
        (1 + expectedReturn / 100) ** yearsToRetirement

      // Calculate future value of monthly contributions
      const futureValueContributions = monthlySavings * 
        ((1 + monthlyReturn) ** monthsToRetirement - 1) / monthlyReturn

      // Calculate total projected savings
      const totalSavings = futureValueCurrentSavings + futureValueContributions

      // Calculate inflation-adjusted income needs
      const inflationAdjustedIncome = desiredIncome * 
        (1 + inflationRate / 100) ** yearsToRetirement

      // Calculate annual Social Security benefit with inflation
      const annualSocialSecurity = socialSecurity * 12 * 
        (1 + inflationRate / 100) ** yearsToRetirement

      // Calculate required savings using 4% rule
      const requiredSavings = (inflationAdjustedIncome - annualSocialSecurity) * 25

      // Calculate any shortfall
      const shortfall = Math.max(0, requiredSavings - totalSavings)

      // Calculate required additional monthly savings
      const additionalMonthlySavingsNeeded = shortfall > 0 
        ? (shortfall * monthlyReturn) / ((1 + monthlyReturn) ** monthsToRetirement - 1)
        : 0

      return {
        projectedSavings: totalSavings,
        requiredSavings,
        shortfall,
        additionalMonthlySavingsNeeded,
        inflationAdjustedIncome,
        annualSocialSecurity,
        monthlyIncomeAvailable: (totalSavings * 0.04 + annualSocialSecurity) / 12
      }
    },
    formatResult: (result) => {
      const {
        projectedSavings,
        requiredSavings,
        shortfall,
        additionalMonthlySavingsNeeded,
        inflationAdjustedIncome,
        annualSocialSecurity,
        monthlyIncomeAvailable
      } = result

      return `Projected Savings at Retirement: ${formatCurrency(projectedSavings)}
Required Savings: ${formatCurrency(requiredSavings)}
Inflation-Adjusted Annual Income Need: ${formatCurrency(inflationAdjustedIncome)}
Annual Social Security Benefit: ${formatCurrency(annualSocialSecurity)}
Monthly Income Available: ${formatCurrency(monthlyIncomeAvailable)}
${shortfall > 0 
  ? `Shortfall: ${formatCurrency(shortfall)}
Additional Monthly Savings Needed: ${formatCurrency(additionalMonthlySavingsNeeded)}`
  : 'You are on track to meet your retirement goals!'}`
    }
  }
} 