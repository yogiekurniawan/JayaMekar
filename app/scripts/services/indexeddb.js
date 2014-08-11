'use strict';

angular.module('jayaMekarApp')

.provider('$indexedDB', function() {

    var idb = {};
    var db;

    idb.setUp = false;
    idb.namaIdb = "JayaMekar";
    idb.versiIdb = 1;

    function getter($q) {

        var that = this;

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

            openRequest.onerror = function(e) {
                defer.reject(e.toString());
            };

            openRequest.onupgradeneeded = function(e) {
                db = e.target.result;

                // S:Pembuatan ObjectStore
                //   Jika objectStore belum ada maka objectStre akan dibuat
                if (!db.objectStoreNames.contains("jabatan")) {
                    var objectStore = db.createObjectStore("jabatan", { keyPath: "idJabatan", autoIncrement: true });
                    objectStore.createIndex("jabatan", "jabatan", { unique: false });
                    objectStore.createIndex("statusJabatan", "statusJabatan", { unique: false });
                }
                if (!db.objectStoreNames.contains("karyawan")) {
                    var objectStore = db.createObjectStore("karyawan", { keyPath: "nip", unique: true });
                    objectStore.createIndex("namaDepan", "namaDepan", { unique: false });
                    objectStore.createIndex("idJabatan", "idJabatan", { unique: false });
                    objectStore.createIndex("kelompokKerja", "kelompokKerja", { unique: false });
                    objectStore.createIndex("statusKaryawan", "statusKaryawan", { unique: false });
                }

                // E:Pembuatan ObjectStore
            };

            /* fungsi di panggil jika success */
            openRequest.onsuccess = function(e) {
                db = e.target.result;

                db.onerror = function(e) {
                    defer.reject("init() : Kesalahan DB" + e.target.errorCode);
                };
                idb.setUp = true;
                defer.resolve(true);
                console.log("Database siap digunakan");
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

                var transaction = db.transaction(arrObjectStore, "readonly");

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

            request.onerror = function(e) {
                console.log("error", e);
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

            var transaction = db.transaction(objStore, "readonly");
            var objectStore = transaction.objectStore(objStore);
            var index = objectStore.index(nameIndex);

            var request = index.openCursor(key);

            request.onerror = function(e) {
                console.log("error", e);
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

        this.getKaryawan = function() {
            var result = [];
            var arrObjStore = ["jabatan", "karyawan"];
            var defer = $q.defer();
            var transaction = db.transaction(arrObjStore, "readonly");
            var jabatan = transaction.objectStore("jabatan").openCursor();

            jabatan.onsuccess = function(event) {
                var cursorJabatan = event.target.result;

                if (cursorJabatan) {
                    
                    var karyawan = transaction.objectStore("karyawan").index("idJabatan").openCursor(cursorJabatan.value.idJabatan);

                    karyawan.onerror = function(e) {
                        console.log("error", e);
                    };

                    karyawan.onsuccess = function() {
                        var cursorKaryawan = karyawan.result;
                        if (cursorKaryawan) {

                            var data = {
                                nip: cursorKaryawan.value.nip,
                                namaDepan: cursorKaryawan.value.namaDepan,
                                namaBelakang: cursorKaryawan.value.namaBelakang,
                                jabatan: cursorJabatan.value.jabatan,
                                detailJabatan : cursorJabatan.value,
                                kelompokKerja: cursorKaryawan.value.kelompokKerja,
                                waktu: cursorKaryawan.value.waktu,
                                statusKaryawan: cursorKaryawan.value.statusKaryawan,
                                versi: cursorKaryawan.value.versi
                            };
                            result.push(data);
                            cursorKaryawan.continue();

                        }
                    };
                    cursorJabatan.continue();
                }
            };
            transaction.oncomplete = function () {
                defer.resolve(result);                    
            };

            return defer.promise;
        }; // E:this.getKaryawan

        this.save = function(arrObjectStore, obj) {
            var deferred = $q.defer();
            var transaction = db.transaction(arrObjectStore, "readwrite");

            angular.forEach(arrObjectStore, function(value) {
                transaction.objectStore(value).put(obj);
            });

            transaction.onerror = function(e) {
                console.log("error", e);
            };
            transaction.oncomplete = function(event) {
                deferred.resolve();
            };

            return deferred.promise;
        }; // E:this.save

    } // getter()

    this.setConfig = function(value) {
        idb.namaIdb = value.namaIdb || idb.namaIdb;
        idb.versiIdb = value.versiIdb || idb.versiIdb;
    };

    this.$get = function($q) {
        return new getter($q);
    };
});
