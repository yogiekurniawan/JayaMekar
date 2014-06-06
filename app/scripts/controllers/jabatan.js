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
    ['$scope', 'indexeddb', '$filter', 
        function ($scope, indexeddb, $filter) {

/*********************************** S:getAllJabatan ***********************************/
    $scope.jabatan = [];

    $scope.baru = false;
    $scope.edited = false;
    $scope.type = [ "Borongan","Harian" ];
    $scope.status = [ "Aktif", "Tidak aktif" ];
    $scope.namaStatus = $scope.status[0];

    var getAllJabatan = function(){
        /*  dari services indexeddb  */
        indexeddb.getAllJabatan().then(function(data){
            $scope.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : ", data);
        });
    };

/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan ***********************************/

    $scope.tambah = function(){
        $scope.baru = true;
    };

    $scope.add = function(j, nStatus) {

        var data = {
            _id : j.idJabatan,
            namaJabatan : j.namaJabatan,
            type : j.type,
            timeStamps: {
                timeCreate : new Date().getTime(),
                timeUpdate : new Date().getTime()
            },
            namaStatus : nStatus,
        };

        /*  dari services indexeddb  */
        indexeddb.saveJabatan(data).then(function(data){
            $scope.jabatan = data;
        });
            console.log("data berhasil dimasukan", data);

        $scope.baru = false;
    }

    $scope.simpan = function(j) {

        var data = {
            _id : j.idJabatan,
            namaJabatan : j.namaJabatan,
            type : j.type,
            timeStamps: {
                timeCreate : j.timeStamps.create,
                timeUpdate : new Date().getTime()
            },
            namaStatus : j.namaStatus,
        };

        /*  dari services indexeddb  */
        indexeddb.saveJabatan(data).then(function(){
            console.log("data berhasil disimpan", data);
        });
            //console.log(data);
        $scope.edited = false;
    }
/*********************************** E:saveJabatan ***********************************/


/*********************************** S:edit ***********************************/
    $scope.edit = function(j){
        $scope.edited = j;
    };
/*********************************** E:edit ***********************************/

/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/


    if(indexeddb.idbOK()){
        getAllJabatan();
        console.log("HomeCtrl : Browser support IDB");
    } else {
        console.log("HomeCtrl : Browser tidak support IDB");
    }

  }]);
/**********************************************************************************
* 
* @ E:JabatanCtrl
*
***********************************************************************************/