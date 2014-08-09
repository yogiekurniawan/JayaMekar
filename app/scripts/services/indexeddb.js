'use strict';

angular.module('jayaMekarApp')
    .provider('$indexedDB', function() {

        var idb = {};
            // that = this;

        idb.namaIdb = "YK-indexedDB";
        idb.versiIdb = 1;

        function getter() {
            this.getConfig = function() {
                return idb;
            };
            this.openDB = function() {
                console.log('Open DB', idb.namaIdb);
                this.versiDB();
            };
            this.versiDB = function() {
                console.log('Versi DB', idb.versiIdb);
            };
        }

        this.setConfig = function(value) {
            idb.namaIdb = value.namaIdb || idb.namaIdb;
            idb.versiIdb = value.versiIdb || idb.versiIdb;
        };

        this.$get = function() {
            return new getter();
        };
    })



;
