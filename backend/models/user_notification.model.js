module.exports = (sequelize, DataTypes) => {
    const UserNotification = sequelize.define(
      "user_notification",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        notificationTitle:{
          type: DataTypes.STRING,
          allowNull: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        serviceId: {                // Optional Only Offer By ADMIN & PROVIDER
          type: DataTypes.UUID,
          references: {
            model: "subCategory_services",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        type: {
          type: DataTypes.ENUM("INFO","BOOKING", "ALERT", "SYSTEM","OFFER"),
          defaultValue: "INFO",
        },
        read: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        clicked: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        converted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },        
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "user_notifications",
      }
    );
  
    UserNotification.associate = (models) => {
      UserNotification.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
    };
  
    return UserNotification;
  };
  