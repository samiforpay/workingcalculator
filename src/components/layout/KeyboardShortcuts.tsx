'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const shortcuts = {
  'g h': '/', // Go Home
  'g c': '/#calculators', // Go to Calculators
  'g r': '/#roi-calculators', // Go to ROI Calculators
  'g f': '/#financial-calculators', // Go to Financial Calculators
  '/': 'search', // Focus search
  'esc': 'close', // Close modals/search
}

export function KeyboardShortcuts() {
  const router = useRouter()
  let keys: string[] = []

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      keys.push(e.key.toLowerCase())
      const shortcut = keys.join(' ')

      // Handle search shortcut
      if (shortcut === '/') {
        e.preventDefault()
        const searchInput = document.querySelector('[data-search-input]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
        keys = []
        return
      }

      // Handle navigation shortcuts
      if (shortcuts[shortcut as keyof typeof shortcuts]) {
        e.preventDefault()
        const destination = shortcuts[shortcut as keyof typeof shortcuts]
        if (destination === 'search') {
          const searchInput = document.querySelector('[data-search-input]') as HTMLInputElement
          if (searchInput) {
            searchInput.focus()
          }
        } else if (destination === 'close') {
          // Handle closing modals or search
          document.activeElement instanceof HTMLElement && document.activeElement.blur()
        } else {
          router.push(destination)
        }
        keys = []
      }

      // Reset keys after 1 second
      setTimeout(() => {
        keys = []
      }, 1000)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  return null
} 