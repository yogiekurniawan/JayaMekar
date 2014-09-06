'use strict';

angular.module('jayaMekarApp')
    .factory('rumusGajiFactory', ['$q', '$indexedDB', '$id', '$log', '$modal',
        function($q, $indexedDB, $id, $log, $modal) {

            var rumusgaji = [];

            var updateSchema = function(obj) {
                var defer = $q.defer();
                var date = new Date().getTime();
                var idRumusGaji = obj.idRumusGaji ? obj.idRumusGaji : 'RumusGaji-' + $id();
                var dibuat = obj.waktu.dibuat ? obj.waktu.dibuat : date;
                var dirubah = date;
                var versi = obj.versi ? obj.versi + 1 : 1;

                var newSchema = {
                    'idRumusGaji': idRumusGaji,
                    'idJabatan': obj.idJabatan,
                    'jenis': obj.jenis,
                    'shift': obj.shift,
                    'harga': obj.harga,
                    'uangHadir': obj.uangHadir,
                    'waktu': {
                        'dibuat': dibuat,
                        'dirubah': dirubah
                    },
                    'versi': versi
                };

                if (obj.jenis === 'Borongan') {
                    newSchema.hargaTarget = obj.hargaTarget;
                    newSchema.targetProduksi = obj.targetProduksi;
                    newSchema.targetJmlProduksi = obj.targetJmlProduksi;
                }

                defer.resolve(newSchema);
                return defer.promise;
            };

            var get = function() {
                var result = [];
                var arrayObjStore = ['jabatan', 'rumusgaji'];
                var defer = $q.defer();

                $indexedDB.init().then(function(db) {

                    var transaction = db.transaction(arrayObjStore, 'readonly');
                    var transactionJabatan = transaction.objectStore('jabatan').openCursor();

                    transactionJabatan.onsuccess = function(event) {
                        var cursorJabatan = event.target.result;

                        if (cursorJabatan) {

                            var transactionRumusgaji = transaction.objectStore('rumusgaji')
                                .index('idJabatan').openCursor(cursorJabatan.value.idJabatan);

                            transactionRumusgaji.onerror = function(event) {
                                $log.error('transactionRumusgaji.onerror' + event.target.errorCode);
                            };

                            transactionRumusgaji.onsuccess = function() {
                                var cursorRumusGaji = transactionRumusgaji.result;
                                if (cursorRumusGaji) {
                                    if (cursorRumusGaji.value.idJabatan === cursorJabatan.value.idJabatan) {

                                        var schema = {
                                            idRumusGaji: cursorRumusGaji.value.idRumusGaji,
                                            idJabatan: cursorRumusGaji.value.idJabatan,
                                            jabatan: cursorJabatan.value.jabatan,
                                            rincianJabatan: cursorJabatan.value,
                                            jenis: cursorRumusGaji.value.jenis,
                                            shift: cursorRumusGaji.value.shift,
                                            harga: cursorRumusGaji.value.harga,
                                            uangHadir: cursorRumusGaji.value.uangHadir,
                                            waktu: {
                                                dibuat: cursorRumusGaji.value.waktu.dibuat,
                                                dirubah: cursorRumusGaji.value.waktu.dirubah
                                            },
                                            versi: cursorRumusGaji.value.versi
                                        };

                                        if (cursorRumusGaji.value.jenis === 'Borongan') {
                                            schema.hargaTarget = cursorRumusGaji.value.hargaTarget;
                                            schema.targetProduksi = cursorRumusGaji.value.targetProduksi;
                                            schema.targetJmlProduksi = cursorRumusGaji.value.targetJmlProduksi;
                                        }

                                        result.push(schema);
                                    } else {
                                        $log.warn('warning: id jabatan tidak sama => transactionRumusgaji.onsuccess');
                                    }
                                    cursorRumusGaji.continue();
                                } else {
                                    cursorJabatan.continue();
                                }
                            };
                        }
                    };

                    transaction.oncomplete = function() {
                        rumusgaji = result;
                        defer.resolve(result);
                    };
                });

                return defer.promise;
            }; // E:this.get()

            var getById = function(key) {
                var result = {};
                var arrayObjStore = ['jabatan', 'rumusgaji'];
                var defer = $q.defer();

                $indexedDB.init().then(function(db) {

                    var transaction = db.transaction(arrayObjStore, 'readonly');
                    var transactionRumusgaji = transaction.objectStore('rumusgaji');
                    var transactionKaryawanById = transactionRumusgaji.get(key);

                    transactionKaryawanById.onsuccess = function(event) {
                        var cursorRumusGaji = event.target.result;

                        if (cursorRumusGaji) {

                            var transactionJabatan = transaction.objectStore('jabatan');
                            var transactionJabatanById = transactionJabatan.get(cursorRumusGaji.idJabatan);

                            transactionJabatanById.onerror = function(event) {
                                $log.error('transactionJabatanById.onerror' + event.target.errorCode);
                            };

                            transactionJabatanById.onsuccess = function() {
                                var cursorJabatan = transactionJabatanById.result;

                                var data = {
                                    idRumusGaji: cursorRumusGaji.idRumusGaji,
                                    idJabatan: cursorRumusGaji.idJabatan,
                                    jabatan: cursorJabatan.jabatan,
                                    rincianJabatan: cursorJabatan,
                                    jenis: cursorRumusGaji.jenis,
                                    shift: cursorRumusGaji.shift,
                                    harga: cursorRumusGaji.harga,
                                    uangHadir: cursorRumusGaji.uangHadir,
                                    waktu: {
                                        dibuat: cursorRumusGaji.waktu.dibuat,
                                        dirubah: cursorRumusGaji.waktu.dirubah
                                    },
                                    versi: cursorRumusGaji.versi
                                };

                                if (cursorRumusGaji.jenis === 'Borongan') {
                                    data.hargaTarget = cursorRumusGaji.hargaTarget;
                                    data.targetProduksi = cursorRumusGaji.targetProduksi;
                                    data.targetJmlProduksi = cursorRumusGaji.targetJmlProduksi;
                                }

                                result = data;

                            };
                        }
                    };

                    transaction.oncomplete = function() {
                        defer.resolve(result);
                    };
                });

                return defer.promise;
            }; // E:this.getById()

            var openModal = function(jenis, jabatan, obj) {

                $modal.open({
                    templateUrl: 'views/rumus-gaji/modal-rumus-gaji.html',
                    controller: function($scope, $modalInstance, obj) {

                        var that = $scope.modalRumusGaji = this;

                        // jika parameter objek undifined maka objek kosong dibuat
                        this.obj = angular.copy(obj) || {};
                        this.obj.waktu = this.obj.waktu || {};
                        this.arrayJabatan = jabatan;
                        this.objectJabatan = that.obj.rincianJabatan;
                        this.shift = ['Siang', 'Malam'];
                        this.jenis = jenis;

                        this.save = function(objJabatan) {
                            this.obj.idJabatan = objJabatan.idJabatan;
                            this.obj.jenis = objJabatan.jenis;

                            if (that.obj.idRumusGaji) {
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
                    // size: size,
                    backdrop: false,
                    resolve: {
                        obj: function() {
                            return obj;
                        }
                    }
                });

            }; // E:openModel()

            var add = function(obj) {
                var arrayObjStore = ['rumusgaji'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                        getById(success.idRumusGaji).then(function(result) {
                            rumusgaji.push(result);
                        });
                    });
                });
            }; // E:add()

            var edit = function(obj) {
                var arrayObjStore = ['rumusgaji'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                        getById(success.idRumusGaji).then(function(result) {
                            angular.forEach(rumusgaji, function(value, key) {
                                if (value.idRumusGaji === result.idRumusGaji) {
                                    rumusgaji[key] = result;
                                }
                            });
                        });
                    });
                });
            }; // E:edit()

            var del = function(obj) {
                var objStore = 'rumusgaji';
                $indexedDB.delete(objStore, obj.idRumusGaji).then(function(idRumusGaji) {
                    angular.forEach(rumusgaji, function(value, key) {
                        if (value !== undefined && value.idRumusGaji === idRumusGaji) {
                            rumusgaji.splice(key, 1);
                        }
                    });
                });
            }; // E:del()

            // Public API here
            return {
                rumusgaji: rumusgaji,   
                get: get,
                openModal: openModal,
                add: add,
                edit: edit,
                del: del
            };
        }
    ]);
