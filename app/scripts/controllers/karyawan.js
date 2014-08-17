'use strict';

angular.module('jayaMekarApp')

.controller('KaryawanCtrl',
    function($scope, $log, karyawanFactory, $indexedDB, modalKaryawanFactory) {

        var that = $scope.KaryawanCtrl = this;

        this.karyawan = [];
        this.jabatan = [];
        this.maxSize = 7;
        this.numberPage = 1;
        this.limit = 10;

        function getKaryawan() {
            karyawanFactory.get().then(function(result) {
                that.karyawan = result;
            });
        }

        getKaryawan();

        function getJabatan() {
            var arrayObjectStore = ['jabatan'];
            $indexedDB.getAll(arrayObjectStore).then(function(result) {
                that.jabatan = result;
                console.log(that.jabatan);
            });
        }

        getJabatan();


        this.add = function() {
            var jabatan = that.jabatan; 
            modalKaryawanFactory.open(jabatan).then(function(result) {
                console.log(result);
            });
        };

        this.edit = function(obj) {
            var jabatan = that.jabatan; 
            modalKaryawanFactory.open(jabatan,obj).then(function() {

            });
        };

        this.hapusKaryawan = function(obj) {
            console.log('Mlakukan penghapusan data karyawan', obj);
        };
    }
);
