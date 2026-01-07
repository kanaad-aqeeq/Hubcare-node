import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import dashboardReducer from './Slices/admindashboard/dashboardSlice';
import userReducer from './Slices/userAdminSlice/userSlice';
import singleReducer from './Slices/userdetail/userdetailSlice';
import userBookingReducer from './Slices/userbooking/userBookingSlice';
import vendorReducer from './Slices/vendorall/vendorSlice';
import vendorDetailReducer from './Slices/vendordetails/vendordetailSlice';
import vendorDashboardReducer from './Slices/vendordashboard/vendorDashboardSlice';
import proverBookingReducer from './Slices/vendordashboard/provideBooking';
import categoriesReducer from './Slices/serviceReports/categorySlice';
import subcategoriesReducer from './Slices/serviceReports/subcategorySlice';
import providerPerformanceReducer from './Slices/serviceReports/providerperformanceSlice';
import payoutReportReducer from './Slices/serviceReports/payoutReportSlice';
import onboardingReportReducer from './Slices/serviceReports/onboardingSlice';
import deletecategoriesReducer from './Slices/serviceReports/deletecategorySlice';
import bookingHistoryReducer from './Slices/customerbookinghsitory/customerBookingHistorySlice';
import customerFeedbackReducer from './Slices/customerFeedbackReport/customerFeedbackReportSlice';
import performanceReportReducer from './Slices/peformanceReport/performanceReportSlice';
import deviceOsReportReducer from './Slices/deviceOsReport/deviceOsReportSlice';
import promoOfferReducer from './Slices/promoOffer/promoOfferSlice';
import bannerReducer from './Slices/bannerList/bannerSlice';
import categoryCreateReducer from './Slices/createCategory/createCategorySlice';
import revenueReportReducer from './Slices/revenueReport/revenueReportSlice';
import transactionReportReducer from './Slices/transactionReport/transactionReportSlice';
import commissionReportReducer from './Slices/commissionReport/commissionReportSlice';
import taxReportReducer from './Slices/taxReport/taxReportSlice';
import categoryDeleteReducer from './Slices/categorydelete/categoryDeleteSlice';
import categoryToggleReducer from './Slices/categoryToggle/categoryToggleSlice';
import subCategoryDeleteReducer from './Slices/subcategorydelete/subCategoryDeleteSlice';
import addOfferReducer from './Slices/addOffer/addOfferSlice';
import deletePromoOfferReducer from './Slices/deletePromoOffer/deletePromoOfferSlice';
import promoCampaignReportReducer from './Slices/promoCampaignReport/promoCampaignReportSlice';
import userEngagementReportReducer from './Slices/userEngagementReport/userEngagementReportSlice';
import pushNotificationReportReducer from './Slices/pushNotification/pushNotificationSlice';
import userProfileReducer from './Slices/userProfile/userProfileSlice';
import updateUserProfileReducer from'./Slices/updateUserProfile/updateUserProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    users: userReducer,
    selectedUser: singleReducer,
    userBooking: userBookingReducer,
    vendors: vendorReducer,
    vendorDetails: vendorDetailReducer,
    vendorDashboard: vendorDashboardReducer,
    providerBooking: proverBookingReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    providerPerformance: providerPerformanceReducer,
    payoutReport: payoutReportReducer,
    onboardingReport: onboardingReportReducer,
    deleteCategory: deletecategoriesReducer,
    bookingHistory: bookingHistoryReducer,
    customerFeedback: customerFeedbackReducer,
    performanceReport: performanceReportReducer,
    deviceOsReport: deviceOsReportReducer,
    promoOffer: promoOfferReducer,
    banner: bannerReducer,
    categoryCreate: categoryCreateReducer,
    revenueReport: revenueReportReducer,
    transactionReport: transactionReportReducer,
    commissionReport: commissionReportReducer,
    taxReport: taxReportReducer,
    categoryDelete: categoryDeleteReducer,
    categoryToggle: categoryToggleReducer,
    subCategoryDelete: subCategoryDeleteReducer,
    addOffer: addOfferReducer,
    deletePromoOffer: deletePromoOfferReducer,
    promoCampaignReport: promoCampaignReportReducer,
    userEngagementReport: userEngagementReportReducer,
    pushNotificationReport: pushNotificationReportReducer,
    userProfile: userProfileReducer,
    updateUserProfile: updateUserProfileReducer,
  },
});

export default store;
