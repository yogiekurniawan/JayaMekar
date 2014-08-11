'use strict';

angular.module('jayaMekarApp')
  .filter('eksperiment', function () {
    return function (input) {
      return 'eksperiment filter: ' + input;
    };
  })

  .filter('namajabatan', function ($indexedDB) {
  	return function (key) {
  			
  		return key;
  	};
  })

  ;
