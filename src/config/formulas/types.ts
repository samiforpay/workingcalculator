import { LucideIcon } from 'lucide-react'

// Basic types
export type VariableType = 'currency' | 'percentage' | 'number' | 'select' | 'boolean'

export interface Variable {
  label: string
  type: VariableType
  defaultValue: number
  min?: number
  max?: number
  step?: number | 'any'
  helpText?: string
  options?: { label: string; value: number }[]
  dependsOn?: string
  isSection?: boolean
  validate?: (value: number, inputs: Record<string, number>) => number
}

export interface BaseResult {
  [key: string]: number | string | number[]
}

// Formula interface with specific result types
export interface Formula<T extends BaseResult> {
  name: string
  description: string
  longDescription?: string
  variables: Record<string, Variable>
  calculate: (inputs: Record<string, number>) => T
  formatResult: (result: T) => string
}

// Calculator configuration types
export type CalculatorCategory = 
  | 'roi'
  | 'tax'
  | 'debt'
  | 'mortgage'
  | 'financial-savings'
  | 'business-related'
  | 'misc'

export interface CalculatorConfig {
  name: string
  description: string
  href: string
  icon: LucideIcon
  color: string
  category: CalculatorCategory
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