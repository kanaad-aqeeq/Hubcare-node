# Hubcare API Documentation

Base URL: `/api`

---

## Authentication APIs
**Base Path:** `/api`

| Method | Endpoint | Auth | Description |
|------|---------|------|-------------|
| POST | /signin | ❌ | User/Provider signup with documents |
| POST | /login | ❌ | Login with credentials |
| POST | /send-otp | ❌ | Send OTP |
| POST | /verify-otp | ❌ | Verify OTP |
| POST | /social-login | ❌ | Social login |
| PUT | /update-profile | ✅ | Update user profile |
| PUT | /update-provider-profile | ✅ | Update provider profile |
| PUT | /change-password | ✅ | Change password |
| GET | /get-user-profile | ✅ | Get logged-in user profile |
| POST | /logout | ✅ | Logout |
| POST | /forgot-password | ❌ | Forgot password |

---

## Admin APIs
**Base Path:** `/api/admin`

### Dashboard & Users
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /dashboard | Admin dashboard stats |
| GET | /all-user | Get all users |
| GET | /single-user/:id | Get user/provider details |
| PUT | /toggle-user-status/:id | Enable/Disable user |

### Bookings
| GET | /booking-history | All booking history |
| GET | /booking-detail/:bookingId | Booking details |
| GET | /booking-list | Booking list |
| GET | /user-booking-details/:id | User booking details |
| GET | /user-overall-booking-history/:id | Overall booking history |

### Providers
| GET | /all-vendor | Get all providers |
| GET | /vendor-dashboard/:providerId | Provider dashboard |
| GET | /provider-bookings/:providerId | Provider bookings |

### Reports
| GET | /performance-report | Performance report |
| GET | /device-os-report | Device OS report |
| GET | /revenue-report | Revenue report |
| GET | /commission-report | Commission report |
| GET | /tax-report | Tax report |

---

## Category APIs
**Base Path:** `/api/category`

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /list | List categories |
| GET | /all-provider/:categoryId | Providers by category |
| GET | /all-categories | Admin: all categories |
| POST | /create | Create category |
| PUT | /update/:categoryId | Update category |
| PUT | /delete/:categoryId | Delete category |
| PUT | /toggle/:categoryId | Toggle category status |

---

## Sub-Category APIs
**Base Path:** `/api/sub_category`

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /category/:categoryId | Subcategories by category |
| GET | /get-Providers/:subCategoryId | Providers by subcategory |
| GET | /get-subCategories/:providerId | Subcategories by provider |
| GET | /all-subCategories | Admin: all subcategories |
| POST | /create/:categoryId | Create subcategory |
| PUT | /update/:subCategoryId | Update subcategory |
| PUT | /delete/:subCategoryId | Delete subcategory |
| PUT | /toggle/:subCategoryId | Toggle subcategory |

---

## Services APIs
**Base Path:** `/api/subCategory_service`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /create/:subCategoryId | Create service |
| PUT | /update/:serviceId | Update service |
| PUT | /delete/:serviceId | Delete service |
| POST | /toggle-promo/:serviceId | Toggle promo code |
| GET | /category/:subCategoryId | Services by subcategory |
| GET | /service/:serviceId | Service details |
| GET | /services | All services |
| GET | /services/provider/:providerId | Services by provider |
| GET | /our-best-services | Best services |
| GET | /services-used | Services used by user |
| GET | /recommended-services | Recommended services |
| PUT | /rating/:serviceId | Update rating |

---

## Booking APIs
**Base Path:** `/api/booking_service`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /add-booking/:serviceId | Create booking |
| POST | /cancel-booking/:bookingId | Cancel booking |
| POST | /booking-action/:bookingId | Start/Complete booking |
| POST | /confirm-cashPayment/:bookingId | Confirm cash payment |
| GET | /bookings | User bookings |
| GET | /booking-details/:id | Booking details |
| GET | /booking-status/:bookingId | Booking status |
| GET | /assigned-workers/:bookingId | Assigned workers |
| PUT | /approve-bookings/:bookingId | Provider approve booking |
| POST | /assignWorker-multi-bookings/:bookingId | Assign multiple workers |
| POST | /assignWorker-single-bookings/:bookingId | Assign single worker |

---

## Review & Rating APIs
**Base Path:** `/api/review`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /submitReview/:providerId | Submit review |
| GET | /review/:providerId | Get provider reviews |

---

## Promo Offer APIs
**Base Path:** `/api/promo-offer`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /add-offer | Add offer |
| PUT | /update-offer/:offerId | Update offer |
| POST | /delete-offer/:offerId | Delete offer |
| GET | /offers | List offers |
| GET | /offer/:offerId | Offer details |
| GET | /checkCouponCode | Validate coupon |

---

## Wallet APIs
**Base Path:** `/api/wallet`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /add-to-wallet | Add wallet balance |
| GET | /my-wallet | Wallet details |
| GET | /latest-transactions | Recent transactions |
| POST | /payment-url | Generate payment link |
| POST | /skipcash/webhook | Payment webhook |

---

## Worker APIs
**Base Path:** `/api/worker`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /add-worker | Add worker |
| PUT | /update-worker/:id | Update worker |
| DELETE | /delete-worker/:id | Delete worker |
| GET | /all-workers | All workers |
| GET | /worker-detail/:id | Worker details |

---

## User Location APIs
**Base Path:** `/api/user_location`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /add-location | Add location |
| GET | /get-location | Get locations |
| GET | /location/:locationId | Location by ID |
| POST | /delete-location/:locationId | Delete location |

---

## Notification APIs
**Base Path:** `/api/notification`

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /all-notifications | Get notifications |
| GET | /notification-count | Notification count |
| GET | /mark-clicked/:id | Mark clicked |
| GET | /mark-converted/:id | Mark converted |

---

## Help & Support APIs
**Base Path:** `/api/help_support`

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /create | Create support ticket |
| GET | /all | Admin: all tickets |
| PUT | /update/:ticketId | Update ticket |
| DELETE | /delete/:ticketId | Delete ticket |

---

## Privacy Policy APIs
**Base Path:** `/api/privacy_policy`

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /policy | Get privacy policy |
| POST | /create | Create policy |
| PUT | /update | Update policy |
| DELETE | /delete | Delete policy |

---

## Banner & Slider APIs

### Banner (`/api/banner`)
| POST | /create | Create banner |
| DELETE | /delete/:id | Delete banner |
| GET | /slider | Get banners |

### Slider (`/api/slider`)
| POST | /create | Create slider |
| PUT | /update | Update slider |
| PUT | /delete | Delete slider |
| GET | /slider | Get slider images |

---

**All protected routes require Authorization Bearer Token**

