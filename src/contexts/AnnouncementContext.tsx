'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AnnouncementContextType {
  announce: (message: string, isError?: boolean) => void
  message: string | null
  isError: boolean
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined)

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const announce = (message: string, isError: boolean = false) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <AnnouncementContext.Provider value={{ announce, message, isError }}>
      {children}
      {message && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
          isError ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'
        }`}>
          {message}
        </div>
      )}
    </AnnouncementContext.Provider>
  )
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext)
  if (context === undefined) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider')
  }
  return context
} 