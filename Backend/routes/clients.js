var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET users listing. */
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

router.get('/:id', (req, res, next) => {
	models.Client.findById(req.params.id)
		.then(client => res.json(client))
		.catch(err => res.json({
			error: true,
			data: {},
			error: err
		}));
});

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
