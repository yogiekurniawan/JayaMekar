'use strict';

angular.module('jayaMekarApp')
  .controller('RumusGajiKaryawanTenunCtrl',
        ['$scope', '$http', '$filter', 'ngTableParams', 
            function ($scope, $http, $filter, ngTableParams) {

        $http.get('json/rumusGaji.json')
            .then(function(res){
                var rumusGaji = res.data;

                $scope.tableRGKaryawanTenun = new ngTableParams({
                    page: 1,        // tampilan halaman pertama
                    count: 10,       // banyak data per halaman
                    filter: {
                        type: 'KaryawanBorongan'
                    },
                    sorting: {
                        idJabatan: 'asc'     // initial sorting
                    }
                },{
                    total: rumusGaji.length, // length dari rumus gaji
                    getData: function($defer, params){
                        var filteredData = params.filter() ? $filter('filter')(rumusGaji, params.filter()): data;
                        // orderBy
                        var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;

                        params.total(orderedData.length)
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });  
            });
        
        $http.get('json/jabatan.json')
            .then(function(res){
                $scope.jabatan = res.data;
            });
  }]);
