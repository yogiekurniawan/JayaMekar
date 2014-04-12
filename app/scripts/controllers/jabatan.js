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
        indexeddb.getAllJabatan().then(function(data){
            $scope.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : data");
        });
    };
/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan ***********************************/

    $scope.saveJabatan = function(){
        var data = {};
        data.id = "";
        data.namaJabatan = "Operator Penggajian";
        data.type = "Harian";
        data.timeCreate = new Date().getTime();
        data.timeUpdate = new Date().getTime();
        data.namaStatus = "Aktif";

        /*  dari services indexeddb  */
        indexeddb.saveJabatan(data).then(function(){
            console.log("data berhasil dimasukan");
            getAllJabatan();
        });

    };

/*********************************** E:saveJabatan ***********************************/


/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/

    
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
