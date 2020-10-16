module.exports = function(sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
      user: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      hotelName: {
        type: DataTypes.STRING
      },
      hotelImage: {
        type: DataTypes.STRING
      },
      hotelUrl: {
        type: DataTypes.STRING
      },
      hotelAddress: {
        type: DataTypes.STRING
      },
      restaurantName: {
        type: DataTypes.STRING
      },
      restaurantImage: {
        type: DataTypes.STRING
      },
      restaurantUrl: {
        type: DataTypes.STRING
      },
      restaurantAddress: {
        type: DataTypes.STRING
      },
      museumName: {
        type: DataTypes.STRING
      },
      museumImage: {
        type: DataTypes.STRING
      },
      museumUrl: {
        type: DataTypes.STRING
      },
      museumAddress: {
        type: DataTypes.STRING
      }
    });
    return Trip;
  };
  