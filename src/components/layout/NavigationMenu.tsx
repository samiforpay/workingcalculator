'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    label: 'ROI Calculators',
    href: '/#roi-calculators',
    pattern: /^\/roi\//
  },
  {
    label: 'Financial Calculators',
    href: '/#financial-calculators',
    pattern: /^\/(capital-gains-tax|wealth-tax|retirement-savings|investment-growth)/
  },
  {
    label: 'About',
    href: '/about',
    pattern: /^\/about/
  },
  {
    label: 'Blog',
    href: '/blog',
    pattern: /^\/blog/
  },
  {
    label: 'Contact',
    href: '/contact',
    pattern: /^\/contact/
  }
]

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex space-x-6">
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "text-gray-600 hover:text-gray-900 transition-colors duration-200",
            item.pattern.test(pathname) && "text-blue-600 font-medium"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
} 