'use client'

import { useState, useEffect } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { roiCalculators, financialCalculators } from '@/config/calculators'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const allCalculators = [...roiCalculators, ...financialCalculators]

  const filteredCalculators = allCalculators.filter(calc => 
    calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="md:w-auto"
      >
        <SearchIcon className="h-5 w-5" />
        <span className="sr-only">Search calculators</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg p-4 z-50">
          <Input
            type="search"
            placeholder="Search calculators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
            autoFocus
          />
          <div className="max-h-96 overflow-y-auto">
            {filteredCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="block p-2 hover:bg-gray-100 rounded-md"
                onClick={() => {
                  setIsOpen(false)
                  setSearchTerm('')
                }}
              >
                <div className="flex items-center">
                  <calc.icon className="h-5 w-5 mr-2" />
                  <div>
                    <div className="font-medium">{calc.name}</div>
                    <div className="text-sm text-gray-500">{calc.description}</div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredCalculators.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No calculators found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 