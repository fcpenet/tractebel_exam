'use strict';

const Op = require('Sequelize').Op;

module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			not: {
				args: /^\s*$/i,
				msg: 'Name must not be blank!'
			}
		}
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

  	Client.search = function(key){
		return Client.findAll({
			where:{
				name: {
					[Op.like]: '%' + key + '%'
				}
			}
		});
	}
  return Client;
};
