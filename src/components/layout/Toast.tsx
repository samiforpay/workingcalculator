'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnnouncement } from '@/contexts/AnnouncementContext'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = 'info', duration = 5000, onClose }: ToastProps) {
  const { announce } = useAnnouncement()

  useEffect(() => {
    announce(message, type === 'error')
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClose, announce, type])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-800'
      case 'error':
        return 'bg-red-100 border-red-500 text-red-800'
      default:
        return 'bg-blue-100 border-blue-500 text-blue-800'
    }
  }

  return (
    <div
      role="alert"
      className={`fixed bottom-4 right-4 p-4 rounded-md border-l-4 shadow-lg ${getTypeStyles()}`}
    >
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="ml-4"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 