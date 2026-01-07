module.exports = (sequelize, DataTypes) => {
  const HelpSupport = sequelize.define("help_support", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    providerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    transactionId:{
      type: DataTypes.UUID,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("OPEN", "RESOLVED", "CLOSED"),
      defaultValue: "OPEN",
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

  HelpSupport.associate = (models) => {
    HelpSupport.belongsTo(models.user, {
      foreignKey: "providerId",
      as: "provider",
    });

    HelpSupport.belongsTo(models.wallet_transaction, {
      foreignKey: "transactionId",
      as: "transaction",
    });    
  };
  
  return HelpSupport;
};
