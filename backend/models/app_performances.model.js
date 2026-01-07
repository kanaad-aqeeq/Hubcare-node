//DEEPAK---

// AppPerformance Report
module.exports = (sequelize, DataTypes) => {
  const AppPerformance = sequelize.define("app_performances", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    totalRequests: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    successfulRequests: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    errorCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalTime: {
      type: DataTypes.FLOAT, // in seconds
      defaultValue: 0,
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

  return AppPerformance;
};
