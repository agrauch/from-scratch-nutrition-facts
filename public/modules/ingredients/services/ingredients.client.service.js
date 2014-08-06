'use strict';

//Ingredients service used for communicating with the ingredients REST endpoints
angular.module('ingredients').factory('Ingredients', ['$resource',
	function($resource) {
		return $resource('ingredients/:ingredientId', {
			ingredientId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);