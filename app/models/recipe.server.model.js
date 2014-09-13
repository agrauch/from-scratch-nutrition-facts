'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	ingredients: [{
		type: Schema.ObjectId,
		ref: 'RecipeIngredient'	
	}],
	instructions: String,
	calories: Number,
	caloriesFromFat: Number,
	totalFat: Number,
	saturatedFat: Number,
	transFat: Number,
	colesterol: Number,
	sodium: Number,
	totalCarbohydrates: Number,
	dietaryFibers: Number,
	sugars: Number,
	protein: Number
});

mongoose.model('Recipe', RecipeSchema);