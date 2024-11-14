export const calculatorFAQs = {
  roi: [
    {
      question: "What is ROI?",
      answer: "ROI (Return on Investment) is a performance measure used to evaluate the efficiency of an investment. It is calculated by dividing the benefit (return) of an investment by its cost."
    },
    {
      question: "How do you calculate ROI?",
      answer: "ROI is calculated using the formula: ROI = (Net Return / Cost of Investment) × 100. For example, if you invest $1000 and receive $1500 back, your ROI would be (($1500 - $1000) / $1000) × 100 = 50%."
    }
  ],
  financial: [
    {
      question: "What is compound interest?",
      answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This means your money grows exponentially over time."
    },
    {
      question: "How much should I save for retirement?",
      answer: "A general rule of thumb is to save 10-15% of your gross income for retirement. However, the exact amount depends on factors like your age, desired retirement lifestyle, and expected retirement age."
    }
  ]
}

export function generateFAQSchema(category: 'roi' | 'financial') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calculatorFAQs[category].map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
} 