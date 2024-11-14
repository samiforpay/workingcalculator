import { roiFormulas } from './roi'
import { taxFormulas } from './tax'
import { investmentFormulas } from './investment'
import { financialFormulas } from './financial'
import { businessFormulas } from './business'
import { emergencyFormulas } from './emergency'
import { debtFormulas } from './debt'
import { mortgageFormulas } from './mortgage'

// Combine all calculator formulas with proper paths
export const calculatorFormulas = {
  'roi/general': roiFormulas.general,
  'roi/real-estate': roiFormulas.realEstate,
  'roi/marketing': roiFormulas.marketing,
  'roi/business': roiFormulas.business,
  
  'tax/income': taxFormulas.income,
  'tax/capital-gains': taxFormulas.capitalGains,
  
  'investment/returns': investmentFormulas.returns,
  'investment/portfolio': investmentFormulas.portfolio,
  
  'financial/compound': financialFormulas.compound,
  'financial/inflation': financialFormulas.inflation,
  'financial/savings-goal': financialFormulas['savings-goal'],
  
  'business/break-even': businessFormulas.breakEven,
  
  'emergency/fund': emergencyFormulas.fund,
  
  'debt/payoff': debtFormulas.payoff,
  'debt/credit-card': debtFormulas.creditCard,
  
  'mortgage/basic': mortgageFormulas.basic,
  'mortgage/refinance': mortgageFormulas.refinance
} as const

export type CalculatorPath = keyof typeof calculatorFormulas