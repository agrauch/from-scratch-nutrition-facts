'use strict';

//Setting up route
angular.module('ingredients').config(['$stateProvider',
	function($stateProvider) {
		// Ingredients state routing
		$stateProvider.
		state('listIngredients', {
			url: '/ingredients',
			templateUrl: 'modules/ingredients/views/list-ingredients.client.view.html'
		}).
		state('createIngredients', {
			url: '/ingredients/create',
			templateUrl: 'modules/ingredients/views/create-ingredient.client.view.html'
		}).
		state('viewIngredients', {
			url: '/ingredients/:ingredientId',
			templateUrl: 'modules/ingredients/views/view-ingredient.client.view.html'
		}).
		state('editIngredients', {
			url: '/ingredients/:ingredientId/edit',
			templateUrl: 'modules/ingredients/views/edit-ingredient.client.view.html'
		});
	}
]);