'use strict';

angular.module('jayaMekarApp')

.controller('AboutAppCtrl',
    function($scope, $indexedDB, $timeout, $id, layananData) {

        var that = $scope.AboutAppCtrl = this;

        this.arrayJabatan = [];
        this.arrayKaryawan = [];
        this.arrayRumusGaji = [];

        layananData.getJabatan().then(function(data) {
            that.arrayJabatan = data;
        });

        layananData.getKaryawan().then(function(data) {
            that.arrayKaryawan = data;
        });

        layananData.getRumusGaji().then(function(data) {
            that.arrayRumusGaji = data;
        });

        this.addSemuaContohData = function() {
            that.addContohDataJabatan();
            that.addContohDataKaryawan();
            that.addContohDataRumusGaji();
        };
        this.addContohDataJabatan = function() {
            angular.forEach(that.arrayJabatan, function(v) {
                $indexedDB.save(['jabatan'], v).then(function() {

                });
            });
        };
        this.addContohDataKaryawan = function() {
            angular.forEach(that.arrayKaryawan, function(v) {
                v.nip = $id();
                $indexedDB.save(['karyawan'], v).then(function() {

                });
            });
        };
        this.addContohDataRumusGaji = function() {
            angular.forEach(that.arrayRumusGaji, function(v) {
                v.idRumusGaji = $id();
                $indexedDB.save(['rumusgaji'], v).then(function() {

                });
            });
        };

    });
