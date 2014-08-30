'use strict';

var users = require('../../app/controllers/users'),
	ingredients = require('../../app/controllers/ingredients');

module.exports = function(app) {
	app.route('/ingredients')
		.get(ingredients.list)
		.post(users.requiresLogin, ingredients.create);

	app.route('/ingredients/:ingredientId')
		.get(ingredients.read)
		.put(users.requiresLogin, ingredients.update)
		.delete(users.requiresLogin, ingredients.delete);

	app.param('ingredientId', ingredients.findById);
};