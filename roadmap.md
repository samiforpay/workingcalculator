Phase 1: Design
Here is the design of the homepage:
import Head from 'next/head'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Coins, PiggyBank, Wallet, TrendingUp, Home, Shield, Target, BarChart, FileText, PieChart, Building, Megaphone, Briefcase, LineChart } from 'lucide-react'

const roiCalculators = [
  { name: 'General ROI', icon: Calculator, href: '/roi/general', color: 'bg-blue-100 text-blue-600', description: 'Calculate return on investment for various scenarios.' },
  { name: 'Real Estate ROI', icon: Building, href: '/roi/real-estate', color: 'bg-green-100 text-green-600', description: 'Evaluate potential returns on real estate investments.' },
  { name: 'Marketing ROI', icon: Megaphone, href: '/roi/marketing', color: 'bg-yellow-100 text-yellow-600', description: 'Measure the effectiveness of your marketing campaigns.' },
  { name: 'Business ROI', icon: Briefcase, href: '/roi/business', color: 'bg-purple-100 text-purple-600', description: 'Assess the profitability of business investments.' },
  { name: 'Stock Investment ROI', icon: LineChart, href: '/roi/stock', color: 'bg-red-100 text-red-600', description: 'Calculate returns on stock market investments.' },
]

const calculators = [
  { name: 'Capital Gains Tax', icon: Coins, href: '/capital-gains-tax', color: 'bg-green-500', description: 'Estimate your capital gains tax liability.', bgImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80' },
  { name: 'Wealth Tax', icon: Wallet, href: '/wealth-tax', color: 'bg-purple-500', description: 'Calculate potential wealth tax based on your assets.', bgImage: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=300&q=80' },
  { name: 'Retirement Savings', icon: PiggyBank, href: '/retirement-savings', color: 'bg-yellow-500', description: 'Plan for your retirement with our savings calculator.', bgImage: 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?auto=format&fit=crop&w=300&q=80' },
  { name: 'Debt Repayment', icon: Calculator, href: '/debt-repayment', color: 'bg-red-500', description: 'Create a plan to become debt-free faster.', bgImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80' },
  { name: 'Investment Growth', icon: TrendingUp, href: '/investment-growth', color: 'bg-indigo-500', description: 'Project your investment growth over time.', bgImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=300&q=80' },
  { name: 'Net Worth', icon: BarChart, href: '/net-worth', color: 'bg-pink-500', description: 'Calculate and track your net worth.', bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80' },
  { name: 'Home Affordability', icon: Home, href: '/home-affordability', color: 'bg-teal-500', description: 'Determine how much home you can afford.', bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80' },
  { name: 'Emergency Fund', icon: Shield, href: '/emergency-fund', color: 'bg-orange-500', description: 'Calculate how much you need for emergencies.', bgImage: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=300&q=80' },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Your Financial Tools - Comprehensive Financial Calculators</title>
        <meta name="description" content="Your Financial Tools offers a comprehensive suite of financial calculators to help you make informed decisions about your money, investments, and financial future." />
        <link rel="canonical" href="https://yourfinancialtools.com" />
        <meta property="og:title" content="Your Financial Tools - Comprehensive Financial Calculators" />
        <meta property="og:description" content="Make informed financial decisions with Your Financial Tools' suite of calculators." />
        <meta property="og:url" content="https://yourfinancialtools.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Your Financial Tools",
              "url": "https://yourfinancialtools.com",
              "description": "Comprehensive suite of financial calculators",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://yourfinancialtools.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-gray-800 flex items-center">
                <Calculator className="h-8 w-8 mr-2 text-blue-500" />
                <span>Your Financial Tools</span>
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">About</Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Contact</Link>
                <Link href="/blog" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Blog</Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Your Financial Tools</h1>
          
          <Card className="mb-12 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="text-3xl font-bold">ROI Calculators</CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Comprehensive Return on Investment calculations for various scenarios. Choose the calculator that best fits your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roiCalculators.map((calc) => (
                  <Card key={calc.name} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardHeader className={`${calc.color}`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold">{calc.name}</CardTitle>
                        <calc.icon className="h-6 w-6" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 mb-4">{calc.description}</p>
                      <Link href={calc.href}>
                        <Button className="w-full">
                          Calculate
                          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">More Financial Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {calculators.map((calc) => (
              <Link href={calc.href} key={calc.name} className="group">
                <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className={`${calc.color} p-6 flex justify-between items-center group-hover:scale-105 transition-transform duration-300 relative`}>
                    <h3 className="text-lg font-semibold text-white z-10">{calc.name}</h3>
                    <calc.icon className="h-6 w-6 text-white z-10" />
                    <div 
                      className="absolute inset-0 opacity-20 bg-no-repeat bg-cover bg-center transition-opacity duration-300 group-hover:opacity-30" 
                      style={{
                        backgroundImage: `url(${calc.bgImage})`,
                      }}
                    ></div>
                  </div>
                  <CardContent className="flex-grow flex flex-col justify-between p-4 bg-white">
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{calc.description}</p>
                    <Button variant="outline" size="sm" className="w-full justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      Calculate
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <section className="mt-20 bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Your Financial Tools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accurate Calculations</h3>
                <p className="text-gray-600">Our calculators use the latest financial formulas to ensure accuracy.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your financial data is never stored or shared. Calculate with confidence.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Up-to-Date</h3>
                <p className="text-gray-600">Our calculators are regularly updated to reflect the latest financial regulations.</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white mt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link href="/" className="text-2xl font-bold flex items-center">
                  <Calculator className="h-8 w-8 mr-2 text-blue-400" />
                  <span>Your Financial Tools</span>
                </Link>
                <p className="mt-2 text-gray-400">Your trusted financial calculation partner</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4">
                <Link href="/about" className="hover:text-blue-400 transition-colors duration-300">About</Link>
                <Link href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</Link>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</Link>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-400">
              <p>© 2023 Your Financial Tools. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
Navigation will be like this homepage -> Main Calculator Page i.e. Capital Gains Tax Calculator
homepage -> Main Calculator Page -> Sub calculator page i.e. ROI Calculator -> General ROI Calculator
The design for the Main Calculator page is as below:
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Coins, Calculator } from 'lucide-react'

export default function CapitalGainsTaxCalculator() {
  const [initialValue, setInitialValue] = useState('')
  const [finalValue, setFinalValue] = useState('')
  const [taxRate, setTaxRate] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculateTax = () => {
    const initial = parseFloat(initialValue)
    const final = parseFloat(finalValue)
    const rate = parseFloat(taxRate)

    if (isNaN(initial) || isNaN(final) || isNaN(rate)) {
      alert('Please enter valid numbers')
      return
    }

    const gain = final - initial
    const tax = gain * (rate / 100)
    setResult(tax)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-800 flex items-center">
              <Calculator className="h-8 w-8 mr-2 text-blue-500" />
              <span>Your Financial Tools</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Contact</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">Blog</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <Card className="max-w-2xl mx-auto overflow-hidden">
          <div className="bg-blue-500 p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Capital Gains Tax Calculator</h1>
            <Coins className="h-8 w-8 text-white" />
          </div>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-6">Estimate your capital gains tax liability with our easy-to-use calculator.</p>
            <form onSubmit={(e) => { e.preventDefault(); calculateTax(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialValue">Initial Investment Value ($)</Label>
                <Input
                  id="initialValue"
                  type="number"
                  value={initialValue}
                  onChange={(e) => setInitialValue(e.target.value)}
                  placeholder="e.g., 10000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalValue">Final Investment Value ($)</Label>
                <Input
                  id="finalValue"
                  type="number"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                  placeholder="e.g., 15000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="e.g., 15"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Calculate</Button>
            </form>
            {result !== null && (
              <div className="mt-6 p-4 bg-green-100 rounded-md">
                <p className="text-lg font-semibold text-green-800">Estimated Capital Gains Tax: ${result.toFixed(2)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-white mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold flex items-center">
                <Calculator className="h-8 w-8 mr-2 text-blue-400" />
                <span>Your Financial Tools</span>
              </Link>
              <p className="mt-2 text-gray-400">Your trusted financial calculation partner</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4">
              <Link href="/about" className="hover:text-blue-400 transition-colors duration-300">About</Link>
              <Link href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>© 2023 Your Financial Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
The subcategory page layout will be similar to the main page layout
Phase 2:
Make all the calculations configurable so I can easily update the rates/forumlas later on. For example if Marketing ROI=(Revenue from Marketing−Cost of Marketing)/ Cost of Marketing×100 it should be placed easily in a file where I can replace 100 by 200 or Cost of Marketing with Revenue from Marketing.
Please make sure that Main Calculator Page -> Sub calculator page are dynamic and I can add more sub categories later on by adding a simple line
I am going to give you some sample code snippets on how to calculate them
Code Snippets----------------------------------
1. Capital Gains Tax Calculator
How to Calculate:
•	Determine Your Basis: This is generally the purchase price plus any commissions or fees.
•	Determine Your Realized Amount: This is the sale price minus any commissions or fees.
•	Calculate Capital Gain:
Capital Gain=Realized Amount−BasisCapital Gain=Realized Amount−Basis
•	Determine Tax Rate: Based on income brackets for long-term (held over a year) or short-term (held less than a year) gains.
Code Snippet:
javascript
function calculateCapitalGainsTax(basis, salePrice, taxRate) {
    const realizedAmount = salePrice; // Sale price minus any fees
    const capitalGain = realizedAmount - basis;
    const taxOwed = capitalGain > 0 ? capitalGain * taxRate : 0;
    return {
        capitalGain,
        taxOwed
    };
}

// Example usage:
const result = calculateCapitalGainsTax(10000, 15000, 0.15); // Long-term capital gains tax rate
console.log(result); // { capitalGain: 5000, taxOwed: 750 }
2. Wealth Tax Calculator
How to Calculate:
•	Determine Total Assets: Include all assets such as cash, property, stocks, etc.
•	Determine Liabilities: Include all debts such as mortgages, loans, etc.
•	Calculate Net Worth:
Net Worth=Total Assets−LiabilitiesNet Worth=Total Assets−Liabilities
•	Calculate Wealth Tax (if applicable):
Wealth Tax=Net Worth×Wealth Tax RateWealth Tax=Net Worth×Wealth Tax Rate
Code Snippet:
javascript
function calculateWealthTax(totalAssets, liabilities, taxRate) {
    const netWorth = totalAssets - liabilities;
    const wealthTax = netWorth > 0 ? netWorth * taxRate : 0;
    return {
        netWorth,
        wealthTax
    };
}

// Example usage:
const wealthResult = calculateWealthTax(500000, 200000, 0.01); // Wealth tax rate of 1%
console.log(wealthResult); // { netWorth: 300000, wealthTax: 3000 }
ROI Calculators
General ROI Calculator
How to Calculate:
ROI=Investment Gains−Initial Investment CostsTotal Cost×100ROI=Total CostInvestment Gains−Initial Investment Costs×100
Code Snippet:
javascript
function calculateROI(investmentGains, initialInvestmentCosts) {
    const roi = ((investmentGains - initialInvestmentCosts) / initialInvestmentCosts) * 100;
    return roi;
}

// Example usage:
const roiResult = calculateROI(15000, 10000);
console.log(`ROI: ${roiResult}%`); // ROI: 50%
Real Estate ROI Calculator
How to Calculate:
Use the same formula as the general ROI calculator but consider specific costs associated with real estate.
Marketing ROI Calculator
How to Calculate:
Marketing ROI=Revenue from Marketing−Cost of MarketingCost of Marketing×100Marketing ROI=Cost of MarketingRevenue from Marketing−Cost of Marketing×100
Business ROI Calculator
How to Calculate:
Similar to general ROI but focused on business investments.
Stock Investment ROI Calculator
How to Calculate:
Use the general ROI formula considering dividends and trading costs.
End Code Snippets----------------------------------

Phase 3: Navigation fixes
•	1. **Optimize Metadata and Structured Data**:
•	   - Implement `<head>` tags with dynamic metadata (title, description) based on the page content using Next.js’s `Head` component.
•	   - Add JSON-LD structured data for each page (especially individual service pages) to enhance search engine visibility.
•	2. **Server-Side SEO Enhancements**:
•	   - Set up canonical tags for pages to avoid duplicate content issues.
•	   - Add Open Graph and Twitter Card tags for better social sharing, useful for both users and search engine previews.
•	3. **Sitemap and Robots.txt Generation**:
•	   - Generate dynamic `sitemap.xml` and `robots.txt` using tools like `next-sitemap` to ensure all pages are indexed and crawled effectively.
•	Go through and check navigation of all main calculators and sub calculators
•	Make sure all of the main calculators are made and are accessible through the main page.
•	Make sure headers on all pages have working links
Phase 4: Descriptions and SEO

•	Insert the keyword in the title of each calculator and sub-calculator, the description and subheadings etc
•	Move the main calculator after paragraph 1
•	Write some content about how to use the tool, including the title in each heading, subheading, and relevant entities throughout the page, referencing that the tool is on the page – 
•	Include atleast 10 valid FAQs answering relevant questions about the calculator. Search for these questions and answers on quora if possible. 
Make these FAQs congifurable as well so I just can add/remove them via a file(better that you have separate file for each calculator 
•	Write the content in first person as Alexandre Brekke, SEO Expert, in simple 1st grade language
•	1. **Optimize Page Load Speed**:
•	   - Use lazy loading for images and components not needed initially.
•	   - Apply Next.js’s `Image` component for optimized, responsive images and compressed image loading.
•	2. **Run Lighthouse Audits**:
•	   - Regularly perform SEO audits using Google Lighthouse or similar tools to identify and resolve issues with speed, accessibility, and SEO compliance.
•	3. **Cache and CDN Setup**:
•	   - Leverage Next.js’s built-in caching and a CDN to serve static assets quickly, improving both user experience and Google rankings.
•	**Manual Testing**:
•	   - Verify that pages render correctly and that API calls are efficient.
•	   - Test various locations and services to ensure they are fetched and displayed properly.
•	2. **SEO Quality Checks**:
•	   - Use Google’s Rich Results Test to confirm structured data compliance.
•	   - Ensure meta tags, headers, and internal linking strategies align with SEO best practices

Phase 5: Verify Everything
Please check the following
Check if the UI of homepage is the same as I gave in phase 1 and working
Check if the UI of calculator pages  is the same as I gave in phase 1 and working
Are all the calculator pages working with proper formulas applied
Are all calculator pages accessible from the homepage 
Do all calculator pages have proper headings, descritpions and atleast 10 FAQs?
Can we add more FAQs via config without doing any coding?

Phase 6: Final Checkups
Please check and replace any placeholder code with actual ones
Check if all calculator forumlas elements have a UI counterpart and all UI is updated
