'use strict';

angular.module('jayaMekarApp')
    .factory('karyawanFactory', function($q, $indexedDB, $id, $log) {

        var updateSchema = function(obj) {
            var defer = $q.defer();
            var date = new Date().getTime();
            var nip = obj.nip ? obj.nip : 'Karyawan-'+$id();
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

        var add = function(obj) {
            var defer = $q.defer();
            var arrayObjStore = ['karyawan'];
            updateSchema(obj).then(function(newObj) {
                $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                    defer.resolve(success);
                });
            });
            return defer.promise;
        }; // E:add()

        var update = function(obj) {
            var defer = $q.defer();
            var arrayObjStore = ['karyawan'];
            updateSchema(obj).then(function(newObj) {
                $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                    defer.resolve(success);
                });
            });
            return defer.promise;
        }; // E:update()

        // Public API here
        return {
            get: get,
            add: add,
            update: update
        };
    });
