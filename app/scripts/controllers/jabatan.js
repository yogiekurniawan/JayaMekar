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
* Name      : JabatanCtrl
* Deskripsi : Semua control untuk jabatan
*
***********************************************************************************/

  .controller('JabatanCtrl', 
    ['$scope', 'layananData', 'indexeddb', 
        function ($scope, layananData, indexeddb) {

/*********************************** S:getAllJabatan ***********************************/
  var getAllJabatan = function(){
        /*  dari services indexeddb  */
=======
angular.module('jayaMekarApp')
  .controller('JabatanCtrl', ['$scope', 'layananData', 'indexeddb', function ($scope, layananData, indexeddb) {
    layananData.getJabatan().then(function(data){
    	$scope.jabatan2 = data;
    })

  var getAllJabatan = function(){
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
        indexeddb.getAllJabatan().then(function(data){
            $scope.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : data");
        });
    };
<<<<<<< HEAD
/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan ***********************************/
=======

>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
    $scope.saveJabatan = function(){
        var data = {};
        data.id = "";
        data.namaJabatan = "Operator Penggajian";
        data.type = "Harian";
        data.timeCreate = new Date().getTime();
        data.timeUpdate = new Date().getTime();
        data.namaStatus = "Aktif";

<<<<<<< HEAD
        /*  dari services indexeddb  */
=======
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
        indexeddb.saveJabatan(data).then(function(){
            console.log("data berhasil dimasukan");
            getAllJabatan();
        });

    };
<<<<<<< HEAD
/*********************************** S:saveJabatan ***********************************/


/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/

=======
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
    
    if(indexeddb.idbOK()){
        getAllJabatan();
        console.log("HomeCtrl : Browser support IDB");
    } else {
        console.log("HomeCtrl : Browser tidak support IDB");
    }

    $scope.edit = function(key){
<<<<<<< HEAD
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
/**********************************************************************************
* 
* @ E:JabatanCtrl
*
***********************************************************************************/
=======
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
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
