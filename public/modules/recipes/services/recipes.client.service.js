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

angular.module('recipes').factory('UnitsOfMeasure', ['$resource',
	function($resource) {
		return $resource('unitsOfMeasure');
	}
]);
