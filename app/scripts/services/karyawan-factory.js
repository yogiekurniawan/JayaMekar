'use strict';

angular.module('jayaMekarApp')
    .factory('karyawanFactory', ['$q', '$indexedDB', '$id', '$log', '$modal',
        function($q, $indexedDB, $id, $log, $modal) {

            var karyawan = [];

            var updateSchema = function(obj) {
                var defer = $q.defer();
                var date = new Date().getTime();

                obj.waktu = obj.waktu || {};

                var nip = obj.nip ? obj.nip : 'Karyawan-' + $id();
                var dibuat = obj.waktu.dibuat ? obj.waktu.dibuat : date;
                var dirubah = date;
                var pertamaKerja = obj.waktu ? obj.waktu.pertamaKerja : date;
                var versi = obj.versi ? obj.versi + 1 : 1;

                var newSchema = {
                    'nip': nip,
                    'namaDepan': obj.namaDepan,
                    'namaBelakang': obj.namaBelakang,
                    'idJabatan': obj.idJabatan,
                    'kelompokKerja': obj.kelompokKerja,
                    'waktu': {
                        'dibuat': dibuat,
                        'dirubah': dirubah,
                        'pertamaKerja': pertamaKerja
                    },
                    'statusKaryawan': obj.statusKaryawan,
                    'versi': versi
                };

                defer.resolve(newSchema);
                return defer.promise;
            };

            var get = function() {
                var result = [];
                var arrayObjStore = ['jabatan', 'karyawan'];
                var defer = $q.defer();

                $indexedDB.init().then(function(db) {

                    var transaction = db.transaction(arrayObjStore, 'readonly');
                    var transactionJabatan = transaction.objectStore('jabatan').openCursor();

                    transactionJabatan.onsuccess = function(event) {
                        var cursorJabatan = event.target.result;

                        if (cursorJabatan) {

                            var transactionKaryawan = transaction.objectStore('karyawan')
                                .index('idJabatan').openCursor(cursorJabatan.value.idJabatan);

                            transactionKaryawan.onerror = function(event) {
                                $log.error(event.target.errorCode);
                            };

                            transactionKaryawan.onsuccess = function(event) {
                                var cursorKaryawan = event.target.result;
                                if (cursorKaryawan) {
                                    if (cursorKaryawan.value.idJabatan === cursorJabatan.value.idJabatan) {

                                        var data = {
                                            nip: cursorKaryawan.value.nip,
                                            namaDepan: cursorKaryawan.value.namaDepan,
                                            namaBelakang: cursorKaryawan.value.namaBelakang,
                                            idJabatan: cursorKaryawan.value.idJabatan,
                                            jabatan: cursorJabatan.value.jabatan,
                                            rincianJabatan: cursorJabatan.value,
                                            kelompokKerja: cursorKaryawan.value.kelompokKerja,
                                            waktu: cursorKaryawan.value.waktu,
                                            statusKaryawan: cursorKaryawan.value.statusKaryawan,
                                            versi: cursorKaryawan.value.versi
                                        };

                                        result.push(data);
                                    } else {
                                        $log.warn('warning: id jabatan tidak sama');
                                    }

                                    cursorKaryawan.continue();

                                } else {
                                    cursorJabatan.continue();
                                }
                            };

                        }
                    };

                    transaction.oncomplete = function() {
                        karyawan = result;
                        defer.resolve(result);
                    };
                });

                return defer.promise;
            };

            var getById = function(key) {
                var result = {};
                var arrayObjStore = ['jabatan', 'karyawan'];
                var defer = $q.defer();

                $indexedDB.init().then(function(db) {

                    var transaction = db.transaction(arrayObjStore, 'readonly');

                    var transactionKaryawan = transaction.objectStore('karyawan');
                    var transactionKaryawanById = transactionKaryawan.get(key);

                    transactionKaryawanById.onsuccess = function(event) {
                        var cursorKaryawan = event.target.result;

                        if (cursorKaryawan) {

                            var transactionJabatan = transaction.objectStore('jabatan');
                            var transactionJabatanById = transactionJabatan.get(cursorKaryawan.idJabatan);

                            transactionJabatanById.onerror = function(event) {
                                $log.error(event.target.errorCode);
                            };

                            transactionJabatanById.onsuccess = function(event) {
                                var cursorJabatan = event.target.result;

                                var data = {
                                    nip: cursorKaryawan.nip,
                                    namaDepan: cursorKaryawan.namaDepan,
                                    namaBelakang: cursorKaryawan.namaBelakang,
                                    idJabatan: cursorKaryawan.idJabatan,
                                    jabatan: cursorJabatan.jabatan,
                                    rincianJabatan: cursorJabatan,
                                    kelompokKerja: cursorKaryawan.kelompokKerja,
                                    waktu: cursorKaryawan.waktu,
                                    statusKaryawan: cursorKaryawan.statusKaryawan,
                                    versi: cursorKaryawan.versi
                                };

                                result = data;
                            };

                        }
                    };

                    transaction.oncomplete = function() {
                        defer.resolve(result);
                    };
                });

                return defer.promise;
            };

            var openModal = function(jabatan, obj) {

                $modal.open({
                    templateUrl: 'views/karyawan/modal-karyawan.html',
                    controller: function($scope, $modalInstance, obj) {

                        var that = $scope.modalKaryawanCtrl = this;

                        // jika parameter objek undifined maka objek kosong dibuat
                        this.obj = angular.copy(obj) || {};
                        this.obj.waktu = this.obj.waktu || {};
                        this.arrayJabatan = jabatan;
                        this.disabledStatusKaryawan = false;
                        this.objectJabatan = that.obj.rincianJabatan;
                        this.objectKelompokKerja = that.obj.kelompokKerja;
                        this.kelompokKerja = ['UM', 'UJ', 'NS'];
                        this.statusKaryawan = ['Kerja', 'Keluar'];

                        // jika obj.statusKaryawan undefined yang berarti sedang
                        // melakukan penambahan data.
                        if (angular.isUndefined(this.obj.statusKaryawan)) {
                            this.obj.statusKaryawan = 'Kerja';
                            this.disabledStatusKaryawan = true;
                        }

                        this.save = function(idJabatan, kelompokKerja, pertamaKerja) {
                            this.obj.idJabatan = idJabatan;
                            this.obj.kelompokKerja = kelompokKerja;
                            this.obj.waktu.pertamaKerja = pertamaKerja.getTime();

                            if (that.obj.nip) {
                                edit(that.obj);
                            } else {
                                add(that.obj);
                            }

                            $modalInstance.close();
                        };

                        this.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };


                        // S: Config untuk date
                        this.today = function() {
                            this.pertamaKerja = new Date();
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
                var arrayObjStore = ['karyawan'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                        getById(success.nip).then(function(result) {
                            karyawan.push(result);
                        });
                    });
                });
            }; // E:add()

            var edit = function(obj) {
                var arrayObjStore = ['karyawan'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                        getById(success.nip).then(function(result) {
                            angular.forEach(karyawan, function(value, key) {
                                if (value.nip === result.nip) {
                                    karyawan[key] = result;
                                }
                            });
                        });
                    });
                });
            }; // E:edit()

            var del = function(obj) {
                var objStore = 'karyawan';
                $indexedDB.delete(objStore, obj.nip).then(function(nip) {
                    angular.forEach(karyawan, function(value, key) {
                        if (value !== undefined && value.nip === nip) {
                            karyawan.splice(key, 1);
                        }
                    });
                });
            }; // E:del()

            // Public API here
            return {
                karyawan: karyawan,
                get: get,
                openModal: openModal,
                add: add,
                edit: edit,
                del: del
            };
        }
    ]);
