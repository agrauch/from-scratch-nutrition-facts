'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var IngredientSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		required: true
	},
	servingSize: {
		type: Number
	},
	unitOfMeasure: {
		type: Schema.ObjectId,
		ref: 'UnitOfMeasure',
	},
	calories: {
		type: Number
	},
	caloriesFromFat: {
		type: Number
	},
	totalFat: {
		type: Number
	},
	saturatedFat: {
		type: Number
	},
	transFat: {
		type: Number
	},
	colesterol: {
		type: Number
	},
	sodium: {
		type: Number
	},
	totalCarbohydrates: {
		type: Number
	},
	dietaryFibers: {
		type: Number
	},
	sugars: {
		type: Number
	},
	protein: {
		type: Number
	}
});

mongoose.model('Ingredient', IngredientSchema);