import { roiFormulas } from '../roi'

describe('ROI Calculator', () => {
  const { 'roi/general': calculator } = roiFormulas

  it('calculates ROI correctly', () => {
    const inputs = {
      initialInvestment: 1000,
      finalValue: 1500
    }

    const result = calculator.calculate(inputs)
    expect(result.roi).toBe(50)
    expect(result.profit).toBe(500)
  })

  it('handles zero initial investment', () => {
    const inputs = {
      initialInvestment: 0,
      finalValue: 1000
    }

    expect(() => calculator.calculate(inputs)).toThrow('Initial investment cannot be zero')
  })

  it('formats results correctly', () => {
    const result = {
      roi: 50,
      profit: 500
    }

    const formatted = calculator.formatResult(result)
    expect(formatted).toContain('50%')
    expect(formatted).toContain('$500')
  })
}) 