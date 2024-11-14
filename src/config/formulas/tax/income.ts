import type { Formula } from '@/config/formulas/types'

interface IncomeTaxResult extends Record<string, number> {
  taxableIncome: number
  totalTax: number
  effectiveRate: number
  takeHomePay: number
  monthlyTakeHome: number
  [key: string]: number
}

export const incomeTaxCalculator: Formula<IncomeTaxResult> = {
  name: 'Income Tax Calculator',
  description: 'Calculate your income tax and take-home pay',
  variables: {
    grossIncome: {
      label: 'Annual Gross Income',
      type: 'currency',
      defaultValue: 50000,
      min: 0,
      step: 1000,
      helpText: 'Your total annual income before taxes'
    },
    deductions: {
      label: 'Total Deductions',
      type: 'currency',
      defaultValue: 12950,
      min: 0,
      step: 100,
      helpText: 'Standard deduction or total itemized deductions'
    },
    taxCredits: {
      label: 'Tax Credits',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      step: 100,
      helpText: 'Total tax credits you qualify for'
    },
    stateTaxRate: {
      label: 'State Tax Rate',
      type: 'percentage',
      defaultValue: 5,
      min: 0,
      max: 15,
      step: 0.1,
      helpText: 'Your state income tax rate'
    }
  },
  calculate: (inputs) => {
    const { grossIncome, deductions, taxCredits, stateTaxRate } = inputs
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, grossIncome - deductions)
    
    // Federal tax brackets (simplified)
    let federalTax = 0
    if (taxableIncome > 539900) {
      federalTax = 162718 + (taxableIncome - 539900) * 0.37
    } else if (taxableIncome > 215950) {
      federalTax = 49335 + (taxableIncome - 215950) * 0.35
    } else if (taxableIncome > 170050) {
      federalTax = 34647 + (taxableIncome - 170050) * 0.32
    } else if (taxableIncome > 89075) {
      federalTax = 15213 + (taxableIncome - 89075) * 0.24
    } else if (taxableIncome > 41775) {
      federalTax = 4807 + (taxableIncome - 41775) * 0.22
    } else if (taxableIncome > 10275) {
      federalTax = 1027.50 + (taxableIncome - 10275) * 0.12
    } else {
      federalTax = taxableIncome * 0.10
    }
    
    // Calculate state tax
    const stateTax = taxableIncome * (stateTaxRate / 100)
    
    // Calculate total tax and apply credits
    const totalTax = Math.max(0, federalTax + stateTax - taxCredits)
    
    // Calculate take-home pay
    const takeHomePay = grossIncome - totalTax
    const monthlyTakeHome = takeHomePay / 12
    
    // Calculate effective tax rate
    const effectiveRate = (totalTax / grossIncome) * 100

    return {
      taxableIncome,
      totalTax,
      effectiveRate,
      takeHomePay,
      monthlyTakeHome
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Income Tax Analysis:
-----------------
Taxable Income: ${formatter.format(result.taxableIncome)}
Total Tax: ${formatter.format(result.totalTax)}
Effective Tax Rate: ${result.effectiveRate.toFixed(1)}%

Take-Home Pay:
-----------
Annual: ${formatter.format(result.takeHomePay)}
Monthly: ${formatter.format(result.monthlyTakeHome)}
    `.trim()
  }
} 