'use strict';

/**********************************************************************************
* 
* @author : Yogie Kurniawan - yogie.jm@gmail.com
* @url    : 
*
***********************************************************************************/

angular.module('jayaMekarApp')

/**********************************************************************************
* 
* Name      : RumusGajiKaryawanHarianCtrl
* Deskripsi : Semua control untuk Rumus Gaji Karyawan Harian
*
***********************************************************************************/

  .controller('RumusGajiKaryawanHarianCtrl',
        ['$scope', 'layananData', '$filter', 'ngTableParams',
            function ($scope, layananData, $filter, ngTableParams) {


/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/


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
/**********************************************************************************
* 
* @ E:RumusGajiKaryawanHarianCtrl
*
***********************************************************************************/