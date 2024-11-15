import { Calculator, BarChart3, PiggyBank, Coins, TrendingUp, Building, Wallet, Target, DollarSign, Home, Shield, Briefcase, Percent, Landmark, CreditCard, PieChart, AlertTriangle } from 'lucide-react'
import type { CalculatorConfig } from './formulas/types'

// ROI Calculators
export const roiCalculators: CalculatorConfig[] = [
  {
    name: 'Investment Return',
    description: 'Calculate your total and annualized returns on investments',
    href: '/calculator/roi/investment-return',
    icon: TrendingUp,
    color: 'bg-emerald-500',
    category: 'roi'
  },
  {
    name: 'General ROI',
    description: 'Calculate return on investment for various scenarios',
    href: '/calculator/roi/general',
    icon: Calculator,
    color: 'bg-blue-500',
    category: 'roi'
  },
  {
    name: 'Real Estate ROI',
    description: 'Evaluate potential returns on real estate investments',
    href: '/calculator/roi/real-estate',
    icon: Building,
    color: 'bg-green-500',
    category: 'roi'
  },
  {
    name: 'Marketing ROI',
    description: 'Measure the effectiveness of your marketing campaigns',
    href: '/calculator/roi/marketing',
    icon: Target,
    color: 'bg-yellow-500',
    category: 'roi'
  },
  {
    name: 'Business ROI',
    description: 'Assess the profitability of business investments',
    href: '/calculator/roi/business',
    icon: BarChart3,
    color: 'bg-purple-500',
    category: 'roi'
  },
  {
    name: 'Stock Trading',
    description: 'Calculate profit/loss and returns from stock trades including fees',
    href: '/calculator/roi/stock-trading',
    icon: TrendingUp,
    color: 'bg-pink-500',
    category: 'roi'
  },
  {
    name: 'Portfolio Rebalancing',
    description: 'Calculate adjustments needed to maintain your target asset allocation',
    href: '/calculator/roi/portfolio-rebalancing',
    icon: PieChart,
    color: 'bg-violet-500',
    category: 'roi'
  },
  {
    name: 'Options Trading',
    description: 'Calculate potential profits and losses for call and put options',
    href: '/calculator/roi/options-trading',
    icon: TrendingUp,
    color: 'bg-orange-500',
    category: 'roi'
  },
  {
    name: 'Risk Assessment',
    description: 'Evaluate investment risk and calculate risk-adjusted returns',
    href: '/calculator/roi/risk-assessment',
    icon: AlertTriangle,
    color: 'bg-red-500',
    category: 'roi'
  },
  {
    name: 'Bond Calculator',
    description: 'Calculate bond yields, payments, and returns',
    href: '/calculator/roi/bond',
    icon: Calculator,
    color: 'bg-cyan-500',
    category: 'roi'
  }
]

// Tax Calculators
export const taxCalculators: CalculatorConfig[] = [
  {
    name: 'Income Tax',
    description: 'Calculate your income tax and take-home pay',
    href: '/calculator/tax/income',
    icon: DollarSign,
    color: 'text-green-500',
    category: 'tax'
  },
  {
    name: 'Capital Gains Tax',
    description: 'Calculate tax on investment profits',
    href: '/calculator/tax/capital-gains',
    icon: TrendingUp,
    color: 'text-blue-500',
    category: 'tax'
  },
  {
    name: 'Wealth Tax',
    description: 'Calculate tax on total wealth and assets',
    href: '/calculator/tax/wealth',
    icon: Wallet,
    color: 'text-purple-500',
    category: 'tax'
  },
  {
    name: 'Sales Tax',
    description: 'Calculate total cost including state and local sales tax',
    href: '/calculator/tax/sales',
    icon: Calculator,
    color: 'text-indigo-500',
    category: 'tax'
  },
  {
    name: 'Property Tax',
    description: 'Calculate annual property taxes based on assessed value',
    href: '/calculator/tax/property',
    icon: Home,
    color: 'text-orange-500',
    category: 'tax'
  },
  {
    name: 'Retirement Contributions',
    description: 'Calculate tax benefits from retirement account contributions',
    href: '/calculator/tax/retirement',
    icon: PiggyBank,
    color: 'text-teal-500',
    category: 'tax'
  },
  {
    name: 'Quarterly Tax Estimator',
    description: 'Calculate estimated quarterly tax payments',
    href: '/calculator/tax/quarterly',
    icon: Calculator,
    color: 'text-violet-500',
    category: 'tax'
  },
  {
    name: '401(k) Calculator',
    description: 'Calculate projected 401(k) balance and tax savings',
    href: '/calculator/tax/401k',
    icon: PiggyBank,
    color: 'text-cyan-500',
    category: 'tax'
  }
]

// Debt Calculators
export const debtCalculators: CalculatorConfig[] = [
  {
    name: 'Debt Payoff',
    description: 'Calculate how to become debt-free faster',
    href: '/calculator/debt/payoff',
    icon: Target,
    color: 'bg-red-500',
    category: 'debt'
  },
  {
    name: 'Credit Card Payoff',
    description: 'Plan your credit card debt repayment',
    href: '/calculator/debt/credit-card',
    icon: Wallet,
    color: 'bg-orange-500',
    category: 'debt'
  },
  {
    name: 'Loan Calculator',
    description: 'Calculate monthly payments and total cost for any type of loan',
    href: '/calculator/debt/loan',
    icon: Calculator,
    color: 'bg-indigo-500',
    category: 'debt'
  },
  {
    name: 'Debt Consolidation',
    description: 'Calculate potential savings from consolidating debts',
    href: '/calculator/debt/consolidation',
    icon: Wallet,
    color: 'bg-violet-500',
    category: 'debt'
  }
]

// Mortgage Calculators
export const mortgageCalculators: CalculatorConfig[] = [
  {
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments and costs',
    href: '/calculator/mortgage/basic',
    icon: Home,
    color: 'bg-blue-500',
    category: 'mortgage'
  },
  {
    name: 'Refinance Calculator',
    description: 'Calculate potential savings from refinancing',
    href: '/calculator/mortgage/refinance',
    icon: Calculator,
    color: 'bg-green-500',
    category: 'mortgage'
  },
  {
    name: 'Home Affordability',
    description: 'Calculate how much house you can afford based on your income and debts',
    href: '/calculator/mortgage/home-affordability',
    icon: Home,
    color: 'bg-teal-500',
    category: 'mortgage'
  },
  {
    name: 'Mortgage Amortization Calculator',
    description: 'Calculate your mortgage payment schedule and see how extra payments affect your loan',
    href: '/calculator/mortgage/amortization',
    icon: Calculator,
    color: 'bg-purple-500',
    category: 'mortgage'
  },
  {
    name: 'Down Payment Calculator',
    description: 'Calculate your required down payment and see how it affects your mortgage',
    href: '/calculator/mortgage/down-payment',
    icon: Calculator,
    color: 'bg-indigo-500',
    category: 'mortgage'
  }
]

// Financial Savings Calculators
export const financialSavingsCalculators: CalculatorConfig[] = [
  {
    name: 'Investment Growth',
    description: 'Calculate how your investments grow over time with compound interest and regular contributions',
    href: '/calculator/financial-savings/investment-growth',
    icon: TrendingUp,
    color: 'bg-emerald-500',
    category: 'financial-savings'
  },
  {
    name: 'Net Worth',
    description: 'Calculate your total net worth by analyzing your assets and liabilities',
    href: '/calculator/financial-savings/net-worth',
    icon: Wallet,
    color: 'bg-blue-500',
    category: 'financial-savings'
  },
  {
    name: 'IRA Calculator',
    description: 'Calculate your projected IRA balance at retirement including tax advantages',
    href: '/calculator/financial-savings/ira',
    icon: PiggyBank,
    color: 'bg-teal-500',
    category: 'financial-savings'
  },
  {
    name: 'Pension Calculator',
    description: 'Calculate your expected pension benefits based on years of service and salary',
    href: '/calculator/financial-savings/pension',
    icon: Calculator,
    color: 'bg-sky-500',
    category: 'financial-savings'
  },
  {
    name: 'Emergency Fund',
    description: 'Calculate how much emergency savings you need',
    href: '/calculator/financial-savings/emergency-fund',
    icon: Shield,
    color: 'bg-yellow-500',
    category: 'financial-savings'
  },
  {
    name: 'Savings Goal Calculator',
    description: 'Calculate how much you need to save monthly to reach your savings goal',
    href: '/calculator/financial-savings/savings-goal',
    icon: Target,
    color: 'bg-rose-500',
    category: 'financial-savings'
  }
]

// Add new Business Related Calculators array
export const businessRelatedCalculators: CalculatorConfig[] = [
  {
    name: 'Business Valuation',
    description: 'Calculate business value using multiple valuation methods',
    href: '/calculator/business-related/business-valuation',
    icon: Briefcase,
    color: 'bg-indigo-500',
    category: 'business-related'
  },
  {
    name: 'Break-Even Analysis',
    description: 'Calculate your break-even point in units and revenue',
    href: '/calculator/business/break-even',
    icon: BarChart3,
    color: 'bg-blue-500',
    category: 'business-related'
  },
  {
    name: 'Cash Flow',
    description: 'Calculate your business cash flow and ending cash position',
    href: '/calculator/business-related/cash-flow',
    icon: DollarSign,
    color: 'bg-green-500',
    category: 'business-related'
  },
  {
    name: 'Estate Tax',
    description: 'Calculate potential estate tax liability and plan for estate transfers',
    href: '/calculator/business-related/estate-tax',
    icon: Calculator,
    color: 'bg-purple-500',
    category: 'business-related'
  },
  {
    name: 'Profit Margin Calculator',
    description: 'Calculate profit margins and markup percentages for your business',
    href: '/calculator/business-related/profit-margin',
    icon: Calculator,
    color: 'bg-orange-500',
    category: 'business-related'
  },
  {
    name: 'Asset Allocation Calculator',
    description: 'Calculate and optimize your investment portfolio allocation across different asset classes',
    href: '/calculator/business-related/asset-allocation',
    icon: PieChart,
    color: 'bg-violet-500',
    category: 'business-related'
  }
]

// Miscellaneous Calculators
export const miscCalculators: CalculatorConfig[] = [
  {
    name: 'Wealth Management',
    description: 'Track and optimize your wealth across different assets and income sources',
    href: '/calculator/misc/wealth-management',
    icon: Wallet,
    color: 'bg-emerald-500',
    category: 'misc'
  },
  {
    name: 'Inheritance',
    description: 'Calculate potential inheritance amount after taxes and expenses',
    href: '/calculator/misc/inheritance',
    icon: Calculator,
    color: 'bg-blue-500',
    category: 'misc'
  }
]

// Calculator categories
export const calculatorCategories = {
  roi: 'Investment & ROI Calculators',
  tax: 'Tax Calculators',
  debt: 'Debt Management',
  mortgage: 'Mortgage Calculators',
  'financial-savings': 'Financial Savings',
  'business-related': 'Business Related Calculators',
  misc: 'Other Calculators'
} as const

// Combined calculators array for homepage
export const calculators: CalculatorConfig[] = [
  ...roiCalculators,
  ...taxCalculators,
  ...debtCalculators,
  ...mortgageCalculators,
  ...financialSavingsCalculators,
  ...businessRelatedCalculators,
  ...miscCalculators
]