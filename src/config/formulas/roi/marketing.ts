import type { Formula } from '@/config/formulas/types'

interface MarketingRoiResult extends Record<string, number> {
  roi: number
  netProfit: number
  conversionRate: number
  costPerConversion: number
  [key: string]: number
}

export const marketingRoiCalculator: Formula<MarketingRoiResult> = {
  name: 'Marketing ROI Calculator',
  description: '',
  longDescription: `
    <p>The Marketing ROI Calculator helps you evaluate the effectiveness of your marketing campaigns by measuring the return on your marketing investments. This tool helps you track and analyze various marketing metrics to determine which campaigns are most profitable.</p>
    <p>Key metrics analyzed:</p>
    <ul>
      <li>Campaign revenue generation</li>
      <li>Cost per acquisition (CPA)</li>
      <li>Return on ad spend (ROAS)</li>
      <li>Customer lifetime value (CLV)</li>
      <li>Marketing efficiency ratio</li>
    </ul>
    <p>Understanding your marketing ROI helps you optimize your marketing budget and focus on the most effective channels and campaigns.</p>
  `,
  variables: {
    marketingCost: {
      label: 'Marketing Campaign Cost',
      type: 'currency',
      defaultValue: 5000,
      min: 0,
      step: 100,
      helpText: 'Total cost of marketing campaign'
    },
    revenue: {
      label: 'Revenue Generated',
      type: 'currency',
      defaultValue: 15000,
      min: 0,
      step: 100,
      helpText: 'Total revenue from campaign'
    },
    totalLeads: {
      label: 'Total Leads Generated',
      type: 'number',
      defaultValue: 1000,
      min: 0,
      step: 1,
      helpText: 'Number of leads generated'
    },
    conversions: {
      label: 'Number of Conversions',
      type: 'number',
      defaultValue: 100,
      min: 0,
      step: 1,
      helpText: 'Number of leads that converted to sales'
    }
  },
  calculate: (inputs) => {
    const { marketingCost, revenue, totalLeads, conversions } = inputs
    
    const netProfit = revenue - marketingCost
    const roi = (netProfit / marketingCost) * 100
    const conversionRate = (conversions / totalLeads) * 100
    const costPerConversion = marketingCost / conversions

    return {
      roi,
      netProfit,
      conversionRate,
      costPerConversion
    }
  },
  formatResult: (result) => {
    const formatter = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    })

    return `
Marketing Campaign Analysis:
------------------------
ROI: ${result.roi.toFixed(2)}%
Net Profit: ${formatter.format(result.netProfit)}
Conversion Rate: ${result.conversionRate.toFixed(2)}%
Cost per Conversion: ${formatter.format(result.costPerConversion)}
    `.trim()
  }
} 