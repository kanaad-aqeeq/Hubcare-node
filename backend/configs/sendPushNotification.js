const path = require("path");
const fs = require("fs");
const admin = require("firebase-admin");

// Path to your service account JSON file
const SERVICE_ACCOUNT_KEY_FILE = path.join(
  __dirname,
  "../configs/firebase-notification.json"
);

// Function to initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    // Read and parse the service account JSON file
    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_KEY_FILE));

    // Initialize Firebase Admin SDK with service account credentials
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
  }
};

// Function to send push notifications
const sendPushNotification = async (
  token,
  notification,
  notificationType = "default_type",
  serviceId = "null", // Optional service ID
  bookingId ="null", // Optional booking ID
) => {
  console.log("Sending push notification to token:", token);

  if (!token) {
    console.log("No valid token found. Skipping notification.");
    return;
  }

  const message = {
    token,
    notification,
    data: {
      notification_type: notificationType,
      service_id:serviceId,
      booking_id:bookingId
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Centralized error handler for Firebase errors
const handleError = (error) => {
  switch (error.code) {
    case "messaging/registration-token-not-registered":
      console.log("Device token is no longer valid. Removing token from database.");
      // You can add logic here to remove the invalid token from your database
      break;
    case "messaging/invalid-recipient":
      console.log("Invalid recipient token.");
      break;
    case "messaging/invalid-payload":
      console.log("Invalid payload structure.");
      break;
    default:
      console.log("Error sending message:", error);
  }
};

// Call the Firebase initialization function once at the start of your app
initializeFirebase();

module.exports = { sendPushNotification, initializeFirebase };
