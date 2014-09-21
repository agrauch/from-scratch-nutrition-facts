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
		type: Number,
		required: true
	},
	calories: {
		type: Number,
		required: true
	},
	caloriesFromFat: {
		type: Number,
		required: true
	},
	totalFat: {
		type: Number,
		required: true
	},
	saturatedFat: {
		type: Number,
		required: true
	},
	transFat: {
		type: Number,
		required: true
	},
	colesterol: {
		type: Number,
		required: true
	},
	sodium: {
		type: Number,
		required: true
	},
	totalCarbohydrates: {
		type: Number,
		required: true
	},
	dietaryFibers: {
		type: Number,
		required: true
	},
	sugars: {
		type: Number,
		required: true
	},
	protein: {
		type: Number,
		required: true
	},
	gramsPerCup: Number
});

mongoose.model('Ingredient', IngredientSchema);