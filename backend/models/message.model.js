module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false, // User or Agent ID
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null if it's a group message
    },
    bookingId:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Message content (text)
    },
    messageType: {
      type: DataTypes.ENUM("text", "image", "file", "video"), // Message type
      defaultValue: "text",
    },
    attachments: {
      type: DataTypes.STRING, // Path or URL to attachment
      allowNull: true,
    },
    isRead: {
      type: DataTypes.BOOLEAN, // Whether the message has been read
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Message;
};
