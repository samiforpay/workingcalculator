'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 space-y-4">
          <Link 
            href="/about" 
            className="block text-gray-600 hover:text-gray-800 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block text-gray-600 hover:text-gray-800 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/blog" 
            className="block text-gray-600 hover:text-gray-800 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
        </div>
      )}
    </div>
  )
} 