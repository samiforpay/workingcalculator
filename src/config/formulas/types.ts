import { LucideIcon } from 'lucide-react'

// Basic types
export type VariableType = 'currency' | 'percentage' | 'number'

export interface Variable {
  label: string
  type: VariableType
  defaultValue: number
  min: number
  max?: number
  step?: number
  helpText: string
}

// Formula interface with specific result types
export interface Formula<T extends Record<string, number> = Record<string, number>> {
  name: string
  description: string
  variables: Record<string, Variable>
  calculate: (inputs: Record<string, number>) => T
  formatResult: (result: T) => string
}

// Calculator configuration types
export type CalculatorCategory = 
  | 'roi'
  | 'tax'
  | 'investment'
  | 'retirement'
  | 'debt'
  | 'mortgage'
  | 'business'
  | 'wealth'
  | 'financial'
  | 'emergency'
  | 'home'
  | 'real-estate'

export interface CalculatorConfig {
  name: string
  description: string
  href: string
  icon: LucideIcon
  color: string
  category: CalculatorCategory
  subcategory?: string
  bgImage?: string
}

// Calculator form props
export interface CalculatorFormProps {
  formula: Formula
  onCalculate: (inputs: Record<string, number>) => Promise<void>
  isCalculating?: boolean
}

// Calculator path type
export type CalculatorPath = keyof typeof import('./index').calculatorFormulas

// Export calculator formula type
export type CalculatorFormula = Formula<Record<string, number>>

// Export calculator formulas type
export type CalculatorFormulas = Record<CalculatorPath, CalculatorFormula>

// FAQ types
export interface FAQ {
  question: string
  answer: string
}

export type FAQCategory = keyof typeof import('@/config/faqs').calculatorFAQs