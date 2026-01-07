// models/user_session.js
module.exports = (sequelize, DataTypes) => {
    const UserSession = sequelize.define("user_session", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      loginTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      logoutTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
    return UserSession;
  };
  