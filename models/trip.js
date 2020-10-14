module.exports = function(sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
      user: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      hotel: {
        type: DataTypes.STRING
      },
      event: {
        type: DataTypes.STRING
      },
      food: {
        type: DataTypes.STRING
      }
    });
    return Trip;
  };
  