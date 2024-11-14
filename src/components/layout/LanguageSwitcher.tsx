'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAnnouncement } from '@/contexts/AnnouncementContext'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
]

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const { announce } = useAnnouncement()

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)
    const langName = languages.find(l => l.code === langCode)?.name
    announce(`Language changed to ${langName}`)
    // Here you would typically update the app's language context/state
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <Globe className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-48 z-50">
          <CardContent className="p-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                className={`w-full justify-start ${
                  currentLang === lang.code ? 'bg-accent' : ''
                }`}
                onClick={() => handleLanguageChange(lang.code)}
                aria-current={currentLang === lang.code}
              >
                {lang.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 