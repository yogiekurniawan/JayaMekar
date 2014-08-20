'use strict';

angular.module('jayaMekarApp')

.provider('$indexedDB', function() {

    var idb = {
        namaIdb: 'Jaya Mekar',
        versiIdb: 1
    };

    function GETTER($q, $log) {

        this.init = function() {
            var defer = $q.defer();
            var db;

            var openRequest = window.indexedDB.open(idb.namaIdb, idb.versiIdb);

            openRequest.onerror = function(event) {
                $log.error(event.target.errorCode);
            };
            openRequest.onupgradeneeded = function(event) {
                db = event.target.result;
                var objectStore;
                // S:Pembuatan ObjectStore
                //   Jika objectStore belum ada maka objectStre akan dibuat
                if (!db.objectStoreNames.contains('jabatan')) {
                    objectStore = db.createObjectStore('jabatan', {
                        keyPath: 'idJabatan',
                        autoIncrement: true
                    });
                    objectStore.createIndex('idJabatan', 'idJabatan', {
                        unique: false
                    });
                    objectStore.createIndex('jabatan', 'jabatan', {
                        unique: false
                    });
                }
                if (!db.objectStoreNames.contains('karyawan')) {
                    objectStore = db.createObjectStore('karyawan', {
                        keyPath: 'nip',
                        unique: true
                    });
                    objectStore.createIndex('nip', 'nip', {
                        unique: true
                    });
                    objectStore.createIndex('namaDepan', 'namaDepan', {
                        unique: false
                    });
                    objectStore.createIndex('idJabatan', 'idJabatan', {
                        unique: false
                    });
                    objectStore.createIndex('kelompokKerja', 'kelompokKerja', {
                        unique: false
                    });
                    objectStore.createIndex('statusKaryawan', 'statusKaryawan', {
                        unique: false
                    });
                }
                if (!db.objectStoreNames.contains('rumusgaji')) {
                    objectStore = db.createObjectStore('rumusgaji', {
                        keyPath: 'idRumusGaji',
                        unique: true
                    });
                    objectStore.createIndex('idRumusGaji', 'idRumusGaji', {
                        unique: true
                    });
                    objectStore.createIndex('idJabatan', 'idJabatan', {
                        unique: false
                    });
                    objectStore.createIndex('jenis', 'jenis', {
                        unique: false
                    });
                    objectStore.createIndex('shift', 'shift', {
                        unique: false
                    });
                }
                if (!db.objectStoreNames.contains('penggajian')) {
                    objectStore = db.createObjectStore('penggajian', {
                        keyPath: 'idPenggajian',
                        unique: true
                    });
                    objectStore.createIndex('idPenggajian', 'idPenggajian', {
                        unique: true
                    });
                    objectStore.createIndex('nip', 'nip', {
                        unique: false
                    });
                    objectStore.createIndex('idJabatan', 'idJabatan', {
                        unique: false
                    });
                    objectStore.createIndex('jenis', 'jenis', {
                        unique: false
                    });
                    objectStore.createIndex('shift', 'shift', {
                        unique: false
                    });
                }

                // E:Pembuatan ObjectStore
            };

            /* fungsi di panggil jika success */
            openRequest.onsuccess = function(event) {
                db = event.target.result;

                db.onerror = function(event) {
                    defer.reject(event.target.errorCode);
                };
                defer.resolve(db);
            };

            return defer.promise;
        }; // E:this.init()

        this.getAll = function(arrayObjStore) {
            var result = [];
            var defer = $q.defer();

            this.init().then(function(db) {
                var handleResult = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    }
                };

                var transaction = db.transaction(arrayObjStore, 'readonly');

                angular.forEach(arrayObjStore, function(value) {
                    transaction.objectStore(value)
                        .openCursor()
                        .onsuccess = handleResult;
                });

                transaction.oncomplete = function() {
                    defer.resolve(result);
                };
            });

            return defer.promise;
        }; // E:this.getAll()

        this.getById = function(objStore, key) {
            var defer = $q.defer();

            this.init().then(function(db) {
                var transaction = db.transaction([objStore]);
                var objectStore = transaction.objectStore(objStore);
                var request = objectStore.get(key);

                request.onerror = function(event) {
                    $log.error(event.target.errorCode);
                };

                request.onsuccess = function() {
                    var data = request.result;
                    defer.resolve(data);
                };
            });

            return defer.promise;
        }; // E:this.getById()

        this.getByIndex = function(objStore, nameIndex, key) {
            var result = [];
            var defer = $q.defer();

            this.init().then(function(db) {
                var transaction = db.transaction(objStore, 'readonly');
                var objectStore = transaction.objectStore(objStore);
                var index = objectStore.index(nameIndex);

                var request = index.openCursor(key);

                request.onerror = function(event) {
                    $log.error(event.target.errorCode);
                };

                request.onsuccess = function() {
                    var cursor = request.result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    }
                    defer.resolve(result);
                };
            });

            return defer.promise;
        }; // E:this.getByIndex()

        this.add = function(arrayObjStore, obj) {
            var defer = $q.defer();

            this.init().then(function(db) {

                var transaction = db.transaction(arrayObjStore, 'readwrite');

                angular.forEach(arrayObjStore, function(value) {
                    transaction.objectStore(value).add(obj);
                });

                transaction.onerror = function(event) {
                    $log.error(event.target.errorCode);
                };
                transaction.oncomplete = function() {
                    defer.resolve(obj);
                };
            });

            return defer.promise;
        }; // E:this.add()

        this.save = function(arrayObjStore, obj) {
            var defer = $q.defer();

            this.init().then(function(db) {

                var transaction = db.transaction(arrayObjStore, 'readwrite');

                angular.forEach(arrayObjStore, function(value) {
                    transaction.objectStore(value).put(obj);
                });

                transaction.onerror = function(event) {
                    $log.error(event.target.errorCode);
                };
                transaction.oncomplete = function() {
                    defer.resolve('Data dengan ' + obj + ' berhasil dirubah.');
                };
            });

            return defer.promise;
        }; // E:this.save()

        this.delete = function(objStore, key) {
            var defer = $q.defer();

            this.init().then(function(db) {
                var transaction = db.transaction([objStore], 'readwrite');
                var objectStore = transaction.objectStore(objStore);
                var request = objectStore.delete(key);

                request.onerror = function(event) {
                    $log.error(event.target.errorCode);
                };

                request.onsuccess = function() {
                    defer.resolve('Data dengan ' + key + ' berhasil dihapus.');
                };
            });

            return defer.promise;
        }; // E:this.get()

    } // getter()

    this.setConfig = function(value) {
        idb.namaIdb = value.namaIdb || idb.namaIdb;
        idb.versiIdb = value.versiIdb || idb.versiIdb;
    };

    this.$get = function($q, $log) {
        return new GETTER($q, $log);
    };
});
