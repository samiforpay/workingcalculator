import type { Formula } from '@/config/formulas/types'

interface PropertyValueResult extends Record<string, number> {
  estimatedValue: number
  pricePerSqFt: number
  landValue: number
  buildingValue: number
  appreciationValue: number
  totalAppreciation: number
  annualAppreciation: number
  monthlyAppreciation: number
}

export const propertyValueCalculator: Formula<PropertyValueResult> = {
  name: 'Property Value Calculator',
  description: 'Estimate property value and potential appreciation',
  variables: {
    purchasePrice: {
      label: 'Purchase Price',
      type: 'currency',
      defaultValue: 300000,
      min: 0,
      step: 1000,
      helpText: 'Original purchase price of the property'
    },
    squareFootage: {
      label: 'Square Footage',
      type: 'number',
      defaultValue: 2000,
      min: 0,
      step: 10,
      helpText: 'Total living area in square feet'
    },
    lotSize: {
      label: 'Lot Size (Acres)',
      type: 'number',
      defaultValue: 0.25,
      min: 0,
      step: 0.01,
      helpText: 'Size of the lot in acres'
    },
    yearBuilt: {
      label: 'Year Built',
      type: 'number',
      defaultValue: 1990,
      min: 1800,
      max: new Date().getFullYear(),
      step: 1,
      helpText: 'Year the property was built'
    },
    appreciationRate: {
      label: 'Annual Appreciation Rate',
      type: 'percentage',
      defaultValue: 3,
      min: -20,
      max: 20,
      step: 0.1,
      helpText: 'Expected annual appreciation rate'
    },
    yearsToProject: {
      label: 'Years to Project',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 30,
      step: 1,
      helpText: 'Number of years to project value'
    },
    landValuePercent: {
      label: 'Land Value Percentage',
      type: 'percentage',
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 1,
      helpText: 'Percentage of total value that is land'
    }
  },
  calculate: (inputs) => {
    const {
      purchasePrice,
      squareFootage,
      lotSize,
      yearBuilt,
      appreciationRate,
      yearsToProject,
      landValuePercent
    } = inputs

    // Calculate price per square foot
    const pricePerSqFt = purchasePrice / squareFootage

    // Calculate land and building values
    const landValue = (purchasePrice * landValuePercent) / 100
    const buildingValue = purchasePrice - landValue

    // Calculate appreciation
    const appreciationFactor = Math.pow(1 + (appreciationRate / 100), yearsToProject)
    const estimatedValue = purchasePrice * appreciationFactor
    const appreciationValue = estimatedValue - purchasePrice
    
    // Calculate annual and monthly appreciation
    const totalAppreciation = (appreciationValue / purchasePrice) * 100
    const annualAppreciation = appreciationValue / yearsToProject
    const monthlyAppreciation = annualAppreciation / 12

    return {
      estimatedValue,
      pricePerSqFt,
      landValue,
      buildingValue,
      appreciationValue,
      totalAppreciation,
      annualAppreciation,
      monthlyAppreciation
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    const {
      estimatedValue,
      pricePerSqFt,
      landValue,
      buildingValue,
      appreciationValue,
      totalAppreciation,
      annualAppreciation,
      monthlyAppreciation
    } = result

    return `
Property Value Analysis:
---------------------
Current Value Breakdown:
Price per Sq Ft: ${formatter.format(pricePerSqFt)}
Land Value: ${formatter.format(landValue)}
Building Value: ${formatter.format(buildingValue)}

Future Value Projection:
---------------------
Estimated Future Value: ${formatter.format(estimatedValue)}
Total Appreciation: ${formatter.format(appreciationValue)} (${totalAppreciation.toFixed(1)}%)
Annual Appreciation: ${formatter.format(annualAppreciation)}
Monthly Appreciation: ${formatter.format(monthlyAppreciation)}
    `.trim()
  }
} 