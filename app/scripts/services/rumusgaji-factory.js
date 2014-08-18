'use strict';

angular.module('jayaMekarApp')
    .factory('rumusGajiFactory', function($q, $indexedDB, $id, $log) {

        var updateSchema = function(obj) {
            var defer = $q.defer();
            var date = new Date().getTime();
            var idRumusGaji = obj.idRumusGaji ? obj.idRumusGaji : 'RumusGaji-' + $id();
            var dibuat = obj.waktu.dibuat ? obj.waktu.dibuat : date;
            var dirubah = obj.waktu.dirubah ? date : 0;
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
                'statusRumusGaji': obj.statusRumusGaji,
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
                            $log.error(event.target.errorCode);
                        };

                        transactionRumusgaji.onsuccess = function() {
                            var cursorRumusGaji = transactionRumusgaji.result;
                            if (cursorRumusGaji) {
                                if (cursorRumusGaji.value.idJabatan === cursorJabatan.value.idJabatan) {

                                    var schema = {
                                        idRumusGaji: cursorRumusGaji.value.idRumusGaji,
                                        idJabatan: cursorRumusGaji.value.idJabatan,
                                        jabatan: cursorJabatan.value.jabatan,
                                        detailJabatan: cursorJabatan.value,
                                        jenis: cursorRumusGaji.value.jenis,
                                        shift: cursorRumusGaji.value.shift,
                                        harga: cursorRumusGaji.value.harga,
                                        uangHadir: cursorRumusGaji.value.uangHadir,
                                        waktu: {
                                            dibuat: cursorRumusGaji.value.waktu.dibuat,
                                            dirubah: cursorRumusGaji.value.waktu.dirubah
                                        },
                                        statusRumusGaji: cursorRumusGaji.value.statusRumusGaji,
                                        versi: cursorRumusGaji.value.versi
                                    };

                                    if (cursorRumusGaji.value.jenis === 'Borongan') {
                                        schema.hargaTarget = cursorRumusGaji.value.hargaTarget;
                                        schema.targetProduksi = cursorRumusGaji.value.targetProduksi;
                                        schema.targetJmlProduksi = cursorRumusGaji.value.targetJmlProduksi;
                                    }

                                    result.push(schema);
                                } else {
                                    $log.warn('warning: id jabatan tidak sama');
                                }
                                cursorRumusGaji.continue();
                            } else {
                                cursorJabatan.continue();
                            }
                        };
                    }
                };

                transaction.oncomplete = function() {
                    defer.resolve(result);
                };
            });

            return defer.promise;
        }; // E:this.getRumusGaji()

        var add = function(obj) {
            var arrayObjStore = ['rumusgaji'];
            updateSchema(obj).then(function(newObj) {
                $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                    $log.info(success);
                });
            });
        }; // E:add()

        // Public API here
        return {
            get: get,
            add: add
        };
    });
