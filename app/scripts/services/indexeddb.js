'use strict';

angular.module('jayaMekarApp')

.provider('$indexedDB', function() {

    var idb = {};
    idb.setUp = false;
    idb.namaIdb = "YK-indexedDB";
    idb.versiIdb = 1;

    function getter($q) {
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
                var db = e.target.result;

                // S:Pembuatan ObjectStore
                //   Jika objectStore belum ada maka objectStre akan dibuat
                if (!db.objectStoreNames.contains("jabatan")) {
                    var objectStore = db.createObjectStore("jabatan", {
                        keyPath: "idJabatan",
                        unique: true
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
                var db = e.target.result;

                db.onerror = function(e) {
                    defer.reject("init() : Kesalahan DB" + e.target.errorCode);
                };
                defer.resolve(true);
            };

            return defer.promise;
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
