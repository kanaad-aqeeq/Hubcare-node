// DEEPAK ----

module.exports = (sequelize, DataTypes) => {
  const sub_category = sequelize.define("sub_categories", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCategoryImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Initially set to true
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

  sub_category.associate = (models) => {
    sub_category.belongsTo(models.categories, {
      foreignKey: "categoryId",
      as: "category",
    });

    sub_category.hasMany(models.subCategory_services, {
      foreignKey: "subCategoryId",
      as: "services",
    });
  };

  return sub_category;
};
