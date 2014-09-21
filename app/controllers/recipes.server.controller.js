'use strict';

var mongoose = require('mongoose'),
	Recipe = mongoose.model('Recipe'),
	_ = require('lodash'),
	controllerFactory = require('../../app/utils/controllerFactory');

_.merge(exports, controllerFactory.build(Recipe, 'recipe', ['ingredients.ingredient', 'ingredients.unitOfMeasure']));