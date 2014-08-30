'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	ingredients: {
		
	}
});

mongoose.model('Recipe', RecipeSchema);