'use strict';

angular.module('jayaMekarApp')

/*
 * RumusGajiCtrl as rumusgaji
 */

.controller('RumusGajiCtrl', function($scope, $indexedDB, rumusGajiFactory, modalRumusGajiFactory) {

    var that = $scope.RumusGajiCtrl = this;

    this.rumusgaji = [];
    this.jabatan = [];
    this.maxSize = 7;
    this.numberPage = 1;
    this.limit = 10;

    function getRumusGaji() {
        rumusGajiFactory.get().then(function(result) {
            that.rumusgaji = result;
        });
    }
    getRumusGaji();

    function getJabatan() {
        var arrayObjectStore = ['jabatan'];
        $indexedDB.getAll(arrayObjectStore).then(function(result) {
            that.jabatan = result;
        });
    }
    getJabatan();

    this.add = function() {
        var jabatan = that.jabatan;
        modalRumusGajiFactory.open(jabatan).then(function(result) {
            console.log(result);
            rumusGajiFactory.add(result).then(function(success) {
                console.log(success);
                getRumusGaji();
            });
        });
    };

    this.edit = function(obj) {
        var jabatan = that.jabatan;
        modalRumusGajiFactory.open(jabatan, obj).then(function(result) {
            console.log(result);
            rumusGajiFactory.edit(result).then(function(success) {
                console.log(success);
                getRumusGaji();
            });
        });
    };

    this.delete = function(obj) {
        rumusGajiFactory.del(obj).then(function() {
            getRumusGaji();
        });
    };

});
