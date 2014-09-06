'use strict';

angular.module('jayaMekarApp')

.controller('KaryawanCtrl', ['$scope', 'karyawanFactory', '$indexedDB',
    function($scope, karyawanFactory, $indexedDB) {

        var that = $scope.KaryawanCtrl = this;

        this.karyawan = karyawanFactory.karyawan;
        this.jabatan = [];
        this.maxSize = 7;
        this.numberPage = 1;
        this.limit = 10;

        $indexedDB.getAll(['jabatan']).then(function(result) {
            that.jabatan = result;
        });

        karyawanFactory.get().then(function(result) {
            that.karyawan = result;
        });


        this.add = function() {
            var jabatan = that.jabatan;
            karyawanFactory.openModal(jabatan);
        };

        this.edit = function(obj) {
            var jabatan = that.jabatan;
            karyawanFactory.openModal(jabatan, obj);
        };

        this.delete = function(obj) {
            karyawanFactory.del(obj);
        };

    }
]);
