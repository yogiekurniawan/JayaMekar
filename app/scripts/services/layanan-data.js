'use strict';

angular.module('jayaMekarApp')
    .factory('layananData', function($q, $http, $templateCache) {

        var getJabatan = function() {

            var defer = $q.defer();

            var method = 'get';
            var url = 'json/new-jabatan.json';

            $http({
                method: method,
                url: url,
                cache: $templateCache
            })
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(data) {
                    data = data || 'Permintaan data gagal';
                    defer.reject(data);
                });

            return defer.promise;

        };

        var getKaryawan = function() {

            var defer = $q.defer();

            var method = 'get';
            var url = 'json/karyawan.json';

            $http({
                method: method,
                url: url,
                cache: $templateCache
            })
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(data) {
                    data = data || 'Permintaan data gagal';
                    defer.reject(data);
                });

            return defer.promise;
        };

        var getRumusGaji = function() {

            var defer = $q.defer();

            var method = 'get';
            var url = 'json/rumusGaji.json';

            $http({
                method: method,
                url: url,
                cache: $templateCache
            })
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(data) {
                    data = data || 'Permintaan data gagal';
                    defer.reject(data);
                });

            return defer.promise;
        };

        var getKaryawanFillText = function() {

            var defer = $q.defer(),
                result = [];

            var config = {
                params: {
                    'rows': 1000,
                    'nip': '{index}',
                    'namaDepan': '{firstName}',
                    'namaBelakang': '{lastName}',
                    'idJabatan': '["J001","J002","J003","J004","J005"]',
                    'kelompokKerja': '["UM","UJ","NS"]',
                    'statusKaryawan': '["Kerja","Keluar"]',
                    'versi': 1,
                    'callback': 'JSON_CALLBACK'
                }
            };
            $http.jsonp('http://www.filltext.com', config, {}).success(function(data) {

                angular.forEach(data, function(v) {
                    var objKaryawan = {
                        'nip': 'P' + v.nip ,
                        'namaDepan': v.namaDepan,
                        'namaBelakang': v.namaBelakang,
                        'idJabatan': v.idJabatan,
                        'kelompokKerja': v.kelompokKerja,
                        'waktu': {
                            'dibuat': new Date().getTime(),
                            'dirubah': '0'
                        },
                        'statusKaryawan': v.statusKaryawan,
                        'versi': v.versi
                    };
                    result.push(objKaryawan);
                });

                defer.resolve(result);
            });

            return defer.promise;

        };

        return {
            getJabatan: getJabatan,
            getKaryawan: getKaryawan,
            getRumusGaji: getRumusGaji,
            getKaryawanFillText: getKaryawanFillText
        };

    });
