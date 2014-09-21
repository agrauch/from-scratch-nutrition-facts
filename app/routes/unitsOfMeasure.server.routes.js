'use strict';

var unitsOfMeasure = require('../../app/controllers/unitsOfMeasure');

module.exports = function(app) {
	app.route('/unitsOfMeasure').get(unitsOfMeasure.list);
};