'use strict';

angular.module('jayaMekarApp')
    .factory('jabatanFactory', function($q, $log, $indexedDB, $id) {

        var updateSchema = function(obj) {
            var defer = $q.defer();
            var date = new Date().getTime();
            var idJabatan = obj.idJabatan ? obj.idJabatan : $id;
            var dibuat = obj.waktu.dibuat ? obj.waktu.dibuat : date;
            var dirubah = obj.waktu.dirubah ? date : 0;
            var versi = obj.versi ? obj.versi + 1 : 1;

            var skemaJabatan = {
                'idJabatan': idJabatan,
                'jabatan': obj.jabatan,
                'waktu': {
                    'dibuat': dibuat,
                    'dirubah': dirubah
                },
                'jenis': obj.jenis,
                'versi': versi
            };

            defer.resolve(skemaJabatan);
            return defer.promise;
        };

        var get = function() {
            var result = [];
            var arrayObjStore = ['jabatan', 'karyawan', 'rumusgaji'];
            var defer = $q.defer();

            $indexedDB.init().then(function(db) {
                var transaction = db.transaction(arrayObjStore, 'readonly');
                var transactionJabatan = transaction.objectStore('jabatan').openCursor();

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

                        var transactionKaryawan = transaction.objectStore('karyawan')
                            .index('idJabatan')
                            .openCursor(cursorJabatan.value.idJabatan);

                        transactionKaryawan.onerror = function(event) {
                            $log.error(event.target.errorCode);
                        };
                        transactionKaryawan.onsuccess = function() {
                            var cursorKaryawan = transactionKaryawan.result;
                            if (cursorKaryawan) {
                                if (cursorKaryawan.value.idJabatan === cursorJabatan.value.idJabatan) {
                                    data.karyawan.push(cursorKaryawan.value);
                                    cursorKaryawan.continue();
                                } else {
                                    $log.warn('warning: id jabatan tidak sama');
                                }
                            } else {
                                //cursorJabatan.continue();
                                var transactionRumusgaji = transaction.objectStore('rumusgaji')
                                    .index('idJabatan')
                                    .openCursor(cursorJabatan.value.idJabatan);

                                transactionRumusgaji.onerror = function(event) {
                                    $log.info('error', event);
                                };
                                transactionRumusgaji.onsuccess = function(event) {
                                    var cursorRumusGaji = event.target.result;
                                    if (cursorRumusGaji) {
                                        if (cursorRumusGaji.value.idJabatan === cursorJabatan.value.idJabatan) {
                                            data.rumusGaji.push(cursorRumusGaji.value);
                                            cursorRumusGaji.continue();
                                        } else {
                                            $log.warn('warning: id jabatan tidak sama');
                                        }
                                    } else {
                                        cursorJabatan.continue();
                                    }
                                };
                            }
                        };
                        result.push(data);
                    }
                };

                transaction.oncomplete = function() {
                    defer.resolve(result);
                };
            });

            return defer.promise;
        }; // E:get()

        var add = function(obj) {
            var arrayObjStore = ['jabatan'];
            updateSchema(obj).then(function(newObj) {
                $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                    $log.info(success);
                });
            });
        }; // E:add()

        var save = function(obj) {
            var arrayObjStore = ['jabatan'];
            updateSchema(obj).then(function(newObj) {
                $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                    $log.info(success);
                });
            });
        }; // E:save()

        var del = function(obj) {
            var objStore = 'jabatan';
            $indexedDB.delete(objStore, obj.idJabatan).then(function(result) {
                $log.info('delete', result);
            });
        };

        // Public API here
        return {
            get: get,
            add: add,
            save: save,
            del: del
        };
    });
