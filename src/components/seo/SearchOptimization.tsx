'use client'

import { useEffect } from 'react'
import { roiCalculators, financialCalculators } from '@/config/calculators'
import { siteConfig } from '@/config/metadata'

export function SearchOptimization() {
  useEffect(() => {
    // Generate SearchAction schema
    const searchSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: siteConfig.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }

    // Generate ItemList schema for all calculators
    const calculatorListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [...roiCalculators, ...financialCalculators].map((calc, index) => ({
        '@type': 'SoftwareApplication',
        position: index + 1,
        name: calc.name,
        description: calc.description,
        applicationCategory: 'FinanceApplication',
        url: `${siteConfig.url}${calc.href}`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }))
    }

    // Add schema to head
    const searchScript = document.createElement('script')
    searchScript.type = 'application/ld+json'
    searchScript.text = JSON.stringify(searchSchema)
    document.head.appendChild(searchScript)

    const listScript = document.createElement('script')
    listScript.type = 'application/ld+json'
    listScript.text = JSON.stringify(calculatorListSchema)
    document.head.appendChild(listScript)

    return () => {
      document.head.removeChild(searchScript)
      document.head.removeChild(listScript)
    }
  }, [])

  return null
} 