'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  {
    id: 'roi',
    name: 'ROI Calculators',
    href: '/#roi-calculators',
    pattern: /^\/roi\//
  },
  {
    id: 'tax',
    name: 'Tax Calculators',
    href: '/#tax-calculators',
    pattern: /^\/(capital-gains-tax|wealth-tax)/
  },
  {
    id: 'investment',
    name: 'Investment Calculators',
    href: '/#investment-calculators',
    pattern: /^\/(investment-growth|retirement-savings)/
  },
  {
    id: 'debt',
    name: 'Debt Calculators',
    href: '/#debt-calculators',
    pattern: /^\/debt-/
  }
]

export function CategoryNav() {
  const pathname = usePathname()
  const currentCategory = categories.find(cat => cat.pattern.test(pathname))

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-6">
        <div className="flex overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={cn(
                "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200",
                category === currentCategory
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 