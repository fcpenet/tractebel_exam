var faker = require('faker');
var models = require('../../models');

/**
 * Generate an object with default parameters
 *
 * @param {Object} props Properties to use for the client
 *
 * @return {Object}	An object to build the client
 */
const data = async(props = {}) => {
	const defaultProps = {
		name: faker.name.findName(),
		telephone: faker.phone.phoneNumber(),
	};
	console.log(defaultProps);
	return Object.assign({}, defaultProps, props);
};

/**
 * Generate a client instance from the properties provided
 *
 * @param {Object} props Properties to use for the client.
 *
 * @return {Object} A client instance
 */
module.exports = async(props = {}) =>
	models.Client.create(await data(props));


