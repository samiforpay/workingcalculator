import { inflationCalculator } from '@/config/formulas/financial/inflation'

import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'



export default function InflationPage() {

  try {

    return <CalculatorPageTemplate formula={inflationCalculator} />

  } catch (error) {

    console.error('Error rendering InflationPage:', error)

    return (

      <div className="p-4">

        <h1>Error loading calculator</h1>

        <p>There was a problem loading this calculator. Please try again later.</p>

      </div>

    )

  }

} 
