// DEEPAK ----

module.exports = (sequelize, DataTypes) => {
  const BookingService = sequelize.define("booking_service", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "subCategory_services",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    providerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    services: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "user_locations",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    serviceDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    numberOfWorker: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workerAssignStatus: {
      type: DataTypes.ENUM("PENDING", "ASSIGNED", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    workHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bookingStatus: {
      type: DataTypes.ENUM("ACTIVE", "COMPLETED", "CANCELLED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
    workingStatus: {
      type: DataTypes.ENUM("NOT_STARTED", "STARTED", "COMPLETED"),
      allowNull: false,
      defaultValue: "NOT_STARTED",
    },    
    startTimestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },    
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    offerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "promo_offer",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    discountAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    taxesAndFees: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    finalAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM("WALLET", "CASH"),
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "REFUNDED"),
      allowNull: true,
      defaultValue: "PENDING",
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

  BookingService.associate = (models) => {
    BookingService.belongsTo(models.subCategory_services, {
      foreignKey: "serviceId",
      as: "service",
    });

    BookingService.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });

    BookingService.belongsTo(models.user, {
      foreignKey: "providerId",
      as: "provider",
    });

    BookingService.belongsTo(models.user_locations, {
      foreignKey: "locationId",
      as: "location",
    });

    BookingService.hasMany(models.booking_workers, {
      foreignKey: "bookingId",
      as: "assignedWorkers",
    });    
  };
  return BookingService;
};
