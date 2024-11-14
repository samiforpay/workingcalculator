import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

interface RetirementResult {
  projectedSavings: number
  requiredSavings: number
  inflationAdjustedIncome: number
  annualSocialSecurity: number
  monthlyIncomeAvailable: number
  savingsRate: number
  shortfall: number
  additionalMonthlySavingsNeeded: number
}

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
        max: 80,
        helpText: 'Your current age'
      },
      retirementAge: {
        label: 'Retirement Age',
        type: 'number',
        defaultValue: 65,
        min: 50,
        max: 85,
        helpText: 'Age you plan to retire'
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
        helpText: 'Amount you save for retirement each month'
      },
      annualIncome: {
        label: 'Current Annual Income',
        type: 'currency',
        defaultValue: 75000,
        min: 0,
        helpText: 'Your current annual income'
      },
      incomeNeeded: {
        label: 'Income Needed in Retirement',
        type: 'percentage',
        defaultValue: 80,
        min: 0,
        max: 100,
        helpText: 'Percentage of current income needed in retirement'
      },
      returnRate: {
        label: 'Expected Return Rate',
        type: 'percentage',
        defaultValue: 6,
        min: -20,
        max: 30,
        step: 0.1,
        helpText: 'Expected annual return on investments'
      },
      inflationRate: {
        label: 'Expected Inflation Rate',
        type: 'percentage',
        defaultValue: 2.5,
        min: 0,
        max: 10,
        step: 0.1,
        helpText: 'Expected annual inflation rate'
      }
    },
    calculate: (inputs): RetirementResult => {
      const {
        currentAge,
        retirementAge,
        currentSavings,
        monthlySavings,
        annualIncome,
        incomeNeeded,
        returnRate,
        inflationRate
      } = inputs

      const yearsToRetirement = retirementAge - currentAge
      const monthlyRate = returnRate / 100 / 12
      const inflationAdjustedReturn = (1 + returnRate / 100) / (1 + inflationRate / 100) - 1

      // Calculate future value of current savings
      const futureValueCurrentSavings = currentSavings * 
        Math.pow(1 + returnRate / 100, yearsToRetirement)

      // Calculate future value of monthly contributions
      const futureValueContributions = monthlySavings * 
        ((Math.pow(1 + monthlyRate, yearsToRetirement * 12) - 1) / monthlyRate)

      const projectedSavings = futureValueCurrentSavings + futureValueContributions

      // Calculate required savings
      const inflationAdjustedIncome = annualIncome * 
        Math.pow(1 + inflationRate / 100, yearsToRetirement) * 
        (incomeNeeded / 100)

      // Estimate Social Security (simplified)
      const annualSocialSecurity = annualIncome * 0.4

      const requiredSavings = (inflationAdjustedIncome - annualSocialSecurity) / 
        (inflationAdjustedReturn)

      const shortfall = Math.max(0, requiredSavings - projectedSavings)
      const monthlyIncomeAvailable = (projectedSavings * inflationAdjustedReturn) / 12
      const savingsRate = (monthlySavings * 12) / annualIncome * 100

      // Calculate additional savings needed
      const additionalMonthlySavingsNeeded = shortfall > 0
        ? (shortfall * monthlyRate) / 
          (Math.pow(1 + monthlyRate, yearsToRetirement * 12) - 1)
        : 0

      return {
        projectedSavings,
        requiredSavings,
        inflationAdjustedIncome,
        annualSocialSecurity,
        monthlyIncomeAvailable,
        savingsRate,
        shortfall,
        additionalMonthlySavingsNeeded
      }
    },
    formatResult: (result: RetirementResult) => {
      const {
        projectedSavings,
        requiredSavings,
        inflationAdjustedIncome,
        annualSocialSecurity,
        monthlyIncomeAvailable,
        savingsRate,
        shortfall,
        additionalMonthlySavingsNeeded
      } = result

      return `Projected Savings at Retirement: ${formatCurrency(projectedSavings)}
Required Savings: ${formatCurrency(requiredSavings)}
Inflation-Adjusted Annual Income Need: ${formatCurrency(inflationAdjustedIncome)}
Annual Social Security Benefit: ${formatCurrency(annualSocialSecurity)}
Monthly Income Available: ${formatCurrency(monthlyIncomeAvailable)}
Current Savings Rate: ${formatPercentage(savingsRate)}
${shortfall > 0 
  ? `Shortfall: ${formatCurrency(shortfall)}
Additional Monthly Savings Needed: ${formatCurrency(additionalMonthlySavingsNeeded)}`
  : 'You are on track to meet your retirement goals!'}`
    }
  }
} 