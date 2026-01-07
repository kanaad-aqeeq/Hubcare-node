require("dotenv").config(); // load .env once at startup
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// const chargeAdminStripeAccount = async (amount) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: "qar", // Qatari Riyal
//       customer: process.env.ADMIN_STRIPE_CUSTOMER_ID,
//       payment_method: process.env.ADMIN_PAYMENT_METHOD_ID,
//       off_session: true,
//       confirm: true,
//       description: "Service booking charge from admin card",
//     });

//     if (paymentIntent.status === "succeeded") {
//       return { status: true, id: paymentIntent.id };
//     } else {
//       return { status: false, error: "Payment not successful" };
//     }
//   } catch (err) {
//     console.error("Stripe Payment Error:", err);
//     return { status: false, error: err.message };
//   }
// };

// ---------------- //

// // Fornt-End Base  With paymnet_method
// const chargeAdminStripeAccount = async (amount, payment_method) => {
//   try {
//     // Create a PaymentIntent using the passed payment_method (from frontend)
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: "qar",
//       payment_method: payment_method, // use frontend token here
//       confirm: true,
//       description: "Service booking charge from user card for admin",
//       // optionally: receipt_email, metadata, etc.
//     });

//     if (paymentIntent.status === "succeeded") {
//       return { status: true, id: paymentIntent.id };
//     } else {
//       return { status: false, error: "Payment not successful" };
//     }
//   } catch (err) {
//     console.error("Stripe Payment Error:", err);
//     return { status: false, error: err.message };
//   }
// };


// //  Fornt-End Base  With token
const chargeAdminStripeAccount = async (amount, token) => {
  try {
    // Create a Charge using the token (source)
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100), // Stripe expects amount in smallest currency unit
      currency: "qar",
      source: token, // frontend token passed here
      description: "Service booking charge from user card for admin",
    });

    if (charge.status === "succeeded") {
      return { status: true, id: charge.id };
    } else {
      return { status: false, error: "Payment not successful" };
    }
  } catch (err) {
    console.error("Stripe Charge Error:", err);
    return { status: false, error: err.message };
  }
};

module.exports = { chargeAdminStripeAccount };
