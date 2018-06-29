var assert = require('chai').assert;
var truncate = require('../truncate');
var clientFactory = require('../factories/client');
var sequelize = require('sequelize');
var models = require('../../models');

describe('Client Model tests', function(){
	let client;

	beforeEach(async () => {
		await truncate();

		client = await clientFactory();
	});

	describe('Telephone field', function(){
		it('should not accept letters in telephone field', function(done){
			client.update({
				telephone: 'abc'
			})
			.then(function(client){
				assert.isOk(false, 'model should reject invalid telephone format');
				done();
			})
			.catch(function(err) {
				assert.instanceOf(err.errors[0], sequelize.ValidationErrorItem);
				assert.equal(err.errors[0].message, 'Invalid telephone format');
				done();
			});
		});

		it('should not accept empty telephone field', function(done){
			client.update({
				telephone: ''
			})
			.then(function(client){
				assert.isOk(false, 'model should reject invalid telephone format');
				done();
			})
			.catch(function(err) {
				assert.instanceOf(err.errors[0], sequelize.ValidationErrorItem);
				assert.equal(err.errors[0].message, 'Invalid telephone format');
				done();
			});
		});
	});

	describe('Name field', function(){
		it('should not accept null name', function(done){

			models.Client.create({telephone: '+123456789'})
			.then(function(err){
				assert.isOk(false, 'model should reject null name');
				done(new Error('!'));
			})
			.catch(function(err){
			assert.instanceOf(err.errors[0], sequelize.ValidationErrorItem);
			assert.equal(err.errors[0].message, 'Client.name cannot be null');
				done();
			});
		});

		it('should not accept empty name', function(done){
			client.update({
				name: ''
			})
			.then(function(client){
				assert.isOk(false, 'model should reject empty/blank names');
				done();
			})
			.catch(function(err) {
				assert.instanceOf(err.errors[0], sequelize.ValidationErrorItem);
				assert.equal(err.errors[0].message, 'Name must not be blank!');
				done();
			});
		});
	});
});

