'use strict';

angular.module('jayaMekarApp')

/*
 * RumusGajiCtrl as rumusgaji
 */

.controller('RumusGajiCtrl', ['$scope', '$indexedDB', 'rumusGajiFactory',
    function($scope, $indexedDB, rumusGajiFactory) {

        var that = $scope.RumusGajiCtrl = this;

        this.rumusgaji = rumusGajiFactory.rumusgaji;
        this.jabatan = [];
        this.maxSize = 7;
        this.numberPage = 1;
        this.limit = 10;

        rumusGajiFactory.get().then(function(result) {
            that.rumusgaji = result;
        });

        var arrayObjectStore = ['jabatan'];
        $indexedDB.getAll(arrayObjectStore).then(function(result) {
            that.jabatan = result;
        });

        this.add = function(jenis) {
            var jabatan = that.jabatan;
            rumusGajiFactory.openModel(jenis, jabatan);
        };

        this.edit = function(jenis, obj) {
            var jabatan = that.jabatan;
            rumusGajiFactory.openModel(jenis, jabatan, obj);
        };

        this.delete = function(obj) {
            rumusGajiFactory.del(obj);
        };

    }
]);
