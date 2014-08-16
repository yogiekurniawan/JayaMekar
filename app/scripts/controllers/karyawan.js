'use strict';

angular.module('jayaMekarApp')

.controller('KaryawanCtrl',
    function($scope, karyawanFactory) {

        var that = $scope.KaryawanCtrl = this;

        this.karyawan = [];
        this.maxSize = 7;
        this.numberPage = 1;
        this.limit = 10;

        karyawanFactory.get().then(function(result) {
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
