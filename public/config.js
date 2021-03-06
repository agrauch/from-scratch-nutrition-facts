'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'from-scratch-nutrition-facts';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	angular.module('lodash', []).factory('_', function() {
	    return window._; 
	});

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		dependencies = dependencies || [];

		// Create angular module
		angular.module(moduleName, ['lodash'].concat(dependencies));

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();