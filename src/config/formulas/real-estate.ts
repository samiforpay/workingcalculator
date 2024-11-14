import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { FormulaConfig } from './types'

export const realEstateFormulas: FormulaConfig = {
  'real-estate-investment': {
    name: 'Real Estate Investment Calculator',
    description: 'Calculate potential returns from real estate investments including rental income and appreciation',
    variables: {
      purchasePrice: {
        label: 'Purchase Price',
        type: 'currency',
        defaultValue: 300000,
        min: 0,
        helpText: 'Total property purchase price'
      },
      downPayment: {
        label: 'Down Payment',
        type: 'currency',
        defaultValue: 60000,
        min: 0,
        helpText: 'Initial down payment amount'
      },
      loanTerm: {
        label: 'Loan Term (Years)',
        type: 'number',
        defaultValue: 30,
        min: 1,
        max: 30,
        helpText: 'Length of mortgage loan'
      },
      interestRate: {
        label: 'Annual Interest Rate',
        type: 'percentage',
        defaultValue: 6.5,
        min: 0,
        max: 20,
        step: 0.125,
        helpText: 'Mortgage interest rate'
      },
      monthlyRent: {
        label: 'Monthly Rental Income',
        type: 'currency',
        defaultValue: 2500,
        min: 0,
        helpText: 'Expected monthly rental income'
      },
      propertyTax: {
        label: 'Annual Property Tax',
        type: 'currency',
        defaultValue: 3600,
        min: 0,
        helpText: 'Annual property tax amount'
      },
      insurance: {
        label: 'Annual Insurance',
        type: 'currency',
        defaultValue: 1200,
        min: 0,
        helpText: 'Annual property insurance cost'
      },
      maintenancePercent: {
        label: 'Annual Maintenance (%)',
        type: 'percentage',
        defaultValue: 1,
        min: 0,
        max: 10,
        step: 0.1,
        helpText: 'Expected maintenance costs as percentage of property value'
      },
      vacancyRate: {
        label: 'Vacancy Rate (%)',
        type: 'percentage',
        defaultValue: 5,
        min: 0,
        max: 100,
        step: 1,
        helpText: 'Expected percentage of time property is vacant'
      },
      appreciationRate: {
        label: 'Annual Appreciation Rate (%)',
        type: 'percentage',
        defaultValue: 3,
        min: -10,
        max: 20,
        step: 0.1,
        helpText: 'Expected annual property value increase'
      },
      holdingPeriod: {
        label: 'Holding Period (Years)',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 30,
        helpText: 'How long you plan to keep the property'
      }
    },
    calculate: (inputs) => {
      const {
        purchasePrice,
        downPayment,
        loanTerm,
        interestRate,
        monthlyRent,
        propertyTax,
        insurance,
        maintenancePercent,
        vacancyRate,
        appreciationRate,
        holdingPeriod
      } = inputs

      // Calculate loan details
      const loanAmount = purchasePrice - downPayment
      const monthlyRate = interestRate / 100 / 12
      const numberOfPayments = loanTerm * 12
      const monthlyMortgage = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

      // Calculate annual expenses
      const annualMortgage = monthlyMortgage * 12
      const annualMaintenance = (purchasePrice * maintenancePercent) / 100
      const annualExpenses = annualMortgage + propertyTax + insurance + annualMaintenance

      // Calculate annual income
      const potentialRentalIncome = monthlyRent * 12
      const vacancyLoss = potentialRentalIncome * (vacancyRate / 100)
      const effectiveRentalIncome = potentialRentalIncome - vacancyLoss

      // Calculate cash flow
      const annualCashFlow = effectiveRentalIncome - annualExpenses

      // Calculate future value
      const futureValue = purchasePrice * Math.pow(1 + (appreciationRate / 100), holdingPeriod)
      const totalAppreciation = futureValue - purchasePrice

      // Calculate returns
      const totalInvestment = downPayment
      const totalRentalIncome = effectiveRentalIncome * holdingPeriod
      const totalExpenses = annualExpenses * holdingPeriod
      const totalProfit = totalRentalIncome - totalExpenses + totalAppreciation

      return {
        monthlyMortgage,
        annualCashFlow,
        futureValue,
        totalAppreciation,
        cashOnCashReturn: (annualCashFlow / downPayment) * 100,
        totalROI: (totalProfit / totalInvestment) * 100,
        capRate: ((effectiveRentalIncome - (annualExpenses - annualMortgage)) / purchasePrice) * 100
      }
    },
    formatResult: (result) => {
      const {
        monthlyMortgage,
        annualCashFlow,
        futureValue,
        totalAppreciation,
        cashOnCashReturn,
        totalROI,
        capRate
      } = result

      return `Monthly Mortgage Payment: ${formatCurrency(monthlyMortgage)}
Annual Cash Flow: ${formatCurrency(annualCashFlow)}
Future Property Value: ${formatCurrency(futureValue)}
Total Appreciation: ${formatCurrency(totalAppreciation)}
Cash-on-Cash Return: ${formatPercentage(cashOnCashReturn)}
Total ROI: ${formatPercentage(totalROI)}
Cap Rate: ${formatPercentage(capRate)}`
    }
  }
} 