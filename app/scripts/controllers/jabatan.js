'use strict';

angular.module('jayaMekarApp')
  .controller('JabatanCtrl', ['$scope', 'layananData', 'indexeddb', function ($scope, layananData, indexeddb) {
    layananData.getJabatan().then(function(data){
    	$scope.jabatan2 = data;
    })

  var getAllJabatan = function(){
        indexeddb.getAllJabatan().then(function(data){
            $scope.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : data");
        });
    };

    $scope.saveJabatan = function(){
        var data = {};
        data.id = "";
        data.namaJabatan = "Operator Penggajian";
        data.type = "Harian";
        data.timeCreate = new Date().getTime();
        data.timeUpdate = new Date().getTime();
        data.namaStatus = "Aktif";

        indexeddb.saveJabatan(data).then(function(){
            console.log("data berhasil dimasukan");
            getAllJabatan();
        });

    };
    
    if(indexeddb.idbOK()){
        getAllJabatan();
        console.log("HomeCtrl : Browser support IDB");
    } else {
        console.log("HomeCtrl : Browser tidak support IDB");
    }

    $scope.edit = function(key){
	    $scope.key = true;
    	return console.log("function edit click " + !key);
    };

    $scope.save = function(key){
    	$scope.key = false;
    	console.log("function save click " + key);
    };

    $scope.ngIfView = function(key){
    	return "!"+key ;
    }

    $scope.ngIfEdit = function(key){
    	return key ;
    }

  }]);