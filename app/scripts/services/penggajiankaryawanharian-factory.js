'use strict';

angular.module('jayaMekarApp')
    .factory('penggajianKaryawanHarianFactory', ['$q', '$indexedDB', '$id', '$log',
        function($q, $indexedDB, $id) {

            var updateSchema = function(obj) {
                var defer = $q.defer();
                var date = new Date().getTime();

                obj.waktu = obj.waktu || {};
                var idPenggajian = obj.idPenggajian ? obj.idPenggajian : 'Penggajian-' + $id();
                var dibuat = obj.waktu.dibuat ? obj.waktu.dibuat : date;
                var dirubah = date;
                var versi = obj.versi ? obj.versi + 1 : 1;
                // var namaBelakang = obj.rincianKaryawan.namaDepan || '';
                // var namaLengkap = obj.rincianKaryawan.namaDepan +' '+ namaBelakang;

                // normal schema untuk jenis jabatan harian
                var newSchema = {
                    'idPenggajian': idPenggajian,
                    'nip': obj.nip,
                    'namaLengkap': obj.namaLengkap,
                    'jabatan': obj.rincianRumusGaji.jabatan,
                    'rincianKaryawan': obj.rincianKaryawan,
                    'idRumusGaji': obj.rincianRumusGaji.idRumusGaji,
                    'rincianRumusGaji': obj.rincianRumusGaji,
                    'kehadiran': obj.kehadiran,
                    'uangHadir': obj.uangHadir,
                    'bonus': obj.bonus,
                    'gajipokok': obj.gajiPokok,
                    'totalGaji': obj.totalGaji,
                    'waktu': {
                        'dibuat': dibuat,
                        'dirubah': dirubah,
                        'penggajian': obj.waktu.tanggalPenggajian
                    },
                    'versi': versi
                };

                defer.resolve(newSchema);
                return defer.promise;
            };

            var getAll = function() {
                var defer = $q.defer();
                var arrayObjStore = ['penggajian'];
                $indexedDB.getAll(arrayObjStore).then(function(success) {
                    defer.resolve(success);
                });
                return defer.promise;
            };

            var add = function(obj) {
                var defer = $q.defer();
                var arrayObjStore = ['penggajian'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.add(arrayObjStore, newObj).then(function(success) {
                        defer.resolve(success);
                    });
                });
                return defer.promise;
            }; // E:add()

            var edit = function(obj) {
                var defer = $q.defer();
                var arrayObjStore = ['penggajian'];
                updateSchema(obj).then(function(newObj) {
                    $indexedDB.save(arrayObjStore, newObj).then(function(success) {
                        defer.resolve(success);
                    });
                });
                return defer.promise;
            }; // E:edit()

            var del = function(obj) {
                var objStore = 'penggajian';
                var defer = $q.defer();
                $indexedDB.delete(objStore, obj.idPenggajian).then(function(success) {
                    console.log(success);
                    defer.resolve();
                });
                return defer.promise;
            }; // E:del()

            // Public API here
            return {
                getAll: getAll,
                add: add,
                edit: edit,
                del: del
            };
        }
    ]);
