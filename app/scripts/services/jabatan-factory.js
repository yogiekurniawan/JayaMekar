'use strict';

angular.module('jayaMekarApp')
    .factory('jabatanFactory', function($q, $log, $indexedDB) {

        var get = function() {
            var result = [];
            var arrayObjStore = ['jabatan', 'karyawan', 'rumusgaji'];
            var defer = $q.defer();
            // $log.info('getJabatan', db);

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
                            statusJabatan: cursorJabatan.value.statusJabatan,
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

        // Public API here
        return {
            get: get
        };
    });
