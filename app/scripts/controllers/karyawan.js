'use strict';

angular.module('jayaMekarApp')

.controller('KaryawanCtrl', ['layananData', 'data', '$indexedDB',
    function(layananData, data, $indexedDB) {

        var that = this;
        this.jabatan = [];
        this.karyawan = [];

        /*layananData.getKaryawan().then(function(data) {
            that.karyawan = data;
        });*/

        /*layananData.getKaryawanFillText().then(function(data) {
            that.karyawan = data;

        });*/

        // function getKaryawan () {

        // }

        // data.getJabatan().then(function(result) {
        //     that.jabatan = result;
        // });

        /*$indexedDB.getIndex("karyawan", "idJabatan", "J003").then(function (result) {
            console.log(result);
        });*/

        $indexedDB.getKaryawan().then(function (result) {
            console.log(result);
            that.karyawan = result;
        });

        data.getKaryawan().then(function(result) {
            that.karyawan = result;
        });

        this.editKaryawan = function(obj) {
            console.log('Melakukan perubahan data karyawan', obj);
        };

        this.hapusKaryawan = function(obj) {
            console.log('Mlakukan penghapusan data karyawan', obj);
        };
    }
]);
