export function generateCalculatorMetaDescription(calculator: {
  name: string
  description: string
  category: string
}) {
  return [
    `Use our free ${calculator.name.toLowerCase()} calculator to ${calculator.description.toLowerCase()}.`,
    `Part of our professional ${calculator.category} calculator suite.`,
    'Free, instant results with detailed explanations.'
  ].join(' ')
}

export function generateCategoryMetaDescription(category: 'roi' | 'financial') {
  const descriptions = {
    roi: 'Professional ROI calculators for measuring investment returns. Includes tools for business, real estate, marketing, and stock investments. Make data-driven investment decisions.',
    financial: 'Comprehensive financial calculators for personal finance planning. Tools for tax calculation, retirement planning, debt management, and investment analysis.'
  }

  return descriptions[category]
} 