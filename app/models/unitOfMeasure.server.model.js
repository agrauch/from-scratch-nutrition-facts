'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UnitOfMeasureSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	toGramConversionFactor: {
		type: Number,
		required: true
	}
});

mongoose.model('UnitOfMeasure', UnitOfMeasureSchema);