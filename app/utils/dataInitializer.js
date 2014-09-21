'use strict';

var mongoose = require('mongoose'),
	UnitOfMeasure = mongoose.model('UnitOfMeasure'),
	_ = require('lodash');

exports.unitsOfMeasure = function() {
	UnitOfMeasure.find(function (err, measures) {
		var defaultMeasures = [{
			name: 'cups',
			toGrams: 227,
			perCup: 1
		}, {
			name: 'ounces',
			toGrams: 28.43,
			perCup: 8
		}, {
			name: 'tablespoon',
			toGrams: 14.17,
			perCup: 16
		}, {
			name: 'teaspoon',
			toGrams: 4.72,
			perCup: 48
		}];

		if (err) {
			throw err;
		}

		if (!measures.length) {
			_.each(defaultMeasures, function (measure) {
				(new UnitOfMeasure(measure)).save();
			});
		}
	});
};