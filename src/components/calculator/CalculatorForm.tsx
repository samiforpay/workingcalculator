'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAnnouncement } from '@/contexts/AnnouncementContext'
import type { Formula, Variable } from '@/config/formulas/types'

interface CalculatorFormProps<T extends Record<string, number>> {
  formula: Formula<T>
  onCalculate: (inputs: Record<string, number>) => Promise<void>
  isCalculating?: boolean
}

export function CalculatorForm({ formula, onCalculate, isCalculating }: CalculatorFormProps<T>) {
  const [inputs, setInputs] = useState<Record<string, number>>(() => 
    Object.entries(formula.variables).reduce((acc, [key, variable]) => ({
      ...acc,
      [key]: variable.defaultValue
    }), {} as Record<string, number>)
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const { announce } = useAnnouncement()

  const validateInput = (key: string, value: number, variable: Variable): boolean => {
    if (value < variable.min) {
      setErrors(prev => ({ ...prev, [key]: `Minimum value is ${variable.min}` }))
      return false
    }
    if (variable.max !== undefined && value > variable.max) {
      setErrors(prev => ({ ...prev, [key]: `Maximum value is ${variable.max}` }))
      return false
    }
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[key]
      return newErrors
    })
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all inputs
    let isValid = true
    Object.entries(formula.variables).forEach(([key, variable]) => {
      if (!validateInput(key, inputs[key], variable)) {
        isValid = false
      }
    })

    if (!isValid) {
      announce('Please fix the errors before calculating', true)
      return
    }

    try {
      await onCalculate(inputs)
      announce('Calculation completed')
    } catch (error) {
      announce('Error in calculation', true)
      console.error('Calculation error:', error)
    }
  }

  const handleInputChange = (key: string, variable: Variable, value: string) => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    if (validateInput(key, numValue, variable)) {
      setInputs(prev => ({ ...prev, [key]: numValue }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formula.variables).map(([key, variable]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{variable.label}</Label>
          <Input
            id={key}
            type="number"
            value={inputs[key]}
            onChange={(e) => handleInputChange(key, variable, e.target.value)}
            step={variable.step || (variable.type === 'percentage' ? '0.01' : '1')}
            min={variable.min}
            max={variable.max}
            required
            disabled={isCalculating}
            aria-invalid={!!errors[key]}
            aria-describedby={errors[key] ? `${key}-error` : undefined}
          />
          {errors[key] && (
            <p id={`${key}-error`} className="text-sm text-red-500">
              {errors[key]}
            </p>
          )}
          {variable.helpText && (
            <p className="text-sm text-gray-500">{variable.helpText}</p>
          )}
        </div>
      ))}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isCalculating || Object.keys(errors).length > 0}
      >
        {isCalculating ? 'Calculating...' : 'Calculate'}
      </Button>
    </form>
  )
}