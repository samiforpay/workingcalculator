'use client'

import { useEffect, useState } from 'react'

export function FocusIndicator() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true)
        window.removeEventListener('keydown', handleFirstTab)
      }
    }

    window.addEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', () => setIsKeyboardUser(false))

    return () => {
      window.removeEventListener('keydown', handleFirstTab)
      window.removeEventListener('mousedown', () => setIsKeyboardUser(false))
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('keyboard-user', isKeyboardUser)
  }, [isKeyboardUser])

  return null
} 