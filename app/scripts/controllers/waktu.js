'use strict';

angular.module('jayaMekarApp')
  .controller('WaktuCtrl', function ($scope, time, nilai) {
  	$scope.nilai = nilai;

    $scope.date = new Date();
    $scope.time = time;
  });
