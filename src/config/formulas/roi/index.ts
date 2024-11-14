import { generalRoiCalculator } from './general'
import { realEstateRoiCalculator } from './real-estate'
import { marketingRoiCalculator } from './marketing'
import { businessRoiCalculator } from './business'

export const roiFormulas = {
  'roi/general': generalRoiCalculator,
  'roi/real-estate': realEstateRoiCalculator,
  'roi/marketing': marketingRoiCalculator,
  'roi/business': businessRoiCalculator
} as const