'use strict';

var mongoose = require('mongoose'),
	UnitOfMeasure = mongoose.model('UnitOfMeasure'),
    errors = require('../../app/utils/errors');

exports.list = function(req, res) {
	UnitOfMeasure.find(function(err, models) {
		if (err) {
			return res.send(400, {
				message: errors.getErrorMessage(err)
			});
		} else {
			res.jsonp(models);
		}
	});
};