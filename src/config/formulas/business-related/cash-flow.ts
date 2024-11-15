import type { Formula } from '@/config/formulas/types'

interface CashFlowResult extends Record<string, number> {
  endingCash: number
  netCashFlow: number
  cashFlowRatio: number
  [key: string]: number
}

// Make rates and limits configurable for easy updates
const CASH_FLOW_CONFIG = {
  year: 2023,
  defaults: {
    startingCash: 50000,
    salesRevenue: 100000,
    otherIncome: 5000,
    operatingExpenses: 75000,
    debtPayments: 10000,
    taxPayments: 15000
  },
  limits: {
    maxAmount: 100000000000, // 100 billion
    minAmount: -100000000000 // -100 billion
  }
}

export const cashFlowCalculator: Formula<CashFlowResult> = {
  name: 'Cash Flow Calculator',
  description: '',
  longDescription: `
    <p>Managing your finances just got easier with our Cash Flow Calculator. This monthly cash flow estimator helps you keep track of your income and expenses, giving you a clear picture of your financial health. With our cash flow projection calculator, you can plan for the future by analyzing your cash inflow and outflow. It's the perfect personal cash flow analysis tool to help you make informed decisions about your spending and saving.</p>
    <p>Analysis includes:</p>
    <ul>
      <li>Operating cash flow</li>
      <li>Cash flow ratios</li>
      <li>Working capital analysis</li>
      <li>Cash conversion cycle</li>
      <li>Liquidity projections</li>
    </ul>
    <p>Maintaining healthy cash flow is crucial for business success. Use this calculator to monitor your cash position and make informed financial decisions.</p>
  `,
  variables: {
    startingCash: {
      label: 'Starting Cash Balance',
      type: 'currency',
      defaultValue: CASH_FLOW_CONFIG.defaults.startingCash,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Beginning cash balance for the period'
    },
    // Cash Inflows
    salesRevenue: {
      label: 'Sales Revenue',
      type: 'currency',
      defaultValue: CASH_FLOW_CONFIG.defaults.salesRevenue,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Cash received from sales'
    },
    accountsReceivable: {
      label: 'Accounts Receivable Collections',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Collections from customer accounts'
    },
    otherIncome: {
      label: 'Other Income',
      type: 'currency',
      defaultValue: CASH_FLOW_CONFIG.defaults.otherIncome,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Additional income sources'
    },
    // Cash Outflows
    operatingExpenses: {
      label: 'Operating Expenses',
      type: 'currency',
      defaultValue: CASH_FLOW_CONFIG.defaults.operatingExpenses,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Regular business operating costs'
    },
    accountsPayable: {
      label: 'Accounts Payable Payments',
      type: 'currency',
      defaultValue: 0,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Payments to suppliers and vendors'
    },
    debtPayments: {
      label: 'Debt Payments',
      type: 'currency',
      defaultValue: CASH_FLOW_CONFIG.defaults.debtPayments,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Loan and debt service payments'
    },
    taxPayments: {
      label: 'Tax Payments',
      type: 'currency',
      defaultValue: CASH_FLOW_CONFIG.defaults.taxPayments,
      min: 0,
      max: CASH_FLOW_CONFIG.limits.maxAmount,
      helpText: 'Tax payments due'
    }
  },
  calculate: (inputs) => {
    const {
      startingCash,
      salesRevenue,
      accountsReceivable,
      otherIncome,
      operatingExpenses,
      accountsPayable,
      debtPayments,
      taxPayments
    } = inputs

    // Calculate total cash inflows
    const totalInflows = salesRevenue + accountsReceivable + otherIncome

    // Calculate total cash outflows
    const totalOutflows = operatingExpenses + accountsPayable + debtPayments + taxPayments

    // Calculate net cash flow
    const netCashFlow = totalInflows - totalOutflows

    // Calculate ending cash position
    const endingCash = startingCash + netCashFlow

    // Calculate cash flow ratio (inflows/outflows)
    const cashFlowRatio = totalOutflows > 0 ? (totalInflows / totalOutflows) * 100 : 0

    return {
      endingCash,
      netCashFlow,
      cashFlowRatio,
      totalInflows,
      totalOutflows,
      startingCash
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const cashFlowStatus = result.netCashFlow >= 0 ? 'Positive' : 'Negative'
    const cashFlowHealth = result.cashFlowRatio >= 100 
      ? 'Healthy cash flow (inflows exceed outflows)'
      : 'Cash flow needs attention (outflows exceed inflows)'

    return `
Cash Flow Analysis:
----------------
Starting Cash: ${formatter.format(result.startingCash)}
Ending Cash: ${formatter.format(result.endingCash)}

Cash Flow Details:
---------------
Total Cash Inflows: ${formatter.format(result.totalInflows)}
Total Cash Outflows: ${formatter.format(result.totalOutflows)}
Net Cash Flow: ${formatter.format(result.netCashFlow)}

Analysis:
--------
Cash Flow Status: ${cashFlowStatus}
Cash Flow Ratio: ${result.cashFlowRatio.toFixed(1)}%
Health Check: ${cashFlowHealth}

Note: This is a simple cash flow analysis.
Consider seasonal variations and timing of payments for more accuracy.
    `.trim()
  }
} 