import type { Formula } from '@/config/formulas/types'

interface WealthTaxResult extends Record<string, number> {
  totalTax: number
  effectiveRate: number
  taxableWealth: number
  exemptionAmount: number
  [key: string]: number
}

// Make tax brackets configurable for easy updates
const WEALTH_TAX_CONFIG = {
  year: 2023,
  brackets: [
    { 
      rate: 0.03, 
      min: 1_000_000_000, 
      name: '3% Bracket (Over $1B)',
      description: 'Tax on wealth over $1 billion'
    },
    { 
      rate: 0.02, 
      min: 50_000_000, 
      name: '2% Bracket ($50M-$1B)',
      description: 'Tax on wealth between $50M and $1B'
    },
    { 
      rate: 0, 
      min: 0, 
      name: 'No Tax (Under $50M)',
      description: 'No tax on wealth under $50M'
    }
  ],
  exemptions: {
    primary_residence: 0.5, // 50% of primary residence value is exempt
    retirement_accounts: 1.0, // 100% of retirement accounts are exempt
    charitable_deduction: 1.0 // 100% of charitable contributions are exempt
  }
}

export const wealthTaxCalculator: Formula<WealthTaxResult> = {
  name: 'Wealth Tax Calculator',
  description: `Calculate your ${WEALTH_TAX_CONFIG.year} wealth tax based on current tax brackets`,
  variables: {
    totalAssets: {
      label: 'Total Assets Value',
      type: 'currency',
      defaultValue: 100_000_000,
      min: 0,
      step: 1_000_000,
      helpText: 'Total value of all assets'
    },
    primaryResidenceValue: {
      label: 'Primary Residence Value',
      type: 'currency',
      defaultValue: 2_000_000,
      min: 0,
      step: 100_000,
      helpText: '50% of this value will be exempt from wealth tax'
    },
    retirementAccounts: {
      label: 'Retirement Accounts Value',
      type: 'currency',
      defaultValue: 5_000_000,
      min: 0,
      step: 100_000,
      helpText: 'Value of retirement accounts (fully exempt)'
    },
    charitableContributions: {
      label: 'Charitable Contributions',
      type: 'currency',
      defaultValue: 1_000_000,
      min: 0,
      step: 100_000,
      helpText: 'Annual charitable contributions (fully deductible)'
    }
  },
  calculate: (inputs) => {
    const { totalAssets, primaryResidenceValue, retirementAccounts, charitableContributions } = inputs
    
    // Calculate exemptions
    const residenceExemption = primaryResidenceValue * WEALTH_TAX_CONFIG.exemptions.primary_residence
    const retirementExemption = retirementAccounts * WEALTH_TAX_CONFIG.exemptions.retirement_accounts
    const charitableExemption = charitableContributions * WEALTH_TAX_CONFIG.exemptions.charitable_deduction
    
    // Calculate taxable wealth
    const totalExemptions = residenceExemption + retirementExemption + charitableExemption
    const taxableWealth = Math.max(0, totalAssets - totalExemptions)
    
    // Calculate tax by bracket
    let remainingWealth = taxableWealth
    let totalTax = 0
    const taxByBracket: Record<string, number> = {}

    for (let i = 0; i < WEALTH_TAX_CONFIG.brackets.length - 1; i++) {
      const currentBracket = WEALTH_TAX_CONFIG.brackets[i]
      const nextBracket = WEALTH_TAX_CONFIG.brackets[i + 1]
      
      if (remainingWealth > currentBracket.min) {
        const taxableAmount = remainingWealth - Math.max(nextBracket.min, currentBracket.min)
        const taxForBracket = taxableAmount * currentBracket.rate
        
        if (taxForBracket > 0) {
          totalTax += taxForBracket
          taxByBracket[currentBracket.name] = taxForBracket
        }
        
        remainingWealth = Math.min(remainingWealth, nextBracket.min)
      }
    }
    
    // Calculate effective tax rate
    const effectiveRate = (totalTax / totalAssets) * 100

    return {
      totalTax,
      effectiveRate,
      taxableWealth,
      exemptionAmount: totalExemptions
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    let breakdownByBracket = '\nTax Breakdown by Bracket:\n'
    breakdownByBracket += '------------------------\n'
    for (const [bracket, amount] of Object.entries(result.taxByBracket)) {
      if (amount > 0) {
        const bracketInfo = WEALTH_TAX_CONFIG.brackets.find(b => b.name === bracket)
        breakdownByBracket += `${bracket}:\n`
        breakdownByBracket += `${bracketInfo?.description}\n`
        breakdownByBracket += `Tax Amount: ${formatter.format(amount)}\n\n`
      }
    }

    return `
Wealth Tax Analysis (${WEALTH_TAX_CONFIG.year}):
----------------------------------------
Taxable Wealth: ${formatter.format(result.taxableWealth)}
Total Exemptions: ${formatter.format(result.exemptionAmount)}

${breakdownByBracket}
Summary:
-------
Total Wealth Tax: ${formatter.format(result.totalTax)}
Effective Tax Rate: ${result.effectiveRate.toFixed(4)}%

Note: Tax brackets and rates shown for ${WEALTH_TAX_CONFIG.year}. 
Rates and thresholds may be adjusted annually.
    `.trim()
  }
} 