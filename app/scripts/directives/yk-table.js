'use strict';

angular.module('jayaMekarApp')
  .directive('ykTable', function () {
    return {
      templateUrl: 'views/directive/yk-table.html',
      restrict: 'E',
      replace: true,
      controller: function ($scope, $filter){


          $scope.data = [];

          for (var i = 1; i <= 100; i++) {
            $scope.data.push({
              "_id": "id"+[i],
              "column1": "column "+[i],
              "column2": "column "+[i],
              "column3": "column "+[i],
              "column4": 1+[i],
              "column5": 1+[i],
              "aksi": "edit "+[i]
            });
          }


          $scope.limit = 5;
          $scope.start = 0;

          $scope.nomorHalaman = function (data, myFilter, limit) {

            var tempNomorHalaman = [];

            var temp = $filter('filter')(data, myFilter).length / limit;

            for (var i = 0; i < temp; i++) {
              tempNomorHalaman.push(i);
            };

            return tempNomorHalaman;

          }

          $scope.setPage = function () {
            $scope.start = this.item * $scope.limit;
          }

        }

    };
  })

  .filter('startArray', function () {
    return function (data, start) {
      var temp = data.slice(start);
      return temp;
    }
  })

  .filter('lengthArray', function () {
    return function (data) {
      var temp = data.length;
      return temp;
    }
  })

  .filter('sumRp',function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }

        var temp = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            temp += parseInt(data[i][key]);
        }
        var Rp = "Rp " + temp; 

        return Rp;
    };
  })