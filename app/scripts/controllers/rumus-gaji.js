'use strict';

angular.module('jayaMekarApp')

/*
* RumusGajiCtrl as rumusgaji
*/

  .controller('RumusGajiCtrl', function ($indexedDB) {

  	var that = this;

  	this.jabatan = [];

  	$indexedDB.getRumusGaji().then(function(result){
  		that.jabatan = result;
  	});

  });
