'use strict';

angular.module('jayaMekarApp')

/*
* RumusGajiCtrl as rumusgaji
*/

  .controller('RumusGajiCtrl', function ($scope, $indexedDB) {

  	var that = $scope.RumusGajiCtrl = this;

  	this.jabatan = [];

  	$indexedDB.getRumusGaji().then(function(result){
  		that.jabatan = result;
  	});

  });
