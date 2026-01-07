module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define("otp", {
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
    return Otp;
  };
  