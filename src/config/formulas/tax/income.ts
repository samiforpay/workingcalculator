import type { Formula, BaseResult } from '@/config/formulas/types'

interface IncomeTaxResult extends BaseResult {
  taxableIncome: number
  federalTax: number
  stateTax: number
  ficaTax: number
  totalTax: number
  effectiveRate: number
  takeHomePay: number
  monthlyTakeHome: number
  taxByBracket: Record<string, number>
  socialSecurityTax: number
  medicareTax: number
}

// Make tax brackets configurable for easy updates
const TAX_CONFIG = {
  year: 2023,
  singleBrackets: [
    { rate: 0.37, min: 578125, name: '37% Bracket' },
    { rate: 0.35, min: 231250, name: '35% Bracket' },
    { rate: 0.32, min: 182100, name: '32% Bracket' },
    { rate: 0.24, min: 95375, name: '24% Bracket' },
    { rate: 0.22, min: 44725, name: '22% Bracket' },
    { rate: 0.12, min: 11000, name: '12% Bracket' },
    { rate: 0.10, min: 0, name: '10% Bracket' }
  ],
  marriedBrackets: [
    { rate: 0.37, min: 693750, name: '37% Bracket' },
    { rate: 0.35, min: 462500, name: '35% Bracket' },
    { rate: 0.32, min: 364200, name: '32% Bracket' },
    { rate: 0.24, min: 190750, name: '24% Bracket' },
    { rate: 0.22, min: 89450, name: '22% Bracket' },
    { rate: 0.12, min: 22000, name: '12% Bracket' },
    { rate: 0.10, min: 0, name: '10% Bracket' }
  ],
  standardDeduction: {
    single: 13850,
    married: 27700
  },
  socialSecurityWageCap: 160200,
  socialSecurityRate: 0.062,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: {
    single: 200000,
    married: 250000
  }
}

export const incomeTaxCalculator: Formula<IncomeTaxResult> = {
  name: 'Income Tax Calculator',
  description: '',
  longDescription: `
    <p>Get ready for tax season with our Income Tax Calculator! This 2024 income tax calculator for individuals helps you estimate what you'll owe or what you'll get back as a refund. Find out how to estimate your income tax refund quickly using our free income tax calculator that covers all states.</p>
    <p>Features included:</p>
    <ul>
      <li>Federal tax bracket analysis</li>
      <li>State tax calculations</li>
      <li>FICA taxes (Social Security and Medicare)</li>
      <li>Standard and itemized deductions</li>
      <li>Tax credits consideration</li>
    </ul>
    <p>Use this calculator to plan your tax strategy, estimate quarterly payments, or understand how different income levels affect your tax liability.</p>
  `,
  variables: {
    grossIncome: {
      label: 'Annual Gross Income',
      type: 'currency',
      defaultValue: 75000,
      min: 0,
      step: 1000,
      helpText: 'Your total annual income before taxes'
    },
    filingStatus: {
      label: 'Filing Status',
      type: 'number',
      defaultValue: 1,
      min: 1,
      max: 2,
      step: 1,
      helpText: '1 for Single, 2 for Married Filing Jointly'
    },
    deductions: {
      label: 'Total Deductions',
      type: 'currency',
      defaultValue: TAX_CONFIG.standardDeduction.single,
      min: 0,
      step: 100,
      helpText: `Standard deduction (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(TAX_CONFIG.standardDeduction.single)}) or itemized deductions`
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
    const { grossIncome, filingStatus, deductions, taxCredits, stateTaxRate } = inputs
    const brackets = filingStatus === 1 ? TAX_CONFIG.singleBrackets : TAX_CONFIG.marriedBrackets
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, grossIncome - deductions)
    
    // Calculate Federal Tax using progressive brackets
    let remainingIncome = taxableIncome
    let federalTax = 0
    const taxByBracket: Record<string, number> = {}

    for (const bracket of brackets) {
      if (remainingIncome > bracket.min) {
        const taxableAtThisRate = remainingIncome - bracket.min
        const taxForBracket = taxableAtThisRate * bracket.rate
        federalTax += taxForBracket
        taxByBracket[bracket.name] = taxForBracket
        remainingIncome = bracket.min
      }
    }
    
    // Calculate FICA taxes
    const socialSecurityTax = Math.min(grossIncome * TAX_CONFIG.socialSecurityRate, 
                                     TAX_CONFIG.socialSecurityWageCap * TAX_CONFIG.socialSecurityRate)
    
    let medicareTax = grossIncome * TAX_CONFIG.medicareRate
    const medicareThreshold = filingStatus === 1 
      ? TAX_CONFIG.additionalMedicareThreshold.single 
      : TAX_CONFIG.additionalMedicareThreshold.married

    if (grossIncome > medicareThreshold) {
      medicareTax += (grossIncome - medicareThreshold) * TAX_CONFIG.additionalMedicareRate
    }
    
    const ficaTax = socialSecurityTax + medicareTax
    
    // Calculate state tax
    const stateTax = taxableIncome * (stateTaxRate / 100)
    
    // Apply tax credits
    const totalTax = Math.max(0, federalTax + stateTax + ficaTax - taxCredits)
    
    // Calculate take-home pay
    const takeHomePay = grossIncome - totalTax
    const monthlyTakeHome = takeHomePay / 12
    
    // Calculate effective tax rate
    const effectiveRate = (totalTax / grossIncome) * 100

    return {
      taxableIncome,
      federalTax,
      stateTax,
      ficaTax,
      totalTax,
      effectiveRate,
      takeHomePay,
      monthlyTakeHome,
      taxByBracket,
      socialSecurityTax,
      medicareTax
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    let breakdownByBracket = '\nFederal Tax Breakdown:\n'
    breakdownByBracket += '--------------------\n'
    for (const [bracket, amount] of Object.entries(result.taxByBracket)) {
      if (amount > 0) {
        breakdownByBracket += `${bracket}: ${formatter.format(amount)}\n`
      }
    }

    return `
Income Tax Analysis (${TAX_CONFIG.year}):
-----------------
Taxable Income: ${formatter.format(result.taxableIncome)}

Tax Breakdown:
------------
Federal Tax: ${formatter.format(result.federalTax)}${breakdownByBracket}
State Tax: ${formatter.format(result.stateTax)}

FICA Taxes:
---------
Social Security: ${formatter.format(result.socialSecurityTax)}
Medicare: ${formatter.format(result.medicareTax)}
Total FICA: ${formatter.format(result.ficaTax)}

Summary:
-------
Total Tax: ${formatter.format(result.totalTax)}
Effective Tax Rate: ${result.effectiveRate.toFixed(1)}%

Take-Home Pay:
-----------
Annual: ${formatter.format(result.takeHomePay)}
Monthly: ${formatter.format(result.monthlyTakeHome)}
    `.trim()
  }
} 