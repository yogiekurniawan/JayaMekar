'use strict';

/**********************************************************************************
* 
* @author : Yogie Kurniawan - yogie.jm@gmail.com
* @url    : scripts/controllers/jabatan.js
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
    $scope.jabatan = [];
    $scope.baru = false;

    var getAllJabatan = function(){
        /*  dari services indexeddb  */
        indexeddb.getAllJabatan().then(function(data){
            $scope.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : data");
        });
    };

    //$scope.data = "";

     $scope.newjabatan = function(){
        indexeddb.getAllJabatan().then(function(data){
            return data;
            console.log("HomeCtrl : getAllJabatan : data");
        });
     } 

/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan ***********************************/

    $scope.tambah = function(){
        $scope.baru = true;
        var data = {
            _id : "",
            namaJabatan : "",
            type : "",
            timeStamps: {
                timeCreate : new Date().getTime(),
                timeUpdate : new Date().getTime()
            },
            namaStatus : "Aktif"
        };
        $scope.jabatan.push(data);
    };

    $scope.simpan = function() {
        var data = {
            _id : "",
            namaJabatan : "Montir",
            type : "Harian",
            timeStamps: {
                timeCreate : new Date().getTime(),
                timeUpdate : new Date().getTime()
            },
            namaStatus : "Aktif"
        };

        /*  dari services indexeddb  */
        indexeddb.saveJabatan(data).then(function(data){
            console.log("data berhasil dimasukan");
            $scope.jabatan = data;
        });
    }
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
        key = false;
        console.log("function edit click "+  $scope.key);
    };

    $scope.save = function(key){
        this.j.key = true;
        console.log("function save click "+ this.j.key);
    };

    $scope.ngIfView = function(key){
        return key;
        console.log( key );
    }

    $scope.ngIfEdit = function(key){
        return "!"+key ;
        console.log( key );
    }

  }]);
/**********************************************************************************
* 
* @ E:JabatanCtrl
*
***********************************************************************************/