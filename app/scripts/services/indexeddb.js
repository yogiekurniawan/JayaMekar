'use strict';

angular.module('jayaMekarApp')

.provider('$indexedDB', function() {

    var idb = {};
    var db;

    idb.setUp = false;
    idb.namaIdb = 'JayaMekar';
    idb.versiIdb = 1;

    function GETTER($q) {

        this.getConfig = function() {
            return idb;
        };

        this.init = function() {
            var defer = $q.defer();

            if (idb.setUp) {
                defer.resolve(true);
                return defer.promise;
            }

            var openRequest = window.indexedDB.open(idb.namaIdb, idb.versiIdb);

            openRequest.onerror = function(event) {
                defer.reject(event.toString());
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
                    objectStore.createIndex('statusJabatan', 'statusJabatan', {
                        unique: false
                    });
                }
                if (!db.objectStoreNames.contains('karyawan')) {
                    objectStore = db.createObjectStore('karyawan', {
                        keyPath: 'nip',
                        unique: true
                    });
                    objectStore.createIndex('nip', 'nip', {
                        unique: false
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
                    objectStore.createIndex('statusRumusGaji', 'statusRumusGaji', {
                        unique: false
                    });
                }

                // E:Pembuatan ObjectStore
            };

            /* fungsi di panggil jika success */
            openRequest.onsuccess = function(event) {
                db = event.target.result;

                db.onerror = function(event) {
                    defer.reject('init() : Kesalahan DB' + event.target.errorCode);
                };
                idb.setUp = true;
                defer.resolve(true);
                console.log('Database siap digunakan');
            };

            return defer.promise;
        }; // E:this.init()

        this.getAll = function(arrObjectStore) {
            var result = [];
            var defer = $q.defer();

            this.init().then(function() {
                var handleResult = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    }
                };

                var transaction = db.transaction(arrObjectStore, 'readonly');

                angular.forEach(arrObjectStore, function(value) {
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

        this.get = function(objStore, key) {
            var defer = $q.defer();

            var transaction = db.transaction([objStore]);
            var objectStore = transaction.objectStore(objStore);
            var request = objectStore.get(key);

            request.onerror = function(event) {
                console.log('error', event);
            };

            request.onsuccess = function() {
                var data = request.result;
                defer.resolve(data);
            };

            return defer.promise;
        }; // E:this.get()

        this.getIndex = function(objStore, nameIndex, key) {
            var result = [];
            var defer = $q.defer();

            var transaction = db.transaction(objStore, 'readonly');
            var objectStore = transaction.objectStore(objStore);
            var index = objectStore.index(nameIndex);

            var request = index.openCursor(key);

            request.onerror = function(e) {
                console.log('error', e);
            };

            request.onsuccess = function() {
                var cursor = request.result;
                if (cursor) {
                    result.push(cursor.value);
                    cursor.continue();
                }
                defer.resolve(result);
            };

            return defer.promise;
        }; // E:this.getIndex()

        this.save = function(arrObjectStore, obj) {
            var defer = $q.defer();
            var transaction = db.transaction(arrObjectStore, 'readwrite');

            angular.forEach(arrObjectStore, function(value) {
                transaction.objectStore(value).put(obj);
            });

            transaction.onerror = function(e) {
                console.log('error', e);
            };
            transaction.oncomplete = function() {
                defer.resolve();
            };

            return defer.promise;
        }; // E:this.save()

        this.getJabatan = function() {
            var result = [];
            var arrObjStore = ['jabatan', 'karyawan'];
            var defer = $q.defer();

            this.init().then(function() {

                var transaction = db.transaction(arrObjStore, 'readonly');
                var jabatan = transaction.objectStore('jabatan').openCursor();

                jabatan.onsuccess = function(event) {
                    var cursorJabatan = event.target.result;

                    if (cursorJabatan) {

                        var data = {
                            idJabatan: cursorJabatan.value.idJabatan,
                            jabatan: cursorJabatan.value.jabatan,
                            waktu: cursorJabatan.value.waktu,
                            statusJabatan: cursorJabatan.value.statusJabatan,
                            jenis: cursorJabatan.value.jenis,
                            versi: cursorJabatan.value.versi,
                            karyawan: []
                        };

                        var karyawan = transaction.objectStore('karyawan')
                            .index('idJabatan')
                            .openCursor(cursorJabatan.value.idJabatan);

                        karyawan.onerror = function(e) {
                            console.log('error', e);
                        };
                        karyawan.onsuccess = function() {
                            var cursorKaryawan = karyawan.result;
                            if (cursorKaryawan) {
                                if (cursorKaryawan.value.idJabatan === cursorJabatan.value.idJabatan) {
                                    data.karyawan.push(cursorKaryawan.value);
                                    cursorKaryawan.continue();
                                } else {
                                    console.log('warning: id jabatan tidak sama');
                                }
                            } else {
                                cursorJabatan.continue();
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
        }; // E:this.getJabatan()

        this.getKaryawan = function() {
            var result = [];
            var arrObjStore = ['jabatan', 'karyawan'];
            var defer = $q.defer();

            this.init().then(function() {

                var transaction = db.transaction(arrObjStore, 'readonly');
                var jabatan = transaction.objectStore('jabatan').openCursor();

                jabatan.onsuccess = function(event) {
                    var cursorJabatan = event.target.result;

                    if (cursorJabatan) {

                        var karyawan = transaction.objectStore('karyawan')
                            .index('idJabatan').openCursor(cursorJabatan.value.idJabatan);

                        karyawan.onerror = function(e) {
                            console.log('error', e);
                        };

                        karyawan.onsuccess = function() {
                            var cursorKaryawan = karyawan.result;
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
                                    console.log('warning: id jabatan tidak sama');
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
        }; // E:this.getKaryawan()

        this.getRumusGaji = function() {
            var result = [];
            var arrObjStore = ['jabatan', 'rumusgaji'];
            var defer = $q.defer();

            this.init().then(function() {

                var transaction = db.transaction(arrObjStore, 'readonly');
                var jabatan = transaction.objectStore('jabatan').openCursor();

                jabatan.onsuccess = function(event) {
                    var cursorJabatan = event.target.result;

                    if (cursorJabatan) {

                        var rumusgaji = transaction.objectStore('rumusgaji')
                            .index('idJabatan').openCursor(cursorJabatan.value.idJabatan);

                        rumusgaji.onerror = function(e) {
                            console.log('error', e);
                        };

                        rumusgaji.onsuccess = function() {
                            var cursorRumusGaji = rumusgaji.result;
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
                                    console.log('warning: id jabatan tidak sama');
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

    } // getter()

    this.setConfig = function(value) {
        idb.namaIdb = value.namaIdb || idb.namaIdb;
        idb.versiIdb = value.versiIdb || idb.versiIdb;
    };

    this.$get = function($q) {
        return new GETTER($q);
    };
});
