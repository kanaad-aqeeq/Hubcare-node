module.exports = (sequelize, DataTypes) => {
  const WalletPaymentRequest = sequelize.define("wallet_payment_request", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    merchant_reference_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    skipcash_payment_id: {
      type: DataTypes.STRING,
      allowNull: true, // You can make it required later if needed
    },
    payment_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
      defaultValue: "PENDING",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: "wallet_payment_requests",
  });

  WalletPaymentRequest.associate = (models) => {
    WalletPaymentRequest.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return WalletPaymentRequest;
};
