'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnnouncement } from '@/contexts/AnnouncementContext'
import type { Formula, Variable } from '@/config/formulas/types'

interface CalculatorFormProps {
  formula: Formula
  onCalculate: (inputs: Record<string, number>) => Promise<void>
  isCalculating?: boolean
}

export function CalculatorForm({ formula, onCalculate, isCalculating }: CalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<string, number>>(() => 
    Object.entries(formula.variables).reduce((acc, [key, variable]) => ({
      ...acc,
      [key]: variable.defaultValue
    }), {} as Record<string, number>)
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const { announce } = useAnnouncement()

  const shouldShowField = (key: string, variable: Variable): boolean => {
    if (!variable.dependsOn) return true
    
    const dependentValue = inputs[variable.dependsOn]
    if (variable.showWhen !== undefined) {
      return dependentValue === 1 && inputs[variable.dependsOn] === variable.showWhen
    }
    return dependentValue === 1
  }

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

  const handleInputChange = (key: string, variable: Variable, value: string | number | boolean) => {
    let numValue: number
    
    if (typeof value === 'boolean') {
      numValue = value ? 1 : 0
    } else {
      numValue = typeof value === 'string' ? parseFloat(value) : value
      if (isNaN(numValue)) return
    }

    if (validateInput(key, numValue, variable)) {
      setInputs(prev => ({ ...prev, [key]: numValue }))
    }
  }

  const renderInput = (key: string, variable: Variable) => {
    if (!shouldShowField(key, variable)) {
      return null
    }

    switch (variable.type) {
      case 'checkbox':
        return (
          <Checkbox
            id={key}
            checked={inputs[key] === 1}
            onCheckedChange={(checked) => handleInputChange(key, variable, checked)}
            disabled={isCalculating}
          />
        )

      case 'select':
        return (
          <Select
            value={inputs[key].toString()}
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

      case 'radio':
        return (
          <RadioGroup
            value={inputs[key].toString()}
            onValueChange={(value) => handleInputChange(key, variable, parseInt(value))}
            disabled={isCalculating}
          >
            {variable.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`${key}-${option.value}`} />
                <Label htmlFor={`${key}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      default:
        return (
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
          />
        )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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

  const renderField = (key: string, variable: Variable) => {
    if (!shouldShowField(key, variable)) {
      return null
    }

    return (
      <div key={key} className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor={key}>{variable.label}</Label>
          {renderInput(key, variable)}
        </div>
        {errors[key] && (
          <p id={`${key}-error`} className="text-sm text-red-500">
            {errors[key]}
          </p>
        )}
        {variable.helpText && (
          <p className="text-sm text-gray-500">{variable.helpText}</p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formula.variables).map(([key, variable]) => {
        if (variable.type === 'checkbox') {
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={key}>{variable.label}</Label>
                {renderInput(key, variable)}
              </div>
              {variable.helpText && (
                <p className="text-sm text-gray-500">{variable.helpText}</p>
              )}
            </div>
          )
        }
        return renderField(key, variable)
      })}
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