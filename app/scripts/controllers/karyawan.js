'use strict';

angular.module('jayaMekarApp')
  .controller('KaryawanCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.search2 = 'Kerja';

  	$http.get('json/karyawan.json')
  		.then(function(res){
  			$scope.karyawan = res.data;
  		});

    $http.get('json/jabatan.json')
      .then(function(res){
        $scope.jabatan = res.data;
      });
  }]);

