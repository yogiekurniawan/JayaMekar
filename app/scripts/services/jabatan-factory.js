'use strict';

angular.module('jayaMekarApp')
    .factory('jabatanFactory',['$q', '$log', '$indexedDB', '$id', function($q, $log, $indexedDB, $id) {

        var updateSchema = function(obj) {
            var defer = $q.defer();

            obj.waktu = obj.waktu || {};

            var date = new Date().getTime();
            var idJabatan = obj.idJabatan ? obj.idJabatan : 'Jabatan-'+$id();
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

                transactionJabatan.onerror = function(event){
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
                    defer.resolve(result);
                };
            });

            return defer.promise;
        }; // E:get()

        var add = function(obj) {
            var arrayObjStore = ['jabatan'];
            var defer = $q.defer();

            updateSchema(obj).then(function(newObj) {
                $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                    console.log('data ', success ,' berhasil disimpan');
                    defer.resolve();
                });
            });

            return defer.promise;
        }; // E:add()

        var edit = function(obj) {
            var arrayObjStore = ['jabatan'];
            var defer = $q.defer();

            updateSchema(obj).then(function(newObj) {
                $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                    console.log(success);
                    defer.resolve();
                });
            });

            return defer.promise;
        }; // E:save()

        var del = function(obj) {
            var objStore = 'jabatan';
            var defer = $q.defer();

            $indexedDB.delete(objStore, obj.idJabatan).then(function(success) {
                console.log(success);
                defer.resolve();
            });

            return defer.promise;
        };

        // Public API here
        return {
            get: get,
            add: add,
            edit: edit,
            del: del
        };
    }]);
