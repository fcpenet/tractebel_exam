process.env.NODE_ENV = 'test';

var truncate = require('../truncate');
var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should();
var Client = require('../../models/client');
var clientFactory = require('../factories/client');

chai.use(chaiHttp);

describe('Client Routes', function(){
	beforeEach(async () => {
		await truncate();

		client = await clientFactory();
	});

	describe('/GET clients', function(){
		it('should return all clients', (done) => {
			chai.request(app)
			.get('/clients')
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});

		it('/:id should GET a client by the given id', (done) => {
			chai.request(app)
			.get('/client/' + client.id)
			.send(client)
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

	describe('/POST client', () => {
    	it('should not POST a client without name field', (done) => {
        	var client = {
				telephone: "+123456789"
        	};
			chai.request(app)
			.post('/client')
			.send(client)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('name');
				res.body.errors.pages.should.have.property('kind').eql('required');
				done();
			});
      	});
      	it('should POST a client ', (done) => {
			chai.request(app)
			.post('/client/create')
			.send(client)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('client successfully added!');
				res.body.should.have.property('name');
				res.body.should.have.property('telephone');
				done();
			});
      	});
		it('/search should return all clients with name containing the search string', (done) => {
			client1 = clientFactory({name: 'Tractebel'});
			client2 = clientFactory({name: 'Kiko Penetrante'});

			chai.request(app)
			.post('/client/search')
			.send({key: 'Kiko'})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(1);
				done();
			})
		});
  	});
  	describe('/PUT/:id client', () => {
    	it('should UPDATE a client given the id', (done) => {
			chai.request(app)
			.put('/client/' + client.id)
			.send({name: "tractebel", telephone: "+00000"})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('client updated!');
				res.body.client.should.have.property('telephone').eql('+00000');
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
			.delete('/client/' + client.id)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('client successfully deleted!');
				res.body.result.should.have.property('ok').eql(1);
				res.body.result.should.have.property('n').eql(1);
			  done();
			});
      	});
  	});
});
