import { calculatorFormulas } from '@/config/formulas'
import { generatePageMetadata } from '@/components/seo/PageSEO'
import type { CalculatorPath, Formula } from '@/config/formulas/types'

interface CalculatorPageProps {
  params: {
    calculator: string
  }
}

export async function generateMetadata({ params }: CalculatorPageProps) {
  const calculatorPath = params.calculator as CalculatorPath
  const formula = calculatorFormulas[calculatorPath] as unknown as Formula
  if (!formula) return {}

  return generatePageMetadata({
    title: formula.name,
    description: formula.description,
    keywords: [formula.name.toLowerCase(), 'calculator', 'financial tool'],
    type: 'website'
  })
} 