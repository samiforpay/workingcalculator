'use client'

import { useState } from 'react'
import { Accessibility } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FocusTrap } from './FocusTrap'

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [contrast, setContrast] = useState('normal')

  const adjustFontSize = (size: number) => {
    setFontSize(size)
    document.documentElement.style.fontSize = `${size}px`
  }

  const adjustContrast = (mode: string) => {
    setContrast(mode)
    document.documentElement.setAttribute('data-contrast', mode)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <FocusTrap isActive={isOpen} onEscape={() => setIsOpen(false)}>
            <Card className="w-96" role="dialog" aria-labelledby="accessibility-title">
              <CardHeader>
                <CardTitle id="accessibility-title">Accessibility Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div role="group" aria-labelledby="text-size-label">
                    <h3 id="text-size-label" className="text-sm font-medium mb-2">Text Size</h3>
                    <div className="flex gap-2">
                      {[
                        { size: 14, label: 'Small' },
                        { size: 16, label: 'Medium' },
                        { size: 18, label: 'Large' },
                      ].map(({ size, label }) => (
                        <Button
                          key={size}
                          variant="outline"
                          size="sm"
                          onClick={() => adjustFontSize(size)}
                          aria-pressed={fontSize === size}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div role="group" aria-labelledby="contrast-label">
                    <h3 id="contrast-label" className="text-sm font-medium mb-2">Contrast</h3>
                    <div className="flex gap-2">
                      {[
                        { mode: 'normal', label: 'Normal' },
                        { mode: 'high', label: 'High' },
                      ].map(({ mode, label }) => (
                        <Button
                          key={mode}
                          variant="outline"
                          size="sm"
                          onClick={() => adjustContrast(mode)}
                          aria-pressed={contrast === mode}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FocusTrap>
        </div>
      )}
    </>
  )
} 