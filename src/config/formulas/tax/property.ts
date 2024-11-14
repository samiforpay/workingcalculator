import type { Formula } from '@/config/formulas/types'

interface PropertyTaxResult extends Record<string, number> {
  annualTax: number
  monthlyTax: number
  effectiveRate: number
  assessedValue: number
  exemptionAmount: number
  [key: string]: number
}

// Make tax rates configurable for easy updates
const PROPERTY_TAX_CONFIG = {
  year: 2023,
  defaultRate: 1.25, // Base property tax rate per $100 of assessed value
  assessmentRatio: 0.80, // Assessed value is typically 80% of market value
  exemptions: {
    homestead: 25000,    // Homestead exemption
    senior: 15000,       // Senior citizen exemption
    veteran: 10000,      // Veteran exemption
    disabled: 20000      // Disabled person exemption
  },
  specialAssessments: {
    schoolDistrict: 0.50,  // Additional school district tax
    municipality: 0.25,    // Municipal services tax
    county: 0.35          // County services tax
  }
}

export const propertyTaxCalculator: Formula<PropertyTaxResult> = {
  name: 'Property Tax Calculator',
  description: `Calculate your ${PROPERTY_TAX_CONFIG.year} property taxes based on local rates`,
  variables: {
    marketValue: {
      label: 'Property Market Value',
      type: 'currency',
      defaultValue: 300000,
      min: 0,
      step: 1000,
      helpText: 'Current market value of your property'
    },
    baseRate: {
      label: 'Base Tax Rate (per $100)',
      type: 'percentage',
      defaultValue: PROPERTY_TAX_CONFIG.defaultRate,
      min: 0,
      max: 5,
      step: 0.01,
      helpText: 'Base property tax rate per $100 of assessed value'
    },
    additionalRates: {
      label: 'Additional Tax Rates (per $100)',
      type: 'percentage',
      defaultValue: PROPERTY_TAX_CONFIG.specialAssessments.schoolDistrict + 
                   PROPERTY_TAX_CONFIG.specialAssessments.municipality +
                   PROPERTY_TAX_CONFIG.specialAssessments.county,
      min: 0,
      max: 5,
      step: 0.01,
      helpText: 'Additional tax rates (school, municipal, etc.)'
    },
    exemptionAmount: {
      label: 'Total Exemptions',
      type: 'currency',
      defaultValue: PROPERTY_TAX_CONFIG.exemptions.homestead,
      min: 0,
      step: 1000,
      helpText: 'Total value of all applicable exemptions'
    }
  },
  calculate: (inputs) => {
    const { marketValue, baseRate, additionalRates, exemptionAmount } = inputs
    
    // Calculate assessed value
    const assessedValue = marketValue * PROPERTY_TAX_CONFIG.assessmentRatio
    
    // Apply exemptions
    const taxableValue = Math.max(0, assessedValue - exemptionAmount)
    
    // Calculate total tax rate per $100
    const totalRate = baseRate + additionalRates
    
    // Calculate annual tax
    const annualTax = (taxableValue / 100) * totalRate
    
    // Calculate monthly tax
    const monthlyTax = annualTax / 12
    
    // Calculate effective tax rate
    const effectiveRate = (annualTax / marketValue) * 100

    return {
      annualTax,
      monthlyTax,
      effectiveRate,
      assessedValue,
      exemptionAmount,
      taxableValue,
      baseRateAmount: (taxableValue / 100) * baseRate,
      additionalRateAmount: (taxableValue / 100) * additionalRates
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return `
Property Tax Analysis (${PROPERTY_TAX_CONFIG.year}):
--------------------
Value Assessment:
--------------
Assessed Value: ${formatter.format(result.assessedValue)}
Total Exemptions: ${formatter.format(result.exemptionAmount)}
Taxable Value: ${formatter.format(result.taxableValue)}

Tax Breakdown:
------------
Base Tax: ${formatter.format(result.baseRateAmount)}
Additional Taxes: ${formatter.format(result.additionalRateAmount)}
Total Annual Tax: ${formatter.format(result.annualTax)}

Payment Schedule:
--------------
Monthly Tax Payment: ${formatter.format(result.monthlyTax)}
Effective Tax Rate: ${result.effectiveRate.toFixed(3)}%

Note: Tax rates and exemptions shown for ${PROPERTY_TAX_CONFIG.year}. 
Rates and exemptions may vary by location and change annually.
    `.trim()
  }
} 