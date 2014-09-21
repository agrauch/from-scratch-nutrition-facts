'use strict';

angular.module('recipes').controller('RecipesController', ['$scope', '$stateParams', '$location', 
	'Authentication', 'Recipes', 'Ingredients', '_',
	function($scope, $stateParams, $location, Authentication, Recipes, Ingredients, _) {
		$scope.authentication = Authentication;
		$scope.ingredients = Ingredients.query();

		function buildIngredientRefs(recipe) {
			_.each(recipe.ingredients, function (recipeIngredient) {
				recipeIngredient = recipeIngredient._id;
			});

			return recipe;
		}

		$scope.create = function() {
			var recipe = buildIngredientRefs(new Recipes($scope.recipe));
			recipe.$save(function(response) {
				$location.path('recipes/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			$scope.newRecipe();
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
			var recipe = buildIngredientRefs($scope.recipe);

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
		};

		$scope.addIngredient = function() {
			$scope.recipe.ingredients.push({});
			$scope.updateNutritionFacts();
		};

		$scope.removeIngredient = function(idx) {
			$scope.recipe.ingredients.splice(idx, 1);
			$scope.updateNutritionFacts();
		};

		$scope.updateNutritionFacts = function() {
			var facts = ['calories', 'caloriesFromFat', 'totalFat', 'saturatedFat', 'transFat', 'colesterol', 'sodium', 'totalCarbohydrates', 'dietaryFibers', 'sugars', 'protein'];

			_.each(facts, function (fact) {
				$scope.recipe[fact] = _.reduce($scope.recipe.ingredients, function(sum, ri) {
					var ingredient = _.find($scope.ingredients, function(ing){
						return ri.ingredient ? ri.ingredient._id === ing._id : false;
					});
					var num = ingredient ? ingredient[fact] * (ri.quantity || 0) : 0;
				  	return sum + num;
				}, 0);
			});
		};
	}
]);