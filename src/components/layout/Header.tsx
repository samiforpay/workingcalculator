import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Link */}
          <Link to="/" className="text-xl font-bold text-primary hover:text-primary/90">
            Your Finance Calculators
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}