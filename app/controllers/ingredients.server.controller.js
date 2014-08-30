'use strict';

var mongoose = require('mongoose'),
	Ingredient = mongoose.model('Ingredient'),
	_ = require('lodash'),
	controllerFactory = require('../../app/utils/controllerFactory');

_.merge(exports, controllerFactory.build(Ingredient, 'ingredient'));