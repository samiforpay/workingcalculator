import type { Formula } from '@/config/formulas/types'

interface EstateTaxResult extends Record<string, number> {
  taxableEstate: number
  estateTax: number
  effectiveRate: number
  netEstate: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const ESTATE_TAX_CONFIG = {
  year: 2023,
  defaults: {
    grossEstate: 1000000,
    deductions: 200000,
    taxRate: 40
  },
  limits: {
    maxAmount: 100000000000, // 100 billion
    minAmount: 0,
    maxRate: 100,
    exemptionAmount: 12920000 // 2023 federal estate tax exemption
  },
  brackets: [
    { rate: 0.40, min: 1000000, name: '40% Rate' },
    { rate: 0.35, min: 500000, name: '35% Rate' },
    { rate: 0.30, min: 0, name: '30% Rate' }
  ]
}

export const estateTaxCalculator: Formula<EstateTaxResult> = {
  name: 'Estate Tax Calculator',
  description: '',
  longDescription: `
    <p>Planning for the future? Use our Estate Tax Calculator to navigate the complexities of estate taxes. This estate tax estimator tool lets you calculate estate taxes online, providing clarity on what you might owe. Our simple estate tax calculator is designed for ease of use, while the inheritance tax calculation tool helps you understand potential liabilities for heirs. Don’t forget to check out our estate planning tax calculator to ensure you're prepared.</p>
    <p>Features included:</p>
    <ul>
      <li>Federal estate tax calculation</li>
      <li>State estate tax estimation</li>
      <li>Exemption analysis</li>
      <li>Deduction planning</li>
      <li>Gift tax integration</li>
    </ul>
    <p>Understanding your potential estate tax liability helps you plan effectively for wealth transfer and minimize tax impact on your heirs.</p>
  `,
  variables: {
    grossEstate: {
      label: 'Gross Estate Value',
      type: 'currency',
      defaultValue: ESTATE_TAX_CONFIG.defaults.grossEstate,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Total value of all estate assets'
    },
    propertyValue: {
      label: 'Real Estate Value',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Value of real estate holdings'
    },
    investments: {
      label: 'Investment Assets',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Value of stocks, bonds, and other investments'
    },
    businessInterests: {
      label: 'Business Interests',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Value of business ownership interests'
    },
    lifeInsurance: {
      label: 'Life Insurance Proceeds',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Death benefits from life insurance policies'
    },
    debts: {
      label: 'Outstanding Debts',
      type: 'currency',
      defaultValue: ESTATE_TAX_CONFIG.defaults.deductions,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Total debts and liabilities'
    },
    funeralExpenses: {
      label: 'Funeral Expenses',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Estimated funeral and burial costs'
    },
    charitableGifts: {
      label: 'Charitable Gifts',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxAmount,
      helpText: 'Charitable donations from the estate'
    },
    taxRate: {
      label: 'Estate Tax Rate (%)',
      type: 'percentage',
      defaultValue: ESTATE_TAX_CONFIG.defaults.taxRate,
      min: 0,
      max: ESTATE_TAX_CONFIG.limits.maxRate,
      helpText: 'Applicable estate tax rate'
    }
  },
  calculate: (inputs) => {
    const {
      grossEstate,
      propertyValue,
      investments,
      businessInterests,
      lifeInsurance,
      debts,
      funeralExpenses,
      charitableGifts,
      taxRate
    } = inputs

    // Calculate total estate value
    const totalEstateValue = grossEstate + propertyValue + investments + 
                           businessInterests + lifeInsurance

    // Calculate total deductions
    const totalDeductions = debts + funeralExpenses + charitableGifts

    // Calculate taxable estate
    const taxableEstate = Math.max(0, totalEstateValue - totalDeductions - 
                                 ESTATE_TAX_CONFIG.limits.exemptionAmount)

    // Calculate estate tax
    const estateTax = taxableEstate * (taxRate / 100)

    // Calculate net estate after tax
    const netEstate = totalEstateValue - estateTax

    // Calculate effective tax rate
    const effectiveRate = totalEstateValue > 0 
      ? (estateTax / totalEstateValue) * 100 
      : 0

    return {
      taxableEstate,
      estateTax,
      effectiveRate,
      netEstate,
      totalEstateValue,
      totalDeductions
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Estate Tax Analysis:
-----------------
Estate Value: ${formatter.format(result.totalEstateValue)}
Total Deductions: ${formatter.format(result.totalDeductions)}
Federal Exemption: ${formatter.format(ESTATE_TAX_CONFIG.limits.exemptionAmount)}

Tax Calculation:
-------------
Taxable Estate: ${formatter.format(result.taxableEstate)}
Estate Tax: ${formatter.format(result.estateTax)}
Effective Tax Rate: ${result.effectiveRate.toFixed(2)}%

Final Results:
-----------
Net Estate After Tax: ${formatter.format(result.netEstate)}

Note: This is a simplified calculation.
Consult with a tax professional for detailed estate planning.
    `.trim()
  }
} 