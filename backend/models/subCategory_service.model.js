// DEEPAK ----

module.exports = (sequelize, DataTypes) => {
  const SubCategoryService = sequelize.define("subCategory_services", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    providerId :{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    subCategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "sub_categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    servicePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    serviceImages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    // rating: {
    //   type: DataTypes.FLOAT,
    //   allowNull: true,
    //   default: 0.0,
    // },
    isPromocodeApplied: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
  });

  SubCategoryService.associate = (models) => {
    SubCategoryService.belongsTo(models.sub_categories, {
      foreignKey: "subCategoryId",
      as: "subCategory",
    });

    SubCategoryService.belongsTo(models.user, {
      foreignKey: "providerId",
      as: "provider", // this must match the alias used in the include
    });

    SubCategoryService.hasMany(models.review_ratings, {
      foreignKey: "providerId",
      sourceKey: "providerId",
      as: "providerReviews",
    });
  };

  return SubCategoryService;
};
