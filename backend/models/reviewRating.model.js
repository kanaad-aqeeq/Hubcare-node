module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("review_ratings", {
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
    },
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.user, {
      foreignKey: "userId",
      as: "users",
    });

    Reviews.belongsTo(models.user, {
      foreignKey: "providerId",
      as: "provider",
    });
  };
  return Reviews;
};
