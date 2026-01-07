const { UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   len: [10, 15],
      // },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyname: {
      type: DataTypes.STRING,
    },
    companyaddress:{
      type: DataTypes.STRING,
    },
    gender:{
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("User", "Provider", "Admin"),
      allowNull: false,
    },
    socialId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    discription: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    govtId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supportingDocument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationalId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Initially set to false
    },
    os: {
      type: DataTypes.STRING, // e.g., Android, iOS, Windows, macOS
      allowNull: true,
    },    
    device_type: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    device_token: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    // categoryId: {
    //   type: DataTypes.ARRAY(DataTypes.UUID), // Now storing multiple categories
    //   allowNull: true,
    // },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
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

  User.associate = (models) => {
    User.belongsTo(models.categories, {
      foreignKey: "categoryId",
      as: "category",
    });

    User.hasMany(models.subCategory_services, {
      foreignKey: "providerId",
      as: "subCategory_services",
    });

    User.hasOne(models.wallet, {
      foreignKey: "userId",
      as: "wallet",
    });
  
    User.hasMany(models.user_locations, {
      foreignKey: "userId",
      as: "user_locations",
    });
    
    User.hasMany(models.help_support, {
      foreignKey: "providerId",
      as: "complaints",
    });    
  }
  return User;
};
