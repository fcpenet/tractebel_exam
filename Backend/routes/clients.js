var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* /clients/all
 * GET ALL clients */
router.get('/all', (req, res, next) => {
	models.Client.findAll({})
		.then(clients =>{
			res.json(clients)
		})
		.catch(err => res.json({
			error: true,
			data: [],
			error: err
		}));
});

/* GET /clients/:id
 * GET client with specified id /clients/<id>
 * */
router.get('/:id', (req, res, next) => {
	models.Client.findById(req.params.id)
		.then(client => res.json(client))
		.catch(err => res.json({
			error: true,
			data: {},
			error: err
		}));
});

/* POST /clients/create
 * POST create a new client,
 * name and telephone should be present in the body.
 * Throws an error otherwise
 * */
router.post('/create', (req, res, next) => {
	let {name, telephone} = req.body;
	models.Client.create({name, telephone})
		.then(client => res.json(
			Object.assign({}, client.dataValues,
				{message: "Create success."})))
		.catch(err => res.json({
			error: true,
			data: {},
			message: err.errors[0].message,
		}));
});

/* POST /clients/search
 * POST searches for clients that contains the search string
 * key params must be present in the body
 * */
router.post('/search', (req, res, next) => {
	let {key} = req.body;
	models.Client.search(key)
		.then(clients => res.json(clients))
		.catch(err => res.json({
			error: true,
			data: {},
			errors: err
		}));
});

/* PUT /clients/:id
 * PUT updates client with the given id /client/<id>
 * name and telephone to update must be in the body.
 * */
router.put('/:id', (req, res, next) => {
	let {name, telephone} = req.body;
	models.Client.findById(req.params.id)
		.then(client => {
			client.update({name, telephone})
				.then(client => res.json(Object.assign(
					{},
					client.dataValues,
					{message: 'Client updated!'}
				)))
				.catch(err => res.json({
					error: true,
					data: {},
					errors: err
				}));
		})
		.catch(err => res.json({
			error: true,
			data: {},
			errors: err
		}));
});

/* DELETE /clients/:id
 * DELETE destroys id specified in url /clients/<id>
 *
 * */
router.delete('/:id', (req, res, next) => {
	models.Client.destroy({
			where:{
				id: req.params.id
			}
		})
		.then((n) => res.json({
			message: 'Client deleted.',
			result: {
				n,
				id: req.params.id
			}
		}))
		.catch(err => res.json({
			error: true,
			data: {},
			errors: err
		}));
});
module.exports = router;
