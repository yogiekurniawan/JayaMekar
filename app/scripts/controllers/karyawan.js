'use strict';

angular.module('jayaMekarApp')

.controller('KaryawanCtrl',
    function($scope, karyawanFactory, modalKaryawanFactory) {

        var that = $scope.KaryawanCtrl = this;

        this.karyawan = [];
        this.maxSize = 7;
        this.numberPage = 1;
        this.limit = 10;

        karyawanFactory.get().then(function(result) {
            that.karyawan = result;
        });

        this.add = function(){
            modalKaryawanFactory.open().then(function(){

            });
        };

        this.edit = function(obj) {
            modalKaryawanFactory.open('', obj).then(function(){

            });
        };

        this.hapusKaryawan = function(obj) {
            console.log('Mlakukan penghapusan data karyawan', obj);
        };
    }
);
