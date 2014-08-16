'use strict';

angular.module('jayaMekarApp')
  .factory('karyawanFactory', function ($q, $indexedDB, $log) {
    
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
                                        detailJabatan: cursorJabatan.value,
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
                    defer.resolve(result);
                };
            });

            return defer.promise;
        };

    // Public API here
    return {
      get: get
    };
  });
