process.env.NODE_ENV = 'test';

var truncate = require('../truncate');
var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should();
var Client = require('../../models/client');
var clientFactory = require('../factories/client');
var models = require('../../models/index');
chai.use(chaiHttp);

describe('Client Routes', function(){
	beforeEach(async () => {
		await truncate();

		client = await clientFactory();
	});

	describe('/GET clients', function(){
		it('/all should return all clients', (done) => {
			chai.request(app)
			.get('/clients/all')
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(1);
				done();
			});
		});

		it('/:id should GET a client by the given id', (done) => {
			chai.request(app)
			.get('/clients/' + client.id)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name');
				res.body.should.have.property('telephone');
				res.body.should.have.property('id').eql(client.id);
				done();
			});
      	});
	});

	describe('/POST clients', () => {
    	it('should not POST a client without name field', (done) => {
        	var client = {
				telephone: "+123456789"
        	};
			chai.request(app)
			.post('/clients/create')
			.send(client)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				done();
			});
      	});
      	it('should POST a client ', (done) => {
			chai.request(app)
			.post('/clients/create')
			.send(client.dataValues)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('Create success.');
				res.body.should.have.property('name');
				res.body.should.have.property('telephone');
				done();
			});
      	});

		it('/search should return all clients with name containing the search string', (done) => {
			client1 = clientFactory({name: 'Tractebel'});
			client2 = clientFactory({name: 'Kiko Penetrante'});

			chai.request(app)
			.post('/clients/search')
			.send({key: 'Kiko'})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(1);
				done();
			});
		});
  	});
  	describe('/PUT/:id client', () => {
    	it('should UPDATE a client given the id', (done) => {
			chai.request(app)
			.put('/clients/' + client.id)
			.send({name: "tractebel", telephone: "+00000"})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('Client updated!');
				res.body.should.have.property('telephone').eql('+00000');
				done();
			});
      	});
  	});
 /*
  * Test the /DELETE/:id route
  */
  	describe('/DELETE/:id client', () => {
    	it('should DELETE a client given the id', (done) => {
			chai.request(app)
			.delete('/clients/' + client.id)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('Client deleted.');
				res.body.should.have.property('result');
				res.body.result.should.have.property('id').eql(client.id.toString());
				res.body.result.should.have.property('n').eql(1);
			  done();
			});
      	});
  	});
});
