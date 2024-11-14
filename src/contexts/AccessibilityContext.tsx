'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface AccessibilityState {
  fontSize: number
  contrast: 'normal' | 'high'
  reducedMotion: boolean
  textSpacing: boolean
}

interface AccessibilityContextType {
  state: AccessibilityState
  setFontSize: (size: number) => void
  setContrast: (contrast: 'normal' | 'high') => void
  setReducedMotion: (reduced: boolean) => void
  setTextSpacing: (spacing: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

const defaultState: AccessibilityState = {
  fontSize: 16,
  contrast: 'normal',
  reducedMotion: false,
  textSpacing: false,
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility')
      return saved ? JSON.parse(saved) : defaultState
    }
    return defaultState
  })

  useEffect(() => {
    localStorage.setItem('accessibility', JSON.stringify(state))
    document.documentElement.style.fontSize = `${state.fontSize}px`
    document.documentElement.setAttribute('data-contrast', state.contrast)
    document.documentElement.classList.toggle('reduce-motion', state.reducedMotion)
    document.documentElement.classList.toggle('text-spacing', state.textSpacing)
  }, [state])

  const value = {
    state,
    setFontSize: (size: number) => setState(prev => ({ ...prev, fontSize: size })),
    setContrast: (contrast: 'normal' | 'high') => setState(prev => ({ ...prev, contrast })),
    setReducedMotion: (reduced: boolean) => setState(prev => ({ ...prev, reducedMotion: reduced })),
    setTextSpacing: (spacing: boolean) => setState(prev => ({ ...prev, textSpacing: spacing })),
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
} 