'use strict';

angular.module('recipes').controller('RecipesController', ['$scope', '$stateParams', '$location', 
	'Authentication', 'Recipes', 'Ingredients',
	function($scope, $stateParams, $location, Authentication, Recipes, Ingredients) {
		$scope.authentication = Authentication;
		$scope.ingredients = Ingredients.query();

		$scope.create = function() {
			var recipe = new Recipes($scope.recipe);
			recipe.$save(function(response) {
				$location.path('recipes/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			$scope.newIngredient();
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

		$scope.newRecipe = function() {
			$scope.recipe = {
				ingredients: []
			};
		}

		$scope.addIngredient = function() {
			$scope.recipe.ingredients.push({});
		}

		$scope.removeIngredient = function(idx) {
			$scope.recipe.ingredients.splice(idx, 1);
		}
	}
]);