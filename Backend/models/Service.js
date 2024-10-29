const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {
      // Each service belongs to one provider
      this.belongsTo(models.User, {
        foreignKey: 'providerId',
      });
    }
  }

  Service.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      priceType: {
        type: DataTypes.ENUM('FIXED', 'HOURLY'),
        allowNull: false,
      },
      availability: {
        type: DataTypes.JSON, // Store array of available date/time slots
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Store URLs of service images
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );

  return Service;
};
