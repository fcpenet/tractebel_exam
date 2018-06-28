'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    id: DataTypes.INTEGER
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};