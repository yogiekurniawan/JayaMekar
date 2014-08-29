'use strict';


angular.module('jayaMekarApp')

.controller('PenggajianCtrl', ['$scope', 'karyawanFactory', 'rumusGajiFactory', 'penggajianKaryawanHarianFactory',
    function($scope, karyawanFactory, rumusGajiFactory, penggajianKaryawanHarianFactory) {

        var that = $scope.PenggajianCtrl = this;

        this.karyawan = karyawanFactory.karyawan;
        this.rumusgaji = rumusGajiFactory.rumusgaji;
        this.penggajianKaryawanHarian = penggajianKaryawanHarianFactory.penggajian;
        this.maxSize = 7;
        this.numberPage = 1;
        this.limit = 10;

        karyawanFactory.get().then(function(result) {
            that.karyawan = result;
        });

        rumusGajiFactory.get().then(function(result) {
            that.rumusgaji = result;
        });

        penggajianKaryawanHarianFactory.getAll().then(function(result) {
            that.penggajianKaryawanHarian = result;
        });

        this.add = function(jenis) {
            var karyawan = that.karyawan;
            var rumusgaji = that.rumusgaji;
            var aksi = 'Tambah data';
            penggajianKaryawanHarianFactory.openModal(aksi, karyawan, rumusgaji, jenis);
        };

        this.edit = function(jenis, obj) {
            var karyawan = that.karyawan;
            var rumusgaji = that.rumusgaji;
            var aksi = 'Sunting data';
            penggajianKaryawanHarianFactory.openModal(aksi, karyawan, rumusgaji, jenis, obj);
        };

        this.delete = function(obj) {
            penggajianKaryawanHarianFactory.del(obj);
        };

    }
]);
