'use strict';

angular.module('jayaMekarApp')

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

        $indexedDB.getAll(['jabatan']).then(function(result) {
            that.jabatan = result;
        });

        this.add = function(jenis) {
            var jabatan = that.jabatan;
            rumusGajiFactory.openModal(jenis, jabatan);
        };

        this.edit = function(jenis, obj) {
            var jabatan = that.jabatan;
            rumusGajiFactory.openModal(jenis, jabatan, obj);
        };

        this.delete = function(obj) {
            rumusGajiFactory.del(obj);
        };

    }
]);
