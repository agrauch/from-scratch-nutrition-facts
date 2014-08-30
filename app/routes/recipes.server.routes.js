'use strict';

var users = require('../../app/controllers/users'),
	recipes = require('../../app/controllers/recipes');

module.exports = function(app) {
	app.route('/recipes')
		.get(recipes.list)
		.post(users.requiresLogin, recipes.create);

	app.route('/recipes/:recipeId')
		.get(recipes.read)
		.put(users.requiresLogin, recipes.update)
		.delete(users.requiresLogin, recipes.delete);

	app.param('recipeId', recipes.findById);
};