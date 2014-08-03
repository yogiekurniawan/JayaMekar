'use strict';

angular.module('jayaMekarApp')

/**
 * @ngdoc directive
 * @name ykTable
 * @description:
 *
 * 1. hanya bisa digunakan sebagai elemen html
 * 2. membutuhkan arahan filter : "startArray" dan "lengthArray"
 *
 ***
 *
 * #  Antribut yang harus di isi :
 * 1. atribut "data"    ->  digunakan untuk mengikat data dari controller ke directive ykTable.
 * 2. atribut "limit"   ->  digunakan untuk mendeskripsikan limit data yang harus ditampilkan
 *                          pada tabel per halamannya.
 * 3. atribut "filter"  ->  digunakan untuk menyaring data sesuai dengan apa yang user masukan.
 *
 *** 
 *
 * @example
 *
 * contoh 1 dengan pengaturan dan contoh data dari ykTable.
 * html
  <yk-table><yk-table>
 *
 * contoh 2 dengan atribut yang definisikan.
 * html
  <yk-table
    data="data"
    limit="limit"
    filter="filter"
  >
  <yk-table>
 *
 * controller
  
 *
 * note : jika atribut tidak di isi maka akan menampilkan tampilan contoh ykTable yang sudah di
 *        deskripsikan.
 *
 */

/*********************************** S:directive ykTable ***********************************/

.directive('ykTable', function() {
    return {
        templateUrl: 'views/directive/yk-table.html',
        restrict: 'E',

        replace: true,
        transclude: true,
        scope: {
            ykdata: '=data',
            yklimit: '=limit',
            ykstartarray: '=start',
            //ykFilter: '=filter',
            ykheader: '=header'
        },
        controller: function($scope, $filter) {

            $scope.header = ($scope.ykheader) ? $scope.ykheader : "";
            $scope.data = this.data = ($scope.ykdata) ? $scope.ykdata : data;
            $scope.limit = this.limit = ($scope.yklimit) ? $scope.yklimit : 5;
            //$scope.ykfilter = ($scope.ykFilter)? $scope.ykFilter: "";
            var maxSize = 7; // maksimal tombol pagination yang ditampilkan
            this.start = $scope.start = ($scope.ykstartarray) ? $scope.ykstartarray : 0; // nilai mulai untuk data array
            $scope.$watch('start', function() {

            });

            /*********************************** S:fungsi pagination ***********************************/

            /**
             * @description : kumpulan fungsi-fungsi yang dibutuhkan untuk tombol pagination tabel
             */

            // fungsi untuk mendapatkan nilai jumlah halaman yang harus disediakan
            /*$scope.numPage = function () {
            var tempNumPage = [];
            var temp = $filter('filter')($scope.data, $scope.ykfilter).length / $scope.limit;
            for (var i = 0; i < temp; i++) {
              tempNumPage.push(i);
            };
            return tempNumPage;
          }*/

            // fungsi menentukan halaman yang harus ditampilkan saat nomor halaman d klik
            $scope.setPage = function() {
                $scope.start = this.item * $scope.limit;
            }

            // fungsi menentukan halaman yang harus ditampilkan saat icon nomor halaman sebelumnya di klik
            $scope.prevPage = function() {
                $scope.start = ($scope.start > 0) ?
                    $scope.start - $scope.limit : $scope.start;
            }

            // fungsi menentukan halaman yang harus ditampilkan saat icon nomor halaman selanjurnya di klik
            $scope.nextPage = function() {
                $scope.start = ($scope.start < ($filter('filter')($scope.data, $scope.ykfilter).length - $scope.limit)) ?
                    $scope.start + $scope.limit : $scope.start;
            }

            // fungsi untuk jalan pintas ke halaman awal
            $scope.firstPage = function() {
                $scope.start = 0;
            }

            // fungsi untuk jalan pintas ke halaman terakhir
            $scope.lastPage = function() {
                $scope.start = (Math.ceil($filter('filter')($scope.data, $scope.ykfilter).length / $scope.limit) - 1) * $scope.limit;
            }

            $scope.disabledPrevPage = function() {
                // body...
            }

            /* fungsi disabled button halaman selanjutnya ketika nomor halaman yang aktif adalah nomor terakhir
             dari nomor pagination dengan menambahkan class disabled */
            $scope.disabledNextPage = function() {
                return ($scope.start >= $filter('filter')($scope.data, $scope.ykfilter).length - $scope.limit) ? true : false;
            }

            // fungsi untuk melihat nomor halaman yang sedang aktif
            $scope.noActive = function() {
                return ($scope.start / $scope.limit) + 1;
            }

            $scope.numPagStart = function() {
                var starCenter = Math.ceil(maxSize / 2);
                var endCenter = ($scope.data.length / $scope.limit) - 3;
                var pageActive = ($scope.start / $scope.limit) + 1;
                var numPagStart;
                if (pageActive > starCenter && pageActive < endCenter) {
                    numPagStart = pageActive - 4;
                } else if (pageActive >= endCenter) {
                    numPagStart = endCenter - 4;
                } else {
                    numPagStart = 0;
                }
                return numPagStart;
            }

            $scope.numPagEnd = function() {
                var center = Math.ceil(maxSize / 2) // mendapatkan nilai tengah dari pagination yang akan ditampilkan
                var pageActive = ($scope.start / $scope.limit) + 1; // mendapatkan nilai pagination yang aktif
                var numPagEnd = (pageActive > center) ? pageActive + 3 : maxSize;
                return numPagEnd;
            }


            /*********************************** E:fungsi pagination ***********************************/

        } // E:controller
    }; // E:return
}) // E:directive

/*********************************** E:directive ykTable ***********************************/


/**
 * @ngdoc filter
 * @name startArray, lengthArray
 * @description : kumpulan filter yang dibutuhkan untuk directive ykTable
 *
 */

/*********************************** S:filter ***********************************/

// untuk menentukan no start array
.filter('startArray', function() {
    return function(data, start) {
        return data.slice(start);
    }
})

// untuk mendapatkan panjangnya array
.filter('lengthArray', function() {
    return function(data) {
        return data.length;
    }
})

/*********************************** E:filter ***********************************/

.filter('sumByKey', function() {
    return function(data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
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
.filter('numberFormat', function() {
    // Contoh penggunaan filter
    // numberFormat:"Rp ":0
    // number yaitu data yang akan dirubah formatnya
    // key yaitu jenis mata uangnya
    // LD (Long Desimal) yaitu jumlah desimal yang diinginkan
    return function(number, key, LD) {
        Number.prototype.format = function(n, x, s, c) { // doc terlampir - Number.prototype.format(n, x, s, c)
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n));

            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };
        return key + number.format(LD, 3, '.', ',');
    }
})
