'use strict';

angular.module('jayaMekarApp')

.controller('AboutAppCtrl', ['$scope', 'layananData', 'jabatanFactory', 'karyawanFactory', 'rumusGajiFactory', '$interval',
    function($scope, layananData, jabatanFactory, karyawanFactory, rumusGajiFactory, $interval) {

        var that = $scope.AboutAppCtrl = this;

        this.addSemuaContohData = function() {
            that.addContohDataJabatan();
            that.addContohDataKaryawan();
            that.addContohDataRumusGaji();
        };

        this.addContohDataJabatan = function() {
            layananData.getJabatan().then(function(result) {
                angular.forEach(result, function(obj) {
                    jabatanFactory.add(obj);
                });
            });
        };

        this.addContohDataKaryawan = function() {
            layananData.getKaryawan().then(function(result) {
                /*angular.forEach(result, function(obj) {
                    karyawanFactory.add(obj);
                });*/
                var i = 0;
                $interval(function() {
                    karyawanFactory.add(result[i]);
                    i++;
                }, 3000, result.length);
            });
        };

        this.addContohDataRumusGaji = function() {
            layananData.getRumusGaji().then(function(result) {
                angular.forEach(result, function(obj) {
                    rumusGajiFactory.add(obj);
                });
            });
        };

    }
]);
