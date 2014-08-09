'use strict';

angular.module('jayaMekarApp')

.provider('$indexedDB', function() {

    var idb = {},
        db;
    idb.setUp = false;
    idb.namaIdb = "YK-indexedDB";
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
                    var objectStore = db.createObjectStore("jabatan", {
                        keyPath: "idJabatan",
                        autoIncrement: true
                    });
                    objectStore.createIndex("jabatan", "jabatan", {
                        unique: false
                    });
                    objectStore.createIndex("statusJabatan", "statusJabatan", {
                        unique: false
                    });
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

        this.getAll = function() {
            var result = [];
            var defer = $q.defer();

            this.init().then(function() {
                var handleResult = function(e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    }
                };

                var transaction = db.transaction(["jabatan"], "readonly");
                var objectStore = transaction.objectStore("jabatan");
                objectStore.openCursor().onsuccess = handleResult;

                transaction.oncomplete = function(e) {
                    defer.resolve(result);
                    console.log(e);
                    console.log(result);
                };
            });
        }; // E:this.getAll()

        this.save = function(objStore, obj) {
            var deferred = $q.defer();

            //handle tags
            // console.log("db save", db);
            var t = db.transaction( objStore, "readwrite");

            angular.forEach( objStore, function (v) {
                t.objectStore( v ).put(obj);
                console.log( v, obj)
            });

            t.oncomplete = function(event) {
                deferred.resolve();
                console.log("obj berhasil disimpan ",obj)
            };

            return deferred.promise;
        };

    }

    this.setConfig = function(value) {
        idb.namaIdb = value.namaIdb || idb.namaIdb;
        idb.versiIdb = value.versiIdb || idb.versiIdb;
    };

    this.$get = function($q) {
        return new getter($q);
    };
});
