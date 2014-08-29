'use strict';

angular.module('jayaMekarApp')
    .factory('penggajianKaryawanHarianFactory', ['$q', '$indexedDB', '$id', '$modal', 'kalkulasiPenggajianFactory',
        function($q, $indexedDB, $id, $modal, kalkulasiPenggajianFactory) {

            var penggajian = [];

            var updateSchema = function(obj) {
                var defer = $q.defer();
                var date = new Date().getTime();

                obj.waktu = obj.waktu || {};
                var idPenggajian = obj.idPenggajian ? obj.idPenggajian : 'Penggajian-' + $id();
                var dibuat = obj.waktu.dibuat ? obj.waktu.dibuat : date;
                var dirubah = date;
                var versi = obj.versi ? obj.versi + 1 : 1;
                var rincianJabatan = angular.copy(obj.rincianKaryawan.rincianJabatan);
                delete obj.rincianKaryawan.rincianJabatan;
                delete obj.rincianRumusGaji.rincianJabatan;

                // normal schema untuk jenis jabatan harian
                var newSchema = {
                    'idPenggajian': idPenggajian,
                    'nip': obj.nip,
                    'namaLengkap': obj.namaLengkap,
                    'jabatan': obj.rincianRumusGaji.jabatan,
                    'idRumusGaji': obj.rincianRumusGaji.idRumusGaji,
                    'rincianJabatan': rincianJabatan,
                    'rincianKaryawan': obj.rincianKaryawan,
                    'rincianRumusGaji': obj.rincianRumusGaji,
                    'kehadiran': obj.kehadiran,
                    'uangHadir': obj.uangHadir,
                    'bonus': obj.bonus,
                    'gajipokok': obj.gajiPokok,
                    'totalGaji': obj.totalGaji,
                    'waktu': {
                        'dibuat': dibuat,
                        'dirubah': dirubah,
                        'penggajian': obj.waktu.tanggalPenggajian
                    },
                    'versi': versi
                };

                defer.resolve(newSchema);
                return defer.promise;
            };

            var getAll = function() {
                var defer = $q.defer();
                var arrayObjStore = ['penggajian'];
                $indexedDB.getAll(arrayObjStore).then(function(result) {
                    penggajian = result;
                    defer.resolve(result);
                });
                return defer.promise;
            };

            var getById = function(idPenggajian) {
                var defer = $q.defer();
                var objStore = 'penggajian';
                $indexedDB.getById(objStore, idPenggajian).then(function(result) {
                    defer.resolve(result);
                });
                return defer.promise;
            };

            var openModal = function(aksi, karyawan, rumusgaji, jenis, obj) {

                $modal.open({
                    templateUrl: 'views/penggajian/modal-penggajian.html',
                    controller: function($scope, $modalInstance, obj) {

                        var that = $scope.modalPenggajianCtrl = this;
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
                            this.obj.idPenggajian = idPenggajian;
                            this.obj.rincianKaryawan = this.objectKaryawan;
                            this.obj.nip = this.objectKaryawan.nip;
                            var namaBelakang = angular.isDefined(this.objectKaryawan.namaBelakang) ? this.objectKaryawan.namaBelakang : '';
                            this.obj.namaLengkap = this.objectKaryawan.namaDepan + ' ' + namaBelakang;
                            this.obj.jabatan = this.obj.rincianRumusGaji.jabatan;
                            this.obj.idRumusGaji = this.obj.rincianRumusGaji.idRumusGaji;

                            if (that.obj.idPenggajian) {
                                edit(that.obj);
                            } else {
                                add(that.obj);
                            }

                            $modalInstance.close();
                        };

                        this.cancel = function() {
                            $modalInstance.dismiss();
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

            };

            var add = function(obj) {
                var defer = $q.defer();
                var arrayObjStore = ['penggajian'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                        getById(success.idPenggajian).then(function(result) {
                            penggajian.push(result);
                        });
                    });
                });
                return defer.promise;
            }; // E:add()

            var edit = function(obj) {
                var arrayObjStore = ['penggajian'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                        getById(success.idPenggajian).then(function(result) {
                            angular.forEach(penggajian, function(value, key) {
                                if (value.idPenggajian === result.idPenggajian) {
                                    penggajian[key] = result;
                                }
                            });
                        });
                    });
                });
            }; // E:edit()

            var del = function(obj) {
                var objStore = 'penggajian';
                $indexedDB.delete(objStore, obj.idPenggajian).then(function(idPenggajian) {
                    angular.forEach(penggajian, function(value, key) {
                        if (value !== undefined && value.idPenggajian === idPenggajian) {
                            penggajian.splice(key, 1);
                        }
                    });
                });
            }; // E:del()

            // Public API here
            return {
                penggajian: penggajian,
                getAll: getAll,
                openModal: openModal,
                add: add,
                edit: edit,
                del: del
            };
        }
    ]);
