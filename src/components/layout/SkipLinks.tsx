export function SkipLinks() {
  return (
    <div className="fixed top-0 left-0 p-4 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-4 focus:shadow-lg focus:rounded-md"
      >
        Skip to main content
      </a>
      <a
        href="#calculator"
        className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-4 focus:shadow-lg focus:rounded-md focus:ml-4"
      >
        Skip to calculator
      </a>
    </div>
  )
} 