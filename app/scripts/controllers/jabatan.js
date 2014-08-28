'use strict';

angular.module('jayaMekarApp')

.controller('JabatanCtrl', ['$scope', 'jabatanFactory',
    function($scope, jabatanFactory) {

        var that = $scope.JabatanCtrl = this;

        this.jabatan = jabatanFactory.jabatan;

        this.render = {
            jabatanDipakai: function(object) {
                return object.karyawan.length > 0 || object.rumusGaji.length > 0 ? true : false;
            },
            hapusData: function(object) {
                return object.karyawan.length <= 0 && object.rumusGaji.length <= 0 ? true : false;
            }
        };

        jabatanFactory.get().then(function(result) {
            that.jabatan = result;
        });

        this.add = function(size) {
            jabatanFactory.openModal(size);
        };

        this.edit = function(size, obj) {
            jabatanFactory.openModal(size, obj);
        };

        this.delete = function(obj) {
            jabatanFactory.del(obj);
        };

    }
]);
