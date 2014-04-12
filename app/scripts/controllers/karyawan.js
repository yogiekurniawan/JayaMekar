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
* Name      : KaryawanCtrl
* Deskripsi : Semua control untuk karyawan
*
***********************************************************************************/

  .controller('KaryawanCtrl', 
    ['$scope', 'layananData', 'ngTableParams', '$filter', 
      function ($scope, layananData, ngTableParams, $filter){


/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/


=======
angular.module('jayaMekarApp')
  .controller('KaryawanCtrl', ['$scope', 'layananData', 'ngTableParams', '$filter', function ($scope, layananData, ngTableParams, $filter){
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
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
    
<<<<<<< HEAD
  }]);
/**********************************************************************************
* 
* @ E:KaryawanCtrl
*
***********************************************************************************/
=======
  }]);
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
