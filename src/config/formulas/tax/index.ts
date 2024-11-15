import { incomeTaxCalculator } from './income'
import { capitalGainsTaxCalculator } from './capital-gains'
import { wealthTaxCalculator } from './wealth'
import { salesTaxCalculator } from './sales'
import { propertyTaxCalculator } from './property'
import { retirementContributionsCalculator } from './retirement'
import { quarterlyTaxCalculator } from './quarterly'
import { fourOhOneKCalculator } from './401k'

export const taxFormulas = {
  income: incomeTaxCalculator,
  'capital-gains': capitalGainsTaxCalculator,
  wealth: wealthTaxCalculator,
  sales: salesTaxCalculator,
  property: propertyTaxCalculator,
  retirement: retirementContributionsCalculator,
  quarterly: quarterlyTaxCalculator,
  '401k': fourOhOneKCalculator
} as const 