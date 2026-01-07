// DEEPAK ----

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("categories", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryImage: {
      type: DataTypes.STRING,
      allowNull: true,
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

  Category.associate = (models) => {
    Category.hasMany(models.sub_categories, {
      foreignKey: "categoryId",
      as: "subCategories",
    });
  };

  return Category;
};
