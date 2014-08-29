'use strict';

angular.module('jayaMekarApp')
    .factory('jabatanFactory', ['$q', '$modal', '$log', '$indexedDB', '$id',
        function($q, $modal, $log, $indexedDB, $id) {

            var jabatan = [];

            var updateSchema = function(obj) {
                var defer = $q.defer();

                obj.waktu = obj.waktu || {};

                var date = new Date().getTime();
                var idJabatan = obj.idJabatan ? obj.idJabatan : 'Jabatan-' + $id();
                var dibuat = obj.waktu.dibuat ? obj.waktu.dibuat : date;
                var dirubah = date;
                var versi = obj.versi ? obj.versi + 1 : 1;

                var newSchema = {
                    'idJabatan': idJabatan,
                    'jabatan': obj.jabatan,
                    'waktu': {
                        'dibuat': dibuat,
                        'dirubah': dirubah
                    },
                    'jenis': obj.jenis,
                    'versi': versi
                };

                defer.resolve(newSchema);
                return defer.promise;
            };

            var get = function() {
                var result = [];
                var arrayObjStore = ['jabatan'];
                var defer = $q.defer();

                $indexedDB.init().then(function(db) {
                    var transaction = db.transaction(arrayObjStore, 'readonly');
                    var transactionJabatan = transaction.objectStore('jabatan').openCursor();

                    transactionJabatan.onerror = function(event) {
                        $log.error(event.target.errorCode);
                    };

                    transactionJabatan.onsuccess = function(event) {
                        var cursorJabatan = event.target.result;

                        if (cursorJabatan) {

                            var data = {
                                idJabatan: cursorJabatan.value.idJabatan,
                                jabatan: cursorJabatan.value.jabatan,
                                waktu: cursorJabatan.value.waktu,
                                jenis: cursorJabatan.value.jenis,
                                versi: cursorJabatan.value.versi,
                                karyawan: [],
                                rumusGaji: []
                            };

                            // Mengambil data karyawan sesuai idJabatan
                            $indexedDB.getByIndex('karyawan', 'idJabatan', cursorJabatan.value.idJabatan)
                                .then(function(result) {
                                    data.karyawan = result;
                                });

                            // Mengambil data rumusgaji sesuai idJabatan
                            $indexedDB.getByIndex('rumusgaji', 'idJabatan', cursorJabatan.value.idJabatan)
                                .then(function(result) {
                                    data.rumusGaji = result;
                                });

                            result.push(data);
                            cursorJabatan.continue();
                        }
                    };

                    transaction.oncomplete = function() {
                        jabatan = result;
                        defer.resolve(result);
                    };
                });

                return defer.promise;
            }; // E:get()

            var getById = function(key) {
                var result = {};
                var arrayObjStore = ['jabatan'];
                var defer = $q.defer();

                $indexedDB.init().then(function(db) {
                    var transaction = db.transaction(arrayObjStore, 'readonly');
                    var transactionJabatan = transaction.objectStore('jabatan');
                    var transactionJabatanById = transactionJabatan.get(key);

                    transactionJabatanById.onerror = function(event) {
                        $log.error(event.target.errorCode);
                    };

                    transactionJabatanById.onsuccess = function(event) {
                        var cursorJabatan = event.target.result;

                        var data = {
                            idJabatan: cursorJabatan.idJabatan,
                            jabatan: cursorJabatan.jabatan,
                            waktu: cursorJabatan.waktu,
                            jenis: cursorJabatan.jenis,
                            versi: cursorJabatan.versi,
                            karyawan: [],
                            rumusGaji: []
                        };

                        // Mengambil data karyawan sesuai idJabatan
                        $indexedDB.getByIndex('karyawan', 'idJabatan', cursorJabatan.idJabatan)
                            .then(function(result) {
                                data.karyawan = result;
                            });

                        // Mengambil data rumusgaji sesuai idJabatan
                        $indexedDB.getByIndex('rumusgaji', 'idJabatan', cursorJabatan.idJabatan)
                            .then(function(result) {
                                data.rumusGaji = result;
                            });

                        result = data;
                    };

                    transaction.oncomplete = function() {
                        defer.resolve(result);
                    };
                });

                return defer.promise;
            }; // E:getById()

            var openModal = function(paramSize, paramObj) {
                $modal.open({
                    templateUrl: 'views/jabatan/modal-jabatan.html',
                    controller: function($scope, $modalInstance, obj) {

                        var that = $scope.modalJabatanCtrl = this;

                        this.obj = angular.copy(obj);
                        this.jenis = ['Harian', 'Borongan'];
                        this.aksi = 'add';

                        this.save = function() {
                            if (that.obj.idJabatan) {
                                edit(that.obj);
                            } else {
                                add(that.obj);
                            }
                            $modalInstance.close();
                        };

                        this.cancel = function() {
                            $modalInstance.dismiss();
                        };
                    },
                    size: paramSize,
                    backdrop: false,
                    resolve: {
                        obj: function() {
                            return paramObj;
                        }
                    }
                });
            }; // E:openModal()

            var add = function(obj) {
                var arrayObjStore = ['jabatan'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                        getById(success.idJabatan).then(function(result) {
                            jabatan.push(result);
                        });
                    });
                });
            }; // E:add()

            var edit = function(obj) {
                var arrayObjStore = ['jabatan'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                        getById(success.idJabatan).then(function(result) {
                            angular.forEach(jabatan, function(value, key) {
                                if (value.idJabatan === result.idJabatan) {
                                    jabatan[key] = result;
                                }
                            });
                        });
                    });
                });
            }; // E:save()

            var del = function(obj) {
                var objStore = 'jabatan';
                $indexedDB.delete(objStore, obj.idJabatan).then(function(idJabatan) {
                    angular.forEach(jabatan, function(value, key) {
                        if (value !== undefined && value.idJabatan === idJabatan) {
                            jabatan.splice(key, 1);
                        }
                    });
                });
            }; // E:del()

            // Public API here
            return {
                jabatan: jabatan,
                get: get,
                openModal: openModal,
                add: add,
                edit: edit,
                del: del
            };
        }
    ]);
