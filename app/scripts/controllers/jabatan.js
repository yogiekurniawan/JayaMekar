'use strict';

angular.module('jayaMekarApp')
  .controller('JabatanCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('json/jabatan.json')
    	.then(function(res){
    		$scope.jabatan = res.data;
    	});
  }]);
