//DEEPAK---

// WalletTransaction Details
module.exports = (sequelize, DataTypes) => {
  const WalletTransaction = sequelize.define(
    "wallet_transaction",
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
      serviceId :{
        type: DataTypes.UUID,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("CREDIT", "DEBIT"),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
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
    },
    { tableName: "wallet_transactions" }
  );

  WalletTransaction.associate = (models) => {
    WalletTransaction.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });

    WalletTransaction.belongsTo(models.subCategory_services, {
      foreignKey: "serviceId",
      as: "service",
    });
  };
  return WalletTransaction;
};
