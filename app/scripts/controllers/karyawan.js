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
* Name      : KaryawanCtrl
* Deskripsi : Semua control untuk karyawan
*
***********************************************************************************/

  .controller('KaryawanCtrl', 
    ['$scope', 'layananData', 'ngTableParams', '$filter', 
      function ($scope, layananData, ngTableParams, $filter){


/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/


    $scope.search2 = 'Kerja';

  	layananData.getJabatan().then(function(data){
      $scope.jabatan = data;
    });

    layananData.getKaryawan().then(function(data){
      var karyawan = data;

      $scope.tableKaryawan = new  ngTableParams({
      	page: 1,
      	count: 10
      },{
      	total: karyawan.length,
      	getData: function($defer, params){
      		var orderedData = params.sorting() ? $filter('orderBy')(karyawan, params.orderBy()) : data;

      		params.total(orderedData.length);
      		$defer.resolve(orderedData.slice((params.page - 1) * params.count(), params.page() * params.count()));
      	}
      });
    });
    
  }]);
/**********************************************************************************
* 
* @ E:KaryawanCtrl
*
***********************************************************************************/