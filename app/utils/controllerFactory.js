'use strict';

var _ = require('lodash'),
	errors = require('../../app/utils/errors');

function addModelCallback(model, res) {
	return function(err) {
		if (err) {
			return res.send(400, {
				message: errors.getErrorMessage(err)
			});
		} else {
			res.jsonp(model);
		}
	};
}
exports.build = function (Model, modelName) {
	return {
		create:function(req, res) {
			var model = new Model(req.body);
			model.user = req.user;

			model.save(addModelCallback(model, res));
		},

		read: function(req, res) {
			res.jsonp(req.model);
		},

		update: function(req, res) {
			var model = req.model;

			model = _.extend(model, req.body);

			model.save(addModelCallback(model, res));
		},

		delete: function(req, res) {
			var model = req.model;

			model.remove(addModelCallback(model, res));
		},

		list: function(req, res) {
			Model.find().sort('-created').populate('user').exec(function(err, models) {
				if (err) {
					return res.send(400, {
						message: errors.getErrorMessage(err)
					});
				} else {
					res.jsonp(models);
				}
			});
		},

		findById: function(req, res, next, id) {
			Model.findById(id).populate('user').exec(function(err, model) {
				if (err) return next(err);
				if (!model) return next(new Error('Failed to load ' + modelName + id));
				req.model = model;
				next();
			});
		}
	};
};