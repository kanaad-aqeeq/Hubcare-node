// DEEPAK ----

// Offer Based----
module.exports = (sequelize, DataTypes) => {
  const PromoOffer = sequelize.define(
    "promo_offer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      offerImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      offerCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      discountType: {
        type: DataTypes.ENUM("PERCENTAGE", "FLAT"),
        allowNull: false,
        defaultValue: "PERCENTAGE",
      },
      discountValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      expiresAt: {
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
    },
    {
      tableName: "promo_offer",
    }
  );

  PromoOffer.associate = (models) => {
    PromoOffer.hasMany(models.promo_redemption, {
      foreignKey: 'promoOfferId',
      as: 'redemptions',
    });
  };
  
  return PromoOffer;
};
