import { Routes, Route } from 'react-router-dom'
import HomePage from './app/page'

// Import all calculator pages
import RoiPage from './pages/calculators/RoiPage'
import GeneralRoiPage from './pages/calculators/GeneralRoiPage'
import RealEstateRoiPage from './pages/calculators/RealEstateRoiPage'
import MarketingRoiPage from './pages/calculators/MarketingRoiPage'
import BusinessRoiPage from './pages/calculators/BusinessRoiPage'
import StockTradingPage from './pages/calculators/StockTradingPage'

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
import AmortizationPage from './pages/calculators/AmortizationPage'

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
import InvestmentGrowthPage from './pages/calculators/InvestmentGrowthPage'
import NetWorthPage from './pages/calculators/NetWorthPage'
import FourOhOneKPage from './pages/calculators/FourOhOneKPage'
import LoanPage from './pages/calculators/LoanPage'
import DebtConsolidationPage from './pages/calculators/DebtConsolidationPage'
import InvestmentReturnPage from './pages/calculators/InvestmentReturnPage'
import IraPage from './pages/calculators/IraPage'
import BusinessValuationPage from './pages/calculators/BusinessValuationPage'
import CashFlowPage from './pages/calculators/CashFlowPage'
import EstateTaxPage from './pages/calculators/EstateTaxPage'
import WealthManagementPage from './pages/calculators/WealthManagementPage'
import InheritancePage from './pages/calculators/InheritancePage'
import OptionsTradingPage from './pages/calculators/OptionsTradingPage'
import RiskAssessmentPage from './pages/calculators/RiskAssessmentPage'
import BondPage from './pages/calculators/BondPage'
import HomeAffordabilityPage from './pages/calculators/HomeAffordabilityPage'
import DownPaymentPage from './pages/calculators/DownPaymentPage'
import PensionPage from './pages/calculators/PensionPage'
import ProfitMarginPage from './pages/calculators/ProfitMarginPage'
import AssetAllocationPage from './pages/calculators/AssetAllocationPage'

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
      <Route path="/calculator/roi/investment-return" element={<InvestmentReturnPage />} />
      <Route path="/calculator/roi/stock-trading" element={<StockTradingPage />} />
      <Route path="/calculator/roi/portfolio-rebalancing" element={<PortfolioRebalancingPage />} />
      <Route path="/calculator/roi/options-trading" element={<OptionsTradingPage />} />
      <Route path="/calculator/roi/risk-assessment" element={<RiskAssessmentPage />} />
      <Route path="/calculator/roi/bond" element={<BondPage />} />

      {/* Tax Calculator Routes */}
      <Route path="/calculator/tax" element={<TaxPage />} />
      <Route path="/calculator/tax/income" element={<IncomeTaxPage />} />
      <Route path="/calculator/tax/capital-gains" element={<CapitalGainsTaxPage />} />
      <Route path="/calculator/tax/wealth" element={<WealthTaxPage />} />
      <Route path="/calculator/tax/sales" element={<SalesTaxPage />} />
      <Route path="/calculator/tax/property" element={<PropertyTaxPage />} />
      <Route path="/calculator/tax/retirement" element={<RetirementContributionsPage />} />
      <Route path="/calculator/tax/quarterly" element={<QuarterlyTaxPage />} />
      <Route path="/calculator/tax/401k" element={<FourOhOneKPage />} />

      {/* Retirement Calculator Routes */}
      <Route path="/calculator/retirement" element={<RetirementPage />} />
      <Route path="/calculator/retirement/savings" element={<RetirementSavingsPage />} />

      {/* Debt Calculator Routes */}
      <Route path="/calculator/debt" element={<DebtPage />} />
      <Route path="/calculator/debt/payoff" element={<DebtPayoffPage />} />
      <Route path="/calculator/debt/credit-card" element={<CreditCardPayoffPage />} />
      <Route path="/calculator/debt/loan" element={<LoanPage />} />
      <Route path="/calculator/debt/consolidation" element={<DebtConsolidationPage />} />

      {/* Mortgage Calculator Routes */}
      <Route path="/calculator/mortgage" element={<MortgagePage />} />
      <Route path="/calculator/mortgage/basic" element={<BasicMortgagePage />} />
      <Route path="/calculator/mortgage/refinance" element={<RefinanceMortgagePage />} />
      <Route path="/calculator/mortgage/home-affordability" element={<HomeAffordabilityPage />} />
      <Route path="/calculator/mortgage/amortization" element={<AmortizationPage />} />
      <Route path="/calculator/mortgage/down-payment" element={<DownPaymentPage />} />

      {/* Emergency Calculator Routes */}
      <Route path="/calculator/emergency" element={<EmergencyPage />} />
      <Route path="/calculator/financial-savings/emergency-fund" element={<EmergencyFundPage />} />

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

      {/* Financial Savings Calculator Routes */}
      <Route path="/calculator/financial-savings/investment-growth" element={<InvestmentGrowthPage />} />
      <Route path="/calculator/financial-savings/net-worth" element={<NetWorthPage />} />
      <Route path="/calculator/financial-savings/ira" element={<IraPage />} />
      <Route path="/calculator/business-related/business-valuation" element={<BusinessValuationPage />} />
      <Route path="/calculator/business-related/cash-flow" element={<CashFlowPage />} />
      <Route path="/calculator/business-related/estate-tax" element={<EstateTaxPage />} />
      <Route path="/calculator/misc/wealth-management" element={<WealthManagementPage />} />
      <Route path="/calculator/misc/inheritance" element={<InheritancePage />} />
      <Route path="/calculator/financial-savings/pension" element={<PensionPage />} />
      <Route path="/calculator/financial-savings/savings-goal" element={<SavingsGoalPage />} />
      <Route path="/calculator/business-related/profit-margin" element={<ProfitMarginPage />} />
      <Route path="/calculator/business-related/asset-allocation" element={<AssetAllocationPage />} />
    </Routes>
  )
}