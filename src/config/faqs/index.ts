import { roiFAQs } from './roi'
import { financialFAQs } from './financial'
import { taxFAQs } from './tax'
import { wealthFAQs } from './wealth'
import { investmentFAQs } from './investment'
import { retirementFAQs } from './retirement'
import { debtFAQs } from './debt'
import { emergencyFAQs } from './emergency'
import { homeFAQs } from './home'

export interface FAQ {
  question: string
  answer: string
}

export const calculatorFAQs = {
  'roi/general': roiFAQs,
  'roi/real-estate': roiFAQs,
  'roi/marketing': roiFAQs,
  'roi/business': roiFAQs,
  'roi/stock': roiFAQs,
  'capital-gains-tax': taxFAQs,
  'wealth-tax': wealthFAQs,
  'retirement-savings': retirementFAQs,
  'debt-repayment': debtFAQs,
  'investment-growth': investmentFAQs,
  'net-worth': wealthFAQs,
  'home-affordability': homeFAQs,
  'emergency-fund': emergencyFAQs
} as const

export type FAQCategory = keyof typeof calculatorFAQs

export function generateFAQSchema(calculatorPath: FAQCategory) {
  const faqs = calculatorFAQs[calculatorPath] || []
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
} 