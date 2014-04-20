'use strict';

angular.module('jayaMekarApp')
  .controller('WaktuCtrl', function ($scope, time, nilai, ykValue) {

  	this.ykValue = ykValue;

  	$scope.nilai = nilai;

    $scope.date = new Date();
    $scope.time = time;
  });


