'use strict';

angular.module('recipes').controller('RecipesController', ['$scope', '$stateParams', '$location', 
	'Authentication', 'Recipes', 'Ingredients', 'UnitsOfMeasure', '_',
	function($scope, $stateParams, $location, Authentication, Recipes, Ingredients, UnitsOfMeasure, _) {
		var facts = ['calories', 'caloriesFromFat', 'totalFat', 'saturatedFat', 'transFat', 'colesterol', 'sodium', 'totalCarbohydrates', 'dietaryFibers', 'sugars', 'protein'];

		$scope.authentication = Authentication;
		$scope.ingredients = Ingredients.query();
		$scope.unitsOfMeasure = UnitsOfMeasure.query();

		function buildRefs(recipe) {
			_.each(recipe.ingredients, function (recipeIngredient) {
				recipeIngredient.ingredient = recipeIngredient.ingredient._id;
				recipeIngredient.unitOfMeasure = recipeIngredient.unitOfMeasure._id;
			});

			return recipe;
		}

		function roundToTwo(num) {    
		    return +(Math.round(num + "e+2")  + "e-2");
		}

		$scope.create = function() {
			var recipe = buildRefs(new Recipes($scope.recipe));
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
			var recipe = buildRefs($scope.recipe);

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
			_.each(facts, function (fact) {
				$scope.recipe[fact] = roundToTwo(_.reduce($scope.recipe.ingredients, function(sum, ri) {
					var ingredient = _.find($scope.ingredients, function(ing){
						return ri.ingredient ? ri.ingredient._id === ing._id : false;
					});
					var unitOfMeasure = _.find($scope.unitsOfMeasure, function(uom){
						return ri.unitOfMeasure ? ri.unitOfMeasure._id === uom._id : false;
					});
					var num = ingredient 
						? ingredient[fact] 
							* (ri.quantity || 0) 
							* (unitOfMeasure ? unitOfMeasure.toGrams : 0)
						: 0;
				  	return sum + (!_.isNaN(num) ? num : 0);
				}, 0));
			});
		};

		$scope.perServing = function(fact) {
			var num = fact / $scope.recipe.numberOfServings;
			return !_.isNaN(num) ? roundToTwo(num) : '';
		};
	}
]);