'use strict';

angular.module('jayaMekarApp')
    .factory('data', function($q, $indexedDB, $filter) {



        var getJabatan = function() {

            var defer = $q.defer();

            var arrObjectStore = ["jabatan"];
            $indexedDB.getAll(arrObjectStore).then(function(result) {
                defer.resolve(result);
            });

            return defer.promise;
        };

        var getKaryawan = function() {

            var jabatan = [],
                karyawan = [],
                result = [];
            var defer = $q.defer();
            var arrObjectStore = ["karyawan"];

            getJabatan().then(function (resultJabatan) {
              jabatan = resultJabatan
            });

            $indexedDB.getAll(arrObjectStore).then(function(resultKaryawan) {
              karyawan = resultKaryawan;
            });
                defer.resolve(result);

            return defer.promise;
        };

        // Public API here
        return {
            getJabatan: getJabatan,
            getKaryawan: getKaryawan
        };
    });
