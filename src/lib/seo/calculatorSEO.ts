import { calculators } from '@/config/calculators'
import { siteConfig } from '@/config/site'
import type { Variable } from '@/config/formulas/types'

export function generateCalculatorCollectionSchema(category: 'roi' | 'financial') {
  const categoryCalculators = calculators.filter(calc => calc.category === category)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.toUpperCase()} Calculators`,
    description: category === 'roi' 
      ? 'Professional ROI calculators for business, real estate, and marketing investments'
      : 'Comprehensive financial calculators for personal finance, investments, and taxes',
    url: `${siteConfig.url}/#${category}-calculators`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryCalculators.map((calc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: calc.name,
          description: calc.description,
          applicationCategory: 'FinanceApplication',
          url: `${siteConfig.url}${calc.href}`,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      }))
    }
  }
}

export function generateCalculatorHowToSchema({
  name,
  description,
  variables
}: {
  name: string
  description: string
  variables: Record<string, Variable>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${name} Calculator`,
    description: description,
    step: Object.entries(variables).map(([key, value], index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Enter ${value.label}`,
      text: value.helpText || `Input your ${value.label.toLowerCase()}`
    }))
  }
} 