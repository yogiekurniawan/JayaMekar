'use strict';

angular.module('jayaMekarApp')

.controller('KaryawanCtrl', ['layananData',
    function(layananData) {

        var that = this;
        this.karyawan = [];

        layananData.getKaryawan().then(function(data) {
            that.karyawan = data;
        });

        this.editKaryawan = function(obj) {
        	console.log('Melakukan perubahan data karyawan', obj);
        };

        this.hapusKaryawan = function(obj) {
        	console.log('Mlakukan penghapusan data karyawan', obj);	
        };
    }
]);
