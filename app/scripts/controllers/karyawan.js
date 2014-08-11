'use strict';

angular.module('jayaMekarApp')

.controller('KaryawanCtrl',
    function($indexedDB) {

        var that = this;
        this.karyawan = [];

        $indexedDB.getKaryawan().then(function (result) {
            that.karyawan = result;
        });

        this.editKaryawan = function(obj) {
            console.log('Melakukan perubahan data karyawan', obj);
        };

        this.hapusKaryawan = function(obj) {
            console.log('Mlakukan penghapusan data karyawan', obj);
        };
    }
);
