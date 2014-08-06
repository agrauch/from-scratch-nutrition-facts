'use strict';

var mongoose = require('mongoose'),
	Ingredient = mongoose.model('Ingredient'),
	_ = require('lodash'),
	utils = require('../../app/utils/utils');

exports.create = function(req, res) {
	var ingredient = new Ingredient(req.body);
	ingredient.user = req.user;

	ingredient.save(function(err) {
		if (err) {
			return res.send(400, {
				message: utils.getErrorMessage(err)
			});
		} else {
			res.jsonp(ingredient);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.ingredient);
};

exports.update = function(req, res) {
	var ingredient = req.ingredient;

	ingredient = _.extend(ingredient, req.body);

	ingredient.save(function(err) {
		if (err) {
			return res.send(400, {
				message: utils.getErrorMessage(err)
			});
		} else {
			res.jsonp(ingredient);
		}
	});
};

exports.delete = function(req, res) {
	var ingredient = req.ingredient;

	ingredient.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: utils.getErrorMessage(err)
			});
		} else {
			res.jsonp(ingredient);
		}
	});
};

exports.list = function(req, res) {
	Ingredient.find().sort('-created').populate('user', 'name').exec(function(err, ingredients) {
		if (err) {
			return res.send(400, {
				message: utils.getErrorMessage(err)
			});
		} else {
			res.jsonp(ingredients);
		}
	});
};

exports.ingredientByID = function(req, res, next, id) {
	Ingredient.findById(id).populate('user', 'name').exec(function(err, ingredient) {
		if (err) return next(err);
		if (!ingredient) return next(new Error('Failed to load ingredient ' + id));
		req.ingredient = ingredient;
		next();
	});
};