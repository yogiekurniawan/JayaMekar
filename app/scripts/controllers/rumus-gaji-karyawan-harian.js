'use strict';

angular.module('jayaMekarApp')
  .controller('RumusGajiKaryawanHarianCtrl',
        ['$scope', 'layananData', '$filter', 'ngTableParams',
            function ($scope, layananData, $filter, ngTableParams) {

        layananData.getRumusGaji()
            .then(function(data){
                var rumusGaji = data;

                $scope.tableRGKaryawanTenun = new ngTableParams({
                    page: 1,        // tampilan halaman pertama
                    count: 10,       // banyak data per halaman
                    filter: {
                        type: 'KaryawanHarian'
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

        layananData.getJabatan().then(function(data){
            $scope.jabatan = data;
        });

  }]);
