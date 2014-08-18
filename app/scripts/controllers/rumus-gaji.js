'use strict';

angular.module('jayaMekarApp')

/*
 * RumusGajiCtrl as rumusgaji
 */

.controller('RumusGajiCtrl', function($scope, rumusGajiFactory) {

    var that = $scope.rumusgajiCtrl = this;
    this.rumusgaji = [];

    function get() {
        rumusGajiFactory.get().then(function(result) {
            that.rumusgaji = result;
        });
    }
    get();


});
