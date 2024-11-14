import { roiCalculators, financialCalculators } from './calculators'

export const calculatorSEO = {
  'roi': {
    title: 'ROI Calculators - Return on Investment Tools',
    description: 'Calculate return on investment with our comprehensive suite of ROI calculators. Make informed investment decisions with accurate ROI analysis.',
    keywords: ['ROI calculator', 'return on investment', 'investment calculator', 'ROI analysis'],
  },
  'financial': {
    title: 'Financial Calculators - Personal Finance Tools',
    description: 'Free financial calculators for personal finance, investments, taxes, and retirement planning. Make better financial decisions with our tools.',
    keywords: ['financial calculator', 'personal finance', 'investment tools', 'tax calculator'],
  },
  // Individual calculator SEO
  ...roiCalculators.reduce((acc, calc) => ({
    ...acc,
    [calc.href.replace('/', '')]: {
      title: `${calc.name} Calculator - Free Online Tool`,
      description: `${calc.description} Use our free online calculator to get accurate results.`,
      keywords: [calc.name.toLowerCase(), 'calculator', 'online tool', 'free calculator'],
    }
  }), {}),
  ...financialCalculators.reduce((acc, calc) => ({
    ...acc,
    [calc.href.replace('/', '')]: {
      title: `${calc.name} Calculator - Free Financial Tool`,
      description: `${calc.description} Get instant results with our easy-to-use calculator.`,
      keywords: [calc.name.toLowerCase(), 'calculator', 'financial tool', 'online calculator'],
    }
  }), {})
} 