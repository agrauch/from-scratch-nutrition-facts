'use strict';

var mongoose = require('mongoose'),
	Recipe = mongoose.model('Recipe'),
	_ = require('lodash'),
	utils = require('../../app/utils/utils');

_.merge(exports, controllerFactory.build(Recipe, 'recipe'));