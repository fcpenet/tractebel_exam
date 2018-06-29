var truncate = require('../truncate');
var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Client Routes', function(){
	beforeEach(async () => {
		await truncate();
	});

	describe('/GET clients', function(){
		it('should return all clients', function(done){
			assert.isOk(false, 'Initial test');
		});


	});


});
