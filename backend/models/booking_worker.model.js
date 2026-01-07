// DEEPAK ----

// BOOKING ID KE BIHAF ME WORKER ASSIGN
module.exports = (sequelize, DataTypes) => {
  const BookingWorker = sequelize.define("booking_workers", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "booking_services",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    workerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "workers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "booking_workers", 
  }
);

  BookingWorker.associate = (models) => {
    BookingWorker.belongsTo(models.booking_service, {
      foreignKey: "bookingId",
      as: "booking",
    });

    BookingWorker.belongsTo(models.worker, {
      foreignKey: "workerId",
      as: "worker",
    });
  };

  return BookingWorker;
};
