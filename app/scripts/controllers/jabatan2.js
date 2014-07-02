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
* Name Controller       : JabatanCtrl
* Deskripsi             : Semua control untuk jabatan
*
***********************************************************************************/

  .controller('Jabatan2Ctrl', 
    ['$scope', 'indexeddb', '$filter', 
        function ($scope, indexeddb, $filter) {

/*********************************** S:getAllJabatan ***********************************/
    this.jabatan = indexeddb.data;

    this.baru = false;
    this.edited = false;
    this.type = [ "Borongan","Harian" ];
    this.status = [ "Aktif", "Tidak aktif" ];
    this.j = { status : this.status[0] };

    /*var getAllJabatan = function(){
        dari services indexeddb 
        indexeddb.getAllJabatan().then(function(data){
            this.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : ", data);
        });
    };*/

    indexeddb.getAllJabatan().then(function(data){
        indexeddb.data = data;
        this.jabatan = indexeddb.data;
        //this.jabatan = angular.copy(this.jabatan);
        console.log("first : ", this.jabatan);
    }.bind(this));


/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan ***********************************/

    this.tambah = function(){
        this.baru = true;
    };

    this.add = function(j) {

    	j.idJabatan = new Date().getTime();

        var data = {
            idJabatan : j.idJabatan,
            namaJabatan : j.namaJabatan,
            type : j.type,
            timeStamps: {
                timeCreate : new Date().getTime(),
                timeUpdate : new Date().getTime()
            },
            namaStatus : "Aktif",
        };

        /*  dari services indexeddb  */
        indexeddb.saveJabatan(data).then(function(){

        });

        this.baru = false;
    }

    this.simpan = function(j) {

        var data = {
            idJabatan : j.idJabatan,
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
        this.edited = false;
    }
/*********************************** E:saveJabatan ***********************************/


/*********************************** S:edit ***********************************/
    this.edit = function(j){
        this.edited = j;
    };
/*********************************** E:edit ***********************************/

/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/


    if(indexeddb.idbOK()){
        //getAllJabatan();
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