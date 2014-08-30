'use strict';

angular.module('recipes').controller('RecipesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Recipes',
	function($scope, $stateParams, $location, Authentication, Recipes) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			console.log('create' + this.recipe.name);
			var recipe = new Recipes(this.recipe);
			recipe.$save(function(response) {
				$location.path('recipes/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.recipe = {};
		};

		$scope.remove = function(recipe) {
			if (recipe) {
				recipe.$remove();

				for (var i in $scope.recipes) {
					if ($scope.recipes[i] === recipe) {
						$scope.recipes.splice(i, 1);
					}
				}
			} else {
				$scope.recipe.$remove(function() {
					$location.path('recipes');
				});
			}
		};

		$scope.update = function() {
			var recipe = $scope.recipe;

			recipe.$update(function() {
				$location.path('recipes/' + recipe._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.recipes = Recipes.query();
		};

		$scope.findOne = function() {
			$scope.recipe = Recipes.get({
				recipeId: $stateParams.recipeId
			});
		};
	}
]);