import type { Formula } from '@/config/formulas/types'

interface SalesTaxResult extends Record<string, number> {
  subtotal: number
  salesTax: number
  totalCost: number
  effectiveRate: number
  [key: string]: number
}

// Make tax rates configurable for easy updates
const SALES_TAX_CONFIG = {
  year: 2023,
  defaultRate: 6.25, // Base state rate
  localRates: {
    city: 2.00,    // City tax
    county: 1.00,  // County tax
    special: 0.25  // Special district tax
  },
  exemptions: {
    food: 1.00,       // 100% exempt
    medicine: 1.00,   // 100% exempt
    clothing: 0.00    // 0% exempt
  }
}

export const salesTaxCalculator: Formula<SalesTaxResult> = {
  name: 'Sales Tax Calculator',
  description: `Calculate total cost including ${SALES_TAX_CONFIG.year} sales tax based on local rates`,
  variables: {
    subtotal: {
      label: 'Purchase Amount',
      type: 'currency',
      defaultValue: 100,
      min: 0,
      step: 0.01,
      helpText: 'Pre-tax amount of purchase'
    },
    stateTaxRate: {
      label: 'State Tax Rate (%)',
      type: 'percentage',
      defaultValue: SALES_TAX_CONFIG.defaultRate,
      min: 0,
      max: 20,
      step: 0.125,
      helpText: 'State sales tax rate'
    },
    localTaxRate: {
      label: 'Local Tax Rate (%)',
      type: 'percentage',
      defaultValue: SALES_TAX_CONFIG.localRates.city + SALES_TAX_CONFIG.localRates.county,
      min: 0,
      max: 10,
      step: 0.125,
      helpText: 'Combined local tax rates (city, county, etc.)'
    },
    exemptAmount: {
      label: 'Exempt Amount',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      step: 0.01,
      helpText: 'Amount exempt from sales tax (food, medicine, etc.)'
    }
  },
  calculate: (inputs) => {
    const { subtotal, stateTaxRate, localTaxRate, exemptAmount } = inputs
    
    // Calculate taxable amount
    const taxableAmount = Math.max(0, subtotal - exemptAmount)
    
    // Calculate state and local tax amounts
    const stateTaxAmount = taxableAmount * (stateTaxRate / 100)
    const localTaxAmount = taxableAmount * (localTaxRate / 100)
    
    // Calculate total tax and cost
    const salesTax = stateTaxAmount + localTaxAmount
    const totalCost = subtotal + salesTax
    
    // Calculate effective tax rate
    const effectiveRate = (salesTax / subtotal) * 100

    return {
      subtotal,
      salesTax,
      totalCost,
      effectiveRate,
      stateTaxAmount,
      localTaxAmount,
      taxableAmount,
      exemptAmount
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
Sales Tax Analysis (${SALES_TAX_CONFIG.year}):
--------------------
Purchase Breakdown:
----------------
Subtotal: ${formatter.format(result.subtotal)}
Exempt Amount: ${formatter.format(result.exemptAmount)}
Taxable Amount: ${formatter.format(result.taxableAmount)}

Tax Breakdown:
------------
State Tax: ${formatter.format(result.stateTaxAmount)}
Local Tax: ${formatter.format(result.localTaxAmount)}
Total Tax: ${formatter.format(result.salesTax)}

Final Results:
-----------
Total Cost: ${formatter.format(result.totalCost)}
Effective Tax Rate: ${result.effectiveRate.toFixed(2)}%
    `.trim()
  }
} 