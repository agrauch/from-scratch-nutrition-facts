'use strict';

angular.module('ingredients').controller('IngredientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ingredients',
	function($scope, $stateParams, $location, Authentication, Ingredients) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var ingredient = new Ingredients({
				name: this.name
			});
			ingredient.$save(function(response) {
				$location.path('ingredients/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.name = '';
		};

		$scope.remove = function(ingredient) {
			if (ingredient) {
				ingredient.$remove();

				for (var i in $scope.ingredients) {
					if ($scope.ingredients[i] === ingredient) {
						$scope.ingredients.splice(i, 1);
					}
				}
			} else {
				$scope.ingredient.$remove(function() {
					$location.path('ingredients');
				});
			}
		};

		$scope.update = function() {
			var ingredient = $scope.ingredient;

			ingredient.$update(function() {
				$location.path('ingredients/' + ingredient._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.ingredients = Ingredients.query();
		};

		$scope.findOne = function() {
			$scope.ingredient = Ingredients.get({
				ingredientId: $stateParams.ingredientId
			});
		};
	}
]);