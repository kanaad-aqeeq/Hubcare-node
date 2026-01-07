//DEEPAK ---

// User Wallet
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define("wallet", {
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
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
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
    tableName: "wallets", 
  });

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Wallet;
};
