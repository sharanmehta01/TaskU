const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsTo(models.Service, {
        foreignKey: 'serviceId',
      });
      this.belongsTo(models.User, {
        as: 'student',
        foreignKey: 'studentId',
      });
      this.belongsTo(models.User, {
        as: 'provider',
        foreignKey: 'providerId',
      });
    }
  }

  Booking.init(
    {
      preferredDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED'),
        defaultValue: 'PENDING',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      paymentStatus: {
        type: DataTypes.ENUM('PENDING', 'PAID', 'FAILED'),
        defaultValue: 'PENDING',
      },
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );

  return Booking;
};
