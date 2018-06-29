'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    name: {
		type: DataTypes.STRING,
		allowNull: false
	},
    telephone: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			is: {
				args: /^\+*[\s-+().0-9x]+$/i,
				msg: "Invalid telephone format"
			}
		}
	},
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};
