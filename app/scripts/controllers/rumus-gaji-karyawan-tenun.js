'use strict';

<<<<<<< HEAD
/**********************************************************************************
* 
* @author : Yogie Kurniawan - yogie.jm@gmail.com
* @url    : 
*
***********************************************************************************/

angular.module('jayaMekarApp')

/**********************************************************************************
* 
* Name      : RumusGajiKaryawanTenunCtrl
* Deskripsi : Semua control untuk Rumus Gaji Karyawan Tenun
*
***********************************************************************************/

=======
angular.module('jayaMekarApp')
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
  .controller('RumusGajiKaryawanTenunCtrl',
        ['$scope', 'layananData', '$filter', 'ngTableParams', 
            function ($scope, layananData, $filter, ngTableParams) {

<<<<<<< HEAD

/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/


=======
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
        layananData.getRumusGaji()
            .then(function(data){
                var rumusGaji = data;

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
        
        layananData.getJabatan().then(function(data){
            $scope.jabatan = data;
        });
<<<<<<< HEAD

        
  }]);
/**********************************************************************************
* 
* @ E:RumusGajiKaryawanTenunCtrl
*
***********************************************************************************/
=======
  }]);
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
