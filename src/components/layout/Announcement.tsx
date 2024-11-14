'use client'

import { useEffect, useState } from 'react'

interface AnnouncementProps {
  message: string
  assertive?: boolean
}

export function Announcement({ message, assertive = false }: AnnouncementProps) {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    setAnnouncement(message)
    const timer = setTimeout(() => setAnnouncement(''), 1000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <div
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
} 