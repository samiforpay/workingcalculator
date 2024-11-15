import type { Formula } from '@/config/formulas/types'

interface DownPaymentResult extends Record<string, number> {
  downPaymentAmount: number
  loanAmount: number
  minimumDownPayment: number
  pmiRequired: boolean
  monthlyPMI: number
  [key: string]: number | boolean
}

// Make rates and limits configurable for easy updates
const DOWN_PAYMENT_CONFIG = {
  year: 2023,
  defaults: {
    purchasePrice: 300000,
    downPaymentPercent: 20
  },
  limits: {
    maxPrice: 100000000, // 100 million
    minPrice: 1000,      // $1,000 minimum
    maxPercent: 100,
    minPercent: 3.5      // FHA minimum
  },
  thresholds: {
    conventionalMin: 3,    // Conventional loan minimum
    fhaMin: 3.5,          // FHA minimum
    pmiThreshold: 20,      // PMI required below 20%
    jumboMin: 10          // Jumbo loan minimum
  },
  pmiRate: 0.005,         // 0.5% annual PMI rate
  loanLimits: {
    conventional: 726200, // 2023 conforming loan limit
    fha: 420680,         // 2023 FHA limit
    jumbo: 726201        // Above this is jumbo
  }
}

export const downPaymentCalculator: Formula<DownPaymentResult> = {
  name: 'Down Payment Calculator',
  description: '',
  longDescription: `
    <p>Calculate how much you need to save for a down payment with our Down Payment Calculator. This down payment savings calculator allows you to determine the percentage required based on your desired home price. Whether you're asking yourself how much to save for a down payment or looking for down payment assistance options, this tool provides valuable insights to help you reach your homeownership goals.</p>
    <p>Calculator includes:</p>
    <ul>
      <li>Minimum down payment requirements</li>
      <li>PMI threshold analysis</li>
      <li>Different loan type options</li>
      <li>Monthly payment estimates</li>
      <li>Total upfront cost calculation</li>
    </ul>
    <p>Planning your down payment is a crucial step in the home buying process. Use this calculator to set savings goals and understand different down payment scenarios.</p>
  `,
  variables: {
    purchasePrice: {
      label: 'Home Purchase Price',
      type: 'currency',
      defaultValue: DOWN_PAYMENT_CONFIG.defaults.purchasePrice,
      min: DOWN_PAYMENT_CONFIG.limits.minPrice,
      max: DOWN_PAYMENT_CONFIG.limits.maxPrice,
      helpText: 'Total purchase price of the home'
    },
    downPaymentPercent: {
      label: 'Down Payment (%)',
      type: 'percentage',
      defaultValue: DOWN_PAYMENT_CONFIG.defaults.downPaymentPercent,
      min: DOWN_PAYMENT_CONFIG.limits.minPercent,
      max: DOWN_PAYMENT_CONFIG.limits.maxPercent,
      helpText: 'Percentage of purchase price as down payment'
    },
    loanType: {
      label: 'Loan Type',
      type: 'select',
      defaultValue: 1,
      options: [
        { label: 'Conventional', value: 1 },
        { label: 'FHA', value: 2 },
        { label: 'Jumbo', value: 3 }
      ],
      helpText: 'Type of mortgage loan'
    }
  },
  calculate: (inputs) => {
    const { purchasePrice, downPaymentPercent, loanType } = inputs

    // Calculate down payment amount
    const downPaymentAmount = (purchasePrice * downPaymentPercent) / 100
    const loanAmount = purchasePrice - downPaymentAmount

    // Determine minimum down payment based on loan type and amount
    let minimumDownPayment = 0
    if (loanType === 1) { // Conventional
      minimumDownPayment = purchasePrice * (DOWN_PAYMENT_CONFIG.thresholds.conventionalMin / 100)
      if (loanAmount > DOWN_PAYMENT_CONFIG.loanLimits.conventional) {
        minimumDownPayment = purchasePrice * (DOWN_PAYMENT_CONFIG.thresholds.jumboMin / 100)
      }
    } else if (loanType === 2) { // FHA
      minimumDownPayment = purchasePrice * (DOWN_PAYMENT_CONFIG.thresholds.fhaMin / 100)
    } else { // Jumbo
      minimumDownPayment = purchasePrice * (DOWN_PAYMENT_CONFIG.thresholds.jumboMin / 100)
    }

    // Determine if PMI is required
    const pmiRequired = downPaymentPercent < DOWN_PAYMENT_CONFIG.thresholds.pmiThreshold

    // Calculate monthly PMI if required
    const monthlyPMI = pmiRequired 
      ? (loanAmount * DOWN_PAYMENT_CONFIG.pmiRate) / 12
      : 0

    return {
      downPaymentAmount,
      loanAmount,
      minimumDownPayment,
      pmiRequired,
      monthlyPMI,
      purchasePrice,
      downPaymentPercent,
      minimumPercent: (minimumDownPayment / purchasePrice) * 100
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    const pmiMessage = result.pmiRequired
      ? `Monthly PMI: ${formatter.format(result.monthlyPMI)}`
      : 'No PMI Required'

    return `
Down Payment Analysis:
-------------------
Required Down Payment: ${formatter.format(result.downPaymentAmount)}
Loan Amount: ${formatter.format(result.loanAmount)}

Minimum Requirements:
-----------------
Minimum Down Payment: ${formatter.format(result.minimumDownPayment)}
Minimum Percentage: ${result.minimumPercent.toFixed(1)}%

PMI Status:
---------
${pmiMessage}

Note: Actual loan terms and PMI rates may vary by lender.
Consider consulting with multiple lenders to compare options.
    `.trim()
  }
} 