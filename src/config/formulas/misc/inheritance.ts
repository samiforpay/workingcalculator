import type { Formula } from '@/config/formulas/types'

interface InheritanceResult extends Record<string, number> {
  inheritanceAmount: number
  totalTaxes: number
  netEstate: number
  sharePercentage: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const INHERITANCE_CONFIG = {
  year: 2023,
  defaults: {
    estateValue: 1000000,
    estateTaxes: 0,
    numHeirs: 2,
    debtPayments: 50000,
    funeralExpenses: 15000,
    administrativeCosts: 10000
  },
  limits: {
    maxAmount: 100000000000, // 100 billion
    minAmount: 0,
    maxHeirs: 100,
    exemptionAmount: 12920000 // 2023 federal estate tax exemption
  },
  taxRates: {
    federal: 0.40, // 40% federal estate tax
    state: {
      low: 0.05,  // 5% for estates under $1M
      medium: 0.10, // 10% for estates $1M-$5M
      high: 0.15   // 15% for estates over $5M
    }
  }
}

export const inheritanceCalculator: Formula<InheritanceResult> = {
  name: 'Inheritance Calculator',
  description: '',
  longDescription: `
    <p>The Inheritance Calculator helps you estimate potential inheritance amounts and understand tax implications. This tool considers estate value, number of heirs, taxes, and other factors to provide a clear picture of inheritance distribution.</p>
    <p>Calculations include:</p>
    <ul>
      <li>Individual inheritance shares</li>
      <li>Tax liability estimation</li>
      <li>Estate distribution analysis</li>
      <li>Beneficiary allocation</li>
      <li>Net inheritance calculation</li>
    </ul>
    <p>Understanding inheritance calculations helps in estate planning and managing expectations for wealth transfer.</p>
  `,
  variables: {
    estateValue: {
      label: 'Total Estate Value',
      type: 'currency',
      defaultValue: INHERITANCE_CONFIG.defaults.estateValue,
      min: 0,
      max: INHERITANCE_CONFIG.limits.maxAmount,
      helpText: 'Total value of the estate before taxes and expenses'
    },
    estateTaxes: {
      label: 'Estate Taxes',
      type: 'currency',
      defaultValue: INHERITANCE_CONFIG.defaults.estateTaxes,
      min: 0,
      max: INHERITANCE_CONFIG.limits.maxAmount,
      helpText: 'Total estate taxes (federal and state)'
    },
    numHeirs: {
      label: 'Number of Heirs',
      type: 'number',
      defaultValue: INHERITANCE_CONFIG.defaults.numHeirs,
      min: 1,
      max: INHERITANCE_CONFIG.limits.maxHeirs,
      step: 1,
      helpText: 'Number of people inheriting the estate'
    },
    debtPayments: {
      label: 'Outstanding Debts',
      type: 'currency',
      defaultValue: INHERITANCE_CONFIG.defaults.debtPayments,
      min: 0,
      max: INHERITANCE_CONFIG.limits.maxAmount,
      helpText: 'Debts that must be paid from the estate'
    },
    funeralExpenses: {
      label: 'Funeral Expenses',
      type: 'currency',
      defaultValue: INHERITANCE_CONFIG.defaults.funeralExpenses,
      min: 0,
      max: INHERITANCE_CONFIG.limits.maxAmount,
      helpText: 'Funeral and burial costs'
    },
    administrativeCosts: {
      label: 'Administrative Costs',
      type: 'currency',
      defaultValue: INHERITANCE_CONFIG.defaults.administrativeCosts,
      min: 0,
      max: INHERITANCE_CONFIG.limits.maxAmount,
      helpText: 'Legal fees, executor fees, and other administrative costs'
    },
    stateOfResidence: {
      label: 'State Tax Level',
      type: 'select',
      defaultValue: 1,
      options: [
        { label: 'Low Tax State', value: 1 },
        { label: 'Medium Tax State', value: 2 },
        { label: 'High Tax State', value: 3 }
      ],
      helpText: 'State tax level for inheritance calculations'
    }
  },
  calculate: (inputs) => {
    const {
      estateValue,
      estateTaxes,
      numHeirs,
      debtPayments,
      funeralExpenses,
      administrativeCosts,
      stateOfResidence
    } = inputs

    // Calculate total deductions
    const totalDeductions = debtPayments + funeralExpenses + administrativeCosts

    // Calculate state tax based on estate value and state level
    let stateTaxRate = INHERITANCE_CONFIG.taxRates.state.low
    if (stateOfResidence === 2) {
      stateTaxRate = INHERITANCE_CONFIG.taxRates.state.medium
    } else if (stateOfResidence === 3) {
      stateTaxRate = INHERITANCE_CONFIG.taxRates.state.high
    }

    // Calculate federal estate tax if applicable
    const taxableEstate = Math.max(0, estateValue - INHERITANCE_CONFIG.limits.exemptionAmount)
    const federalTax = taxableEstate > 0 ? taxableEstate * INHERITANCE_CONFIG.taxRates.federal : 0
    
    // Calculate state estate tax
    const stateTax = estateValue * stateTaxRate

    // Calculate total taxes
    const totalTaxes = estateTaxes + federalTax + stateTax

    // Calculate net estate value
    const netEstate = Math.max(0, estateValue - totalTaxes - totalDeductions)

    // Calculate inheritance amount per heir
    const inheritanceAmount = netEstate / numHeirs

    // Calculate share percentage
    const sharePercentage = (inheritanceAmount / estateValue) * 100

    return {
      inheritanceAmount,
      totalTaxes,
      netEstate,
      sharePercentage,
      totalDeductions,
      federalTax,
      stateTax
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Inheritance Analysis:
------------------
Individual Inheritance: ${formatter.format(result.inheritanceAmount)}
Share of Estate: ${result.sharePercentage.toFixed(1)}%

Estate Breakdown:
--------------
Net Estate Value: ${formatter.format(result.netEstate)}
Total Taxes: ${formatter.format(result.totalTaxes)}
Total Deductions: ${formatter.format(result.totalDeductions)}

Tax Details:
----------
Federal Estate Tax: ${formatter.format(result.federalTax)}
State Estate Tax: ${formatter.format(result.stateTax)}

Note: This is a simplified calculation.
Actual inheritance may vary based on specific state laws,
estate planning strategies, and other factors.
Consult with a legal professional for detailed advice.
    `.trim()
  }
} 