import { Calculator, BarChart3, PiggyBank, Coins, TrendingUp, Building, Wallet, Target, DollarSign, Home, Shield, Briefcase, Percent, Landmark, CreditCard } from 'lucide-react'
import type { CalculatorConfig } from './formulas/types'

// ROI Calculators
export const roiCalculators: CalculatorConfig[] = [
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
    description: 'Calculate annual property taxes based on assessed value and local rates',
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
    description: 'Calculate estimated quarterly tax payments for self-employed and business income',
    href: '/calculator/tax/quarterly',
    icon: Calculator,
    color: 'text-violet-500',
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
  }
]

// Miscellaneous Calculators
export const miscCalculators: CalculatorConfig[] = [
  {
    name: 'Retirement Savings',
    description: 'Plan your retirement savings and calculate needed contributions',
    href: '/calculator/retirement/savings',
    icon: PiggyBank,
    color: 'bg-purple-500',
    category: 'misc'
  },
  {
    name: 'Emergency Fund',
    description: 'Calculate how much emergency savings you need',
    href: '/calculator/emergency/fund',
    icon: Shield,
    color: 'bg-yellow-500',
    category: 'misc'
  },
  {
    name: 'Break-Even Analysis',
    description: 'Calculate your break-even point in units and revenue',
    href: '/calculator/business/break-even',
    icon: BarChart3,
    color: 'bg-blue-500',
    category: 'misc'
  }
]

// Calculator categories
export const calculatorCategories = {
  roi: 'Return on Investment',
  tax: 'Tax Calculators',
  debt: 'Debt Management',
  mortgage: 'Mortgage Calculators',
  'financial-savings': 'Financial Savings',
  misc: 'Other Calculators'
} as const

// Combined calculators array for homepage
export const calculators: CalculatorConfig[] = [
  ...roiCalculators,
  ...taxCalculators,
  ...debtCalculators,
  ...mortgageCalculators,
  ...financialSavingsCalculators,
  ...miscCalculators
]