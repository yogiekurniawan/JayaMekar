'use strict';

angular.module('jayaMekarApp')

  .directive('ykTable', function () {
    return {
      templateUrl: 'views/directive/yk-table.html',
      restrict: 'E',
      replace: true,
      controller: function ($scope, $filter){

          $scope.data = [
/*            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 1,
              "column2": "column2 "+ 2,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 2,
              "column1": "column1 "+ 2,
              "column2": "column2 "+ 2,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 1,
              "column2": "column2 "+ 1,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 2,
              "column2": "column2 "+ 1,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 1,
              "column2": "column2 "+ 3,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 2,
              "column2": "column2 "+ 3,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 1,
              "column2": "column2 "+ 4,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 2,
              "column2": "column2 "+ 4,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 1,
              "column2": "column2 "+ 5,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            },
            {
              "_id": "id"+ 1,
              "column1": "column1 "+ 2,
              "column2": "column2 "+ 5,
              "column3": "column3 "+ 3,
              "column4": 1 + 2,
              "column5": 1 + 3,
              "aksi": "edit "+ 1
            }*/
          ];

          $scope.ykFiler = "";
          $scope.limit = 10;
          $scope.start = 0;
          var maxSize = 7; // maksimal tombol pagination yang muncul
          $scope.noActive2 = $scope.limit - $scope.start;


          // membuat contoh data
          for (var i = 1; i <= 2000; i++) {
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
          
          $scope.noActive = function(start, limit){
               
            var pageActive = (start / limit ) + 1;
            return pageActive; 
          }

          $scope.numPagStart = function (start, limit) {
            var starCenter = Math.ceil(maxSize / 2);
            var endCenter = ( $scope.data.length / limit ) - 3;
            var pageActive = (start / limit ) + 1;
            var numPagStart;
             if (pageActive > starCenter && pageActive < endCenter){
               numPagStart = pageActive - 4;
               //console.log('starCenter'+ endCenter);
             } else if (pageActive >= endCenter){
               numPagStart = endCenter - 4;
               //console.log('endCenter');
             } else {
               numPagStart = 0;
             }
            return numPagStart;
          }

          $scope.numPagEnd = function (start, limit) {
            var center = Math.ceil(maxSize / 2)
            var pageActive = (start / limit ) + 1;
            var numPagEnd = (pageActive > center)? pageActive + 3: maxSize;
            return numPagEnd;
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

  /**
  * Number.prototype.format(n, x, s, c)
  * 
  * @param integer n: length of decimal
  * @param integer x: length of whole part
  * @param mixed   s: sections delimiter
  * @param mixed   c: decimal delimiter
  * @link http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
  */
  .filter('numberFormat', function () {
    return function (number, key, LD) {
      Number.prototype.format = function(n, x, s, c) { // doc terlampir - Number.prototype.format(n, x, s, c)
          var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
              num = this.toFixed(Math.max(0, ~~n));
          
          return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
      };
      return key + number.format(LD, 3, '.', ',');
    }
  })