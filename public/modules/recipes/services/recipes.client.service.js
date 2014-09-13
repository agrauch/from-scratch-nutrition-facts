'use strict';

angular.module('recipes').factory('Recipes', ['$resource',
	function($resource) {
		return $resource('recipes/:recipeId', {
			recipeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('recipes').factory('Ingredients', ['$resource',
	function($resource) {
		return $resource('ingredients');
	}
]);