'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UnitOfMeasureSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	toGrams: {
		type: Number,
		required: true
	},
	perCup: {
		type: Number,
		required: true
	}
});

mongoose.model('UnitOfMeasure', UnitOfMeasureSchema);