'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RecipeIngredientSchema = new Schema({
	ingredient: {
		type: Schema.ObjectId,
		ref: 'Ingredient',
		required: true		
	},
	quantity: {
		type: Number,
		required: true
	},
	unitOfMeasure: {
		type: Schema.ObjectId,
		ref: 'UnitOfMeasure',
		required: true
	}
});

mongoose.model('RecipeIngredient', RecipeIngredientSchema);