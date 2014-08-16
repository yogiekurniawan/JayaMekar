'use strict';

angular.module('jayaMekarApp')
    .factory('rumusGajiFactory', function($q, $indexedDB, $log) {

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

                                    var data = {
                                        idRumusGaji: cursorRumusGaji.value.idRumusGaji,
                                        idJabatan: cursorRumusGaji.value.idJabatan,
                                        jabatan: cursorJabatan.value.jabatan,
                                        detailJabatan: cursorJabatan.value,
                                        jenis: cursorRumusGaji.value.jenis,
                                        shift: cursorRumusGaji.value.shift,
                                        harga: cursorRumusGaji.value.harga,
                                        uangHadir: cursorRumusGaji.value.uangHadir,
                                        waktu: {
                                            dibuat: cursorRumusGaji.value.dibuat,
                                            dirubah: cursorRumusGaji.value.dirubah
                                        },
                                        statusRumusGaji: cursorRumusGaji.value.statusRumusGaji,
                                        versi: cursorRumusGaji.value.versi
                                    };

                                    result.push(data);
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

        // Public API here
        return {
            get: get
        };
    });
