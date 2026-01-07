const db = require("../database/db");
const { user_notification } = db;
const {sendPushNotification} = require("../configs/sendPushNotification");

const sendNotificationToUsers = async (userNotifications = []) => {
  const notifiedUserIds = new Set();
  const notifiedDeviceTokens = new Set();
  const notificationsToSave = [];

  for (const item of userNotifications) {
    const { user, title, message, type = "INFO" } = item;

    if (!user || !user.id) continue;

    // Save in DB if not already notified
    if (!notifiedUserIds.has(user.id)) {
      notificationsToSave.push({
        title,
        message,
        type,
        userId: user.id,
        readStatus: "Unread",
      });
      notifiedUserIds.add(user.id);
    }

    // Push notification
    if (user.device_token && !notifiedDeviceTokens.has(user.device_token)) {
      await sendPushNotification(user.device_token, { title, body: message }, type);
      notifiedDeviceTokens.add(user.device_token);
    }
  }

  // Save to DB
  if (notificationsToSave.length > 0) {
    await user_notification.bulkCreate(notificationsToSave);
  }
};

module.exports = sendNotificationToUsers
