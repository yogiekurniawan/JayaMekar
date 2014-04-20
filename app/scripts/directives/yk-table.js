'use strict';

angular.module('jayaMekarApp')

  .directive('ykTable', function () {
    return {
      templateUrl: 'views/directive/yk-table.html',
      restrict: 'E',
      replace: true,
      controller: function ($scope, $filter){

          $scope.data = [];
          $scope.ykFiler = "";
          $scope.limit = 5;
          $scope.start = 0;

          // membuat contoh data
          for (var i = 1; i <= 100; i++) {
            $scope.data.push({
              "_id": "id"+[i],
              "column1": "column1 "+[i],
              "column2": "column2 "+[i],
              "column3": "column3 "+[i],
              "column4": 1+[i],
              "column5": 1+[i],
              "aksi": "edit "+[i]
            });
          }


          $scope.numPage = function (data, ykFilter, limit) {

            var tempNumPage = [];

            var temp = $filter('filter')(data, ykFilter).length / limit;

            for (var i = 0; i < temp; i++) {
              tempNumPage.push(i);
            };

            return tempNumPage;

          }

          $scope.setPage = function () {
            $scope.start = this.item * $scope.limit;
            console.log("nextPage : "+ ($scope.start + 1))
          }

          $scope.nextPage = function () {
            if ($scope.start < ( $filter('filter')( $scope.data, $scope.ykFilter ).length - $scope.limit)) {
              $scope.start = $scope.start + $scope.limit;
            };
            console.log("nextPage : "+ ($scope.start + 1))
          }


          $scope.prevPage = function () {
            if ($scope.start > 0 ) {
              $scope.start = $scope.start - $scope.limit;
            };
              console.log("prevPage : "+ ($scope.start + 1))
          }

/* S:Fungsi untuk disabled tombol pagination */
          $scope.disabledPrevPage = function () {
            // body...
          }

          $scope.disabledNextPage = function () {
            var temp;
            var tempLengthData = $filter('filter')( $scope.data, $scope.myFilter ).length - $scope.limit;
            if($scope.start >= tempLengthData){
              temp = true;
            } else {
              temp = false;
            }
            return temp;
          }
/* E:Fungsi untuk disabled tombol pagination */

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

  .filter('sum',function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }

        var temp = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            temp += parseInt(data[i][key]);
        }

        return temp;
    };
  })