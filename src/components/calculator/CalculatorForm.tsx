'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnnouncement } from '@/contexts/AnnouncementContext'
import type { Formula, Variable, BaseResult } from '@/config/formulas/types'

interface CalculatorFormProps<T extends BaseResult> {
  formula: Formula<T>
  onCalculate: (inputs: Record<string, number>) => Promise<void>
  isCalculating?: boolean
}

export function CalculatorForm<T extends BaseResult>({ formula, onCalculate, isCalculating }: CalculatorFormProps<T>) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    return Object.entries(formula.variables).reduce((acc, [name, variable]) => {
      acc[name] = Number(variable.defaultValue)
      return acc
    }, {} as Record<string, number>)
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const { announce } = useAnnouncement()

  const validateInput = (key: string, value: number, variable: Variable): boolean => {
    if (variable.min !== undefined && value < variable.min) {
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

  const handleInputChange = (key: string, variable: Variable, value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numValue)) return

    if (validateInput(key, numValue, variable)) {
      setValues(prev => ({ ...prev, [key]: numValue }))
    }
  }

  const renderInput = (key: string, variable: Variable) => {
    switch (variable.type) {
      case 'select':
        return (
          <Select
            value={values[key].toString()}
            onValueChange={(value) => handleInputChange(key, variable, parseInt(value))}
            disabled={isCalculating}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variable.options?.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return (
          <Input
            id={key}
            type="number"
            value={values[key]}
            onChange={(e) => handleInputChange(key, variable, e.target.value)}
            step={variable.step || (variable.type === 'percentage' ? '0.01' : '1')}
            min={variable.min}
            max={variable.max}
            required
            disabled={isCalculating}
          />
        )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let isValid = true
    Object.entries(formula.variables).forEach(([key, variable]) => {
      if (!validateInput(key, values[key], variable)) {
        isValid = false
      }
    })

    if (!isValid) {
      announce('Please fix the errors before calculating', true)
      return
    }

    try {
      await onCalculate(values)
      announce('Calculation completed')
    } catch (error) {
      announce('Error in calculation', true)
      console.error('Calculation error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formula.variables).map(([key, variable]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{variable.label}</Label>
          {renderInput(key, variable)}
          {variable.helpText && (
            <p className="text-sm text-gray-500">{variable.helpText}</p>
          )}
          {errors[key] && (
            <p className="text-sm text-red-500">{errors[key]}</p>
          )}
        </div>
      ))}
      <Button 
        type="submit" 
        className="w-full mt-6" 
        disabled={isCalculating || Object.keys(errors).length > 0}
      >
        {isCalculating ? 'Calculating...' : 'Calculate'}
      </Button>
    </form>
  )
}