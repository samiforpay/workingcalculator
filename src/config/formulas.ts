export interface CalculatorFormula {
  name: string
  formula: string
  variables: Record<string, {
    label: string
    type: 'number' | 'percentage'
    defaultValue?: number
  }>
  calculate: (inputs: Record<string, number>) => number | Record<string, number>
}

export const calculatorFormulas: Record<string, CalculatorFormula> = {
  'capital-gains-tax': {
    name: 'Capital Gains Tax',
    formula: 'taxOwed = (salePrice - basis) * taxRate',
    variables: {
      basis: {
        label: 'Initial Investment Value ($)',
        type: 'number',
      },
      salePrice: {
        label: 'Final Investment Value ($)',
        type: 'number',
      },
      taxRate: {
        label: 'Tax Rate (%)',
        type: 'percentage',
        defaultValue: 15,
      },
    },
    calculate: ({ basis, salePrice, taxRate }) => {
      const capitalGain = salePrice - basis;
      const taxOwed = capitalGain > 0 ? capitalGain * (taxRate / 100) : 0;
      return {
        capitalGain,
        taxOwed,
      };
    },
  },
  // Add other calculator formulas here
}; 