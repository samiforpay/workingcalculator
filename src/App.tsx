import { Routes, Route } from 'react-router-dom'
import HomePage from './app/page'

// Import all calculator pages
import RoiPage from './pages/calculators/RoiPage'
import GeneralRoiPage from './pages/calculators/GeneralRoiPage'
import RealEstateRoiPage from './pages/calculators/RealEstateRoiPage'
import MarketingRoiPage from './pages/calculators/MarketingRoiPage'
import BusinessRoiPage from './pages/calculators/BusinessRoiPage'

import TaxPage from './pages/calculators/TaxPage'
import IncomeTaxPage from './pages/calculators/IncomeTaxPage'
import CapitalGainsTaxPage from './pages/calculators/CapitalGainsTaxPage'
import WealthTaxPage from './pages/calculators/WealthTaxPage'

import RetirementPage from './pages/calculators/RetirementPage'
import RetirementSavingsPage from './pages/calculators/RetirementSavingsPage'

import DebtPage from './pages/calculators/DebtPage'
import DebtPayoffPage from './pages/calculators/DebtPayoffPage'
import CreditCardPayoffPage from './pages/calculators/CreditCardPayoffPage'

import MortgagePage from './pages/calculators/MortgagePage'
import BasicMortgagePage from './pages/calculators/BasicMortgagePage'
import RefinanceMortgagePage from './pages/calculators/RefinanceMortgagePage'

import EmergencyPage from './pages/calculators/EmergencyPage'
import EmergencyFundPage from './pages/calculators/EmergencyFundPage'

import BusinessPage from './pages/calculators/BusinessPage'
import BreakEvenPage from './pages/calculators/BreakEvenPage'

import InvestmentPage from './pages/calculators/InvestmentPage'
import InvestmentReturnsPage from './pages/calculators/InvestmentReturnsPage'
import PortfolioRebalancingPage from './pages/calculators/PortfolioRebalancingPage'

import FinancialPage from './pages/calculators/FinancialPage'
import CompoundInterestPage from './pages/calculators/CompoundInterestPage'
import InflationPage from './pages/calculators/InflationPage'
import SavingsGoalPage from './pages/calculators/SavingsGoalPage'
import SalesTaxPage from './pages/calculators/SalesTaxPage'
import PropertyTaxPage from './pages/calculators/PropertyTaxPage'
import RetirementContributionsPage from './pages/calculators/RetirementContributionsPage'
import QuarterlyTaxPage from './pages/calculators/QuarterlyTaxPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* ROI Calculator Routes */}
      <Route path="/calculator/roi" element={<RoiPage />} />
      <Route path="/calculator/roi/general" element={<GeneralRoiPage />} />
      <Route path="/calculator/roi/real-estate" element={<RealEstateRoiPage />} />
      <Route path="/calculator/roi/marketing" element={<MarketingRoiPage />} />
      <Route path="/calculator/roi/business" element={<BusinessRoiPage />} />

      {/* Tax Calculator Routes */}
      <Route path="/calculator/tax" element={<TaxPage />} />
      <Route path="/calculator/tax/income" element={<IncomeTaxPage />} />
      <Route path="/calculator/tax/capital-gains" element={<CapitalGainsTaxPage />} />
      <Route path="/calculator/tax/wealth" element={<WealthTaxPage />} />
      <Route path="/calculator/tax/sales" element={<SalesTaxPage />} />
      <Route path="/calculator/tax/property" element={<PropertyTaxPage />} />
      <Route path="/calculator/tax/retirement" element={<RetirementContributionsPage />} />
      <Route path="/calculator/tax/quarterly" element={<QuarterlyTaxPage />} />

      {/* Retirement Calculator Routes */}
      <Route path="/calculator/retirement" element={<RetirementPage />} />
      <Route path="/calculator/retirement/savings" element={<RetirementSavingsPage />} />

      {/* Debt Calculator Routes */}
      <Route path="/calculator/debt" element={<DebtPage />} />
      <Route path="/calculator/debt/payoff" element={<DebtPayoffPage />} />
      <Route path="/calculator/debt/credit-card" element={<CreditCardPayoffPage />} />

      {/* Mortgage Calculator Routes */}
      <Route path="/calculator/mortgage" element={<MortgagePage />} />
      <Route path="/calculator/mortgage/basic" element={<BasicMortgagePage />} />
      <Route path="/calculator/mortgage/refinance" element={<RefinanceMortgagePage />} />

      {/* Emergency Calculator Routes */}
      <Route path="/calculator/emergency" element={<EmergencyPage />} />
      <Route path="/calculator/emergency/fund" element={<EmergencyFundPage />} />

      {/* Business Calculator Routes */}
      <Route path="/calculator/business" element={<BusinessPage />} />
      <Route path="/calculator/business/break-even" element={<BreakEvenPage />} />

      {/* Investment Calculator Routes */}
      <Route path="/calculator/investment" element={<InvestmentPage />} />
      <Route path="/calculator/investment/returns" element={<InvestmentReturnsPage />} />
      <Route path="/calculator/investment/portfolio" element={<PortfolioRebalancingPage />} />

      {/* Financial Calculator Routes */}
      <Route path="/calculator/financial" element={<FinancialPage />} />
      <Route path="/calculator/financial/compound" element={<CompoundInterestPage />} />
      <Route path="/calculator/financial/inflation" element={<InflationPage />} />
      <Route path="/calculator/financial/savings-goal" element={<SavingsGoalPage />} />
    </Routes>
  )
}