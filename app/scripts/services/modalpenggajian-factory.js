'use strict';

angular.module('jayaMekarApp')
    .factory('modalPenggajianFactory', ['$q', '$log', '$modal', 'kalkulasiPenggajianFactory',
        function($q, $log, $modal, kalkulasiPenggajianFactory) {

            var open = function(aksi, karyawan, rumusgaji, jenis, obj) {
                var defer = $q.defer();

                var modalKaryawan = $modal.open({
                    templateUrl: 'views/penggajian/modal-penggajian.html',
                    controller: function($scope, $modalInstance, obj) {

                        var that = $scope.modalPenggajianCtrl = this;
                        console.log('debug', obj);
                        // jika parameter objek undifined maka objek kosong dibuat
                        // kondisi saat penambahan data baru
                        this.obj = angular.copy(obj) || {};
                        this.obj.waktu = this.obj.waktu || {};

                        if (obj) {
                            this.objectKaryawan = obj.rincianKaryawan;
                            this.obj.rincianRumusGaji = obj.rincianRumusGaji;
                        }

                        this.aksi = aksi;
                        this.jenis = jenis;
                        this.arrayKaryawan = karyawan;
                        this.arrayRumusGaji = rumusgaji;






                        // obj rumus gaji yang dipilih di form
                        // this.objectRumusGaji = that.obj.rincianRumusGaji;

                        $scope.$watch(function() {
                            that.obj.uangHadir = kalkulasiPenggajianFactory.uangHadir(that.obj.kehadiran, that.obj.rincianRumusGaji);
                            that.obj.gajiPokok = kalkulasiPenggajianFactory.gajiPokokHarian(that.obj.kehadiran, that.obj.rincianRumusGaji);
                            that.obj.totalGaji = kalkulasiPenggajianFactory.totalGaji(that.obj);
                        });

                        this.resetPenggajian = function() {
                            that.obj.rincianRumusGaji = '';
                            that.obj.uangHadir = '';
                        };

                        this.save = function(idPenggajian) {
                            this.obj.waktu.tanggalPenggajian = this.tanggalPenggajian.getTime();
                            console.log(this.tanggalPenggajian.getTime());
                            this.obj.idPenggajian = idPenggajian;
                            this.obj.rincianKaryawan = this.objectKaryawan;
                            this.obj.nip = this.objectKaryawan.nip;
                            var namaBelakang = angular.isDefined(this.objectKaryawan.namaBelakang) ? this.objectKaryawan.namaBelakang : '';
                            this.obj.namaLengkap = this.objectKaryawan.namaDepan + ' ' + namaBelakang;
                            this.obj.jabatan = this.obj.rincianRumusGaji.jabatan;
                            this.obj.idRumusGaji = this.obj.rincianRumusGaji.idRumusGaji;
                            $modalInstance.close(that.obj);
                        };

                        this.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };



                        // S: Config untuk date
                        this.today = function() {
                            this.tanggalPenggajian = new Date();
                        };
                        this.today();


                        this.open = function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();

                            this.opened = true;
                        };

                        this.dateOptions = {
                            formatYear: 'yy',
                            startingDay: 1
                        };

                        this.format = 'dd MMMM yyyy';
                        // E: Config untuk date

                    },
                    backdrop: false,
                    resolve: {
                        obj: function() {
                            return obj;
                        }
                    }
                });

                modalKaryawan.result.then(function(result) {
                    defer.resolve(result);
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });

                return defer.promise;
            };

            return {
                open: open
            };
        }
    ]);
