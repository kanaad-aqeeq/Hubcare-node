import { Route, Routes } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { Footer, Header, SideBar } from "./components/common";
import {
  AppPerformanceReportPage,
  BannerPage,
  BookingDetailPage,
  BookingHistoryPage,
  BookingListPage,
  CommissionReportPage,
  CouponPage,
  CustomerActivityPage,
  CustomerComplaintsReportPage,
  CustomerFeedbackReportPage,
  HomePage,
  LoginPage,
  MyProfilePage,
  OnboardingReportPage,
  PayoutReportPage,
  PushNotificationReportPage,
  RevenueReportPage,
  RewardPointPage,
  ServiceCategoryPage,
  ServiceProviderIssuesReportPage,
  ServiceProviderPerformancePage,
  ServiceSubCategoryPage,
  SupportListPage,
  TaxReportPage,
  TransactionReportPage,
  UserDetailPage,
  UserDeviceReportPage,
  UserEngagementReportPage,
  UserPage,
  VendorDetailPage,
  VendorPage,
} from "./RoutesMain";
import PromoCampaignReport from "./components/marketing-engagement-reports/promo-campaign-report/PromoCampaignReport";
const App = () => {
  const routes = useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/*",
      element: (
        <div class="grid-container">
          <Header />
          <SideBar />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<UserPage />} />
              {/* <Route path="/user-detail" element={<UserDetailPage />} /> */}
              <Route path="/user-detail/:id" element={<UserDetailPage />} />
              <Route path="/vendor" element={<VendorPage />} />
              <Route path="/vendor-detail/:id" element={<VendorDetailPage />} />
              <Route path="/services-category" element={<ServiceCategoryPage />} />
              <Route path="/services-subcategory" element={<ServiceSubCategoryPage/>} />
              <Route path="/service-provider-performance" element={<ServiceProviderPerformancePage/>} />
              <Route path="/payout-report" element={<PayoutReportPage/>} />
              <Route path="/onboarding" element={<OnboardingReportPage/>} />
              <Route path="/booking-list" element={<BookingListPage/>} />
              <Route path="/booking-detail/:id" element={<BookingDetailPage/>} />
              <Route path="/coupon" element={<CouponPage/>} />
              <Route path="/banner" element={<BannerPage/>} />
              <Route path="/reward-point" element={<RewardPointPage/>} />
              <Route path="/my-profile" element={<MyProfilePage />} />
              <Route path="/revenue-report" element={<RevenueReportPage />} />
              <Route path="/commission-report" element={<CommissionReportPage />} />
              <Route path="/tax-report" element={<TaxReportPage />} />
              <Route path="/transaction-report" element={<TransactionReportPage />} />
              <Route path="/customer-complaints" element={<CustomerComplaintsReportPage />} />
              <Route path="/service-provider-issues" element={<ServiceProviderIssuesReportPage />} />
              <Route path="/support-list" element={<SupportListPage />} />
              <Route path="/booking-history" element={<BookingHistoryPage />} />
              <Route path="/customer-activity" element={<CustomerActivityPage />} />
              <Route path="/customer-feedback-report" element={<CustomerFeedbackReportPage/>} />
              <Route path="/promo-campaign-report" element={<PromoCampaignReport/>} />
              <Route path="/push-notification-report" element={<PushNotificationReportPage/>} />
              <Route path="/user-engagement-report" element={<UserEngagementReportPage/>} />
              <Route path="/app-performance-report" element={<AppPerformanceReportPage/>} />
              <Route path="/user-device-os-report" element={<UserDeviceReportPage/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      ),
    },
  ]);
  return <>{routes}</>;
};
export default App;
