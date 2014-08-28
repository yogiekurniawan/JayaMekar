'use strict';


angular.module('jayaMekarApp')

.controller('PenggajianCtrl', ['$scope', 'karyawanFactory', 'rumusGajiFactory', 'penggajianKaryawanHarianFactory', 'modalPenggajianFactory',
    function($scope, karyawanFactory, rumusGajiFactory, penggajianKaryawanHarianFactory, modalPenggajianFactory) {

        var that = $scope.PenggajianCtrl = this;

        this.karyawan = [];
        this.rumusgaji = [];
        this.penggajianKaryawanHarian = [];
        this.maxSize = 7;
        this.numberPage = 1;
        this.limit = 10;

        function getKaryawan() {
            karyawanFactory.get().then(function(result) {
                that.karyawan = result;
            });
        }
        getKaryawan();

        function getRumusGaji() {
            rumusGajiFactory.get().then(function(result) {
                that.rumusgaji = result;
            });
        }
        getRumusGaji();

        function getPenggajianKaryawanHarian() {
            penggajianKaryawanHarianFactory.getAll().then(function(result) {
                that.penggajianKaryawanHarian = result;
            });
        }
        getPenggajianKaryawanHarian();

        this.add = function(jenis) {
            var karyawan = that.karyawan;
            var rumusgaji = that.rumusgaji;
            var aksi = 'Tambah data';
            modalPenggajianFactory.open(aksi, karyawan, rumusgaji, jenis).then(function(result) {
                penggajianKaryawanHarianFactory.add(result).then(function() {
                    getPenggajianKaryawanHarian();
                });
            });
        };

        this.edit = function(jenis, obj) {
            var karyawan = that.karyawan;
            var rumusgaji = that.rumusgaji;
            var aksi = 'Sunting data';
            modalPenggajianFactory.open(aksi, karyawan, rumusgaji, jenis, obj).then(function(result) {
                // console.log(result);
                penggajianKaryawanHarianFactory.edit(result).then(function() {
                    getPenggajianKaryawanHarian();
                });
            });
        };

        this.delete = function(obj) {
            penggajianKaryawanHarianFactory.del(obj).then(function() {
                getPenggajianKaryawanHarian();
            });
        };

    }
]);
