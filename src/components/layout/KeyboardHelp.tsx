'use client'

import { useState } from 'react'
import { Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function KeyboardHelp() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { keys: ['g', 'h'], description: 'Go to homepage' },
    { keys: ['g', 'c'], description: 'Go to calculators' },
    { keys: ['g', 'r'], description: 'Go to ROI calculators' },
    { keys: ['g', 'f'], description: 'Go to financial calculators' },
    { keys: ['/'], description: 'Focus search' },
    { keys: ['esc'], description: 'Close modals/search' },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-50"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Keyboard Shortcuts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {shortcuts.map(({ keys, description }) => (
                  <div key={keys.join('')} className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {keys.map((key) => (
                        <kbd
                          key={key}
                          className="px-2 py-1 text-sm font-semibold bg-gray-100 border border-gray-200 rounded"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{description}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
} 