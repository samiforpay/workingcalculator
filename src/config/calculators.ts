import { Calculator, BarChart3, PiggyBank, Coins, TrendingUp, Building, Wallet, Target, DollarSign, Home, Shield, Briefcase } from 'lucide-react'
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
    color: 'bg-green-500',
    category: 'tax'
  },
  {
    name: 'Capital Gains Tax',
    description: 'Calculate tax on investment profits',
    href: '/calculator/tax/capital-gains',
    icon: TrendingUp,
    color: 'bg-blue-500',
    category: 'tax'
  }
]

// Retirement Calculators
export const retirementCalculators: CalculatorConfig[] = [
  {
    name: 'Retirement Savings',
    description: 'Plan your retirement savings and calculate needed contributions',
    href: '/calculator/retirement/savings',
    icon: PiggyBank,
    color: 'bg-purple-500',
    category: 'retirement'
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

// Emergency Fund Calculators
export const emergencyCalculators: CalculatorConfig[] = [
  {
    name: 'Emergency Fund',
    description: 'Calculate how much emergency savings you need',
    href: '/calculator/emergency/fund',
    icon: Shield,
    color: 'bg-yellow-500',
    category: 'emergency'
  }
]

// Business Calculators
export const businessCalculators: CalculatorConfig[] = [
  {
    name: 'Break-Even Analysis',
    description: 'Calculate your break-even point',
    href: '/calculator/business/break-even',
    icon: Briefcase,
    color: 'bg-purple-500',
    category: 'business'
  }
]

// Investment Calculators
export const investmentCalculators: CalculatorConfig[] = [
  {
    name: 'Investment Returns',
    description: 'Calculate investment returns with dividends and capital gains',
    href: '/calculator/investment/returns',
    icon: TrendingUp,
    color: 'bg-blue-500',
    category: 'investment'
  },
  {
    name: 'Portfolio Rebalancing',
    description: 'Rebalance your investment portfolio',
    href: '/calculator/investment/portfolio',
    icon: PiggyBank,
    color: 'bg-purple-500',
    category: 'investment'
  }
]

// Financial Calculators
export const financialCalculators: CalculatorConfig[] = [
  {
    name: 'Compound Interest',
    description: 'Calculate how your investments grow over time',
    href: '/calculator/financial/compound',
    icon: Coins,
    color: 'bg-green-500',
    category: 'financial'
  },
  {
    name: 'Inflation Impact',
    description: 'Calculate how inflation affects your money',
    href: '/calculator/financial/inflation',
    icon: Wallet,
    color: 'bg-red-500',
    category: 'financial'
  },
  {
    name: 'Savings Goal',
    description: 'Plan how to reach your savings goals',
    href: '/calculator/financial/savings-goal',
    icon: Target,
    color: 'bg-blue-500',
    category: 'financial'
  }
]

// Combine all calculators
export const calculators = [
  ...roiCalculators,
  ...taxCalculators,
  ...retirementCalculators,
  ...debtCalculators,
  ...mortgageCalculators,
  ...emergencyCalculators,
  ...businessCalculators,
  ...investmentCalculators,
  ...financialCalculators
]

// Define categories and their titles
export const calculatorCategories = {
  roi: 'ROI Calculators',
  tax: 'Tax Calculators',
  retirement: 'Retirement Planning',
  debt: 'Debt Management',
  mortgage: 'Mortgage Calculators',
  emergency: 'Emergency Fund',
  business: 'Business Tools',
  investment: 'Investment Tools',
  financial: 'Financial Planning'
} as const