'use strict';

angular.module('jayaMekarApp')
  .controller('EksperimenYkTableCtrl', function ($scope, $filter) {
  	$scope.data = [];

      // membuat contoh data
      for (var i = 1; i <= 100; i++) {
        $scope.data.push({
          "_id": "id"+ i,
          "column1": "column1 "+( i+ Math.floor((Math.random()*50)+1)),
          "column2": "column2 "+( i+ Math.floor((Math.random()*50)+1)),
          "column3": "column3 "+( i+ Math.floor((Math.random()*50)+1)),
          "column4": 1+ i+ Math.floor((Math.random()*50)+1),
          "column5": 1+ i+ Math.floor((Math.random()*50)+1),
          "aksi": "edit "+ i
        });
      }

      $scope.ykfilter = "";
      $scope.dataheader = "ini adalah data header";
  });

