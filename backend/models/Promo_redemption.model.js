module.exports = (sequelize, DataTypes) => {
  const PromoRedemption = sequelize.define("promo_redemption", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    promoOfferId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    discountAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
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

  PromoRedemption.associate = (models) => {
    PromoRedemption.belongsTo(models.promo_offer, {
      foreignKey: 'promoOfferId',
      as: 'offer',
    });
  
    PromoRedemption.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  
  return PromoRedemption;
};
