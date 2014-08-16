'use strict';

angular.module('jayaMekarApp')

.controller('JabatanCtrl',
    function($scope, modalFactory, jabatanFactory) {

        var that = $scope.JabatanCtrl = this;

        this.jabatan = [];

        jabatanFactory.get().then(function(result) {
            that.jabatan = result;
        });

        this.render = {
            jabatanDipakai: function(object) {
                return object.karyawan.length > 0 || object.rumusGaji.length > 0 ? true : false;
            },
            hapusData: function(object) {
                return object.karyawan.length <= 0 && object.rumusGaji.length <= 0 ? true : false;
            }
        };

        this.suntingData = function(obj, size) {
            modalFactory.jabatan(obj, size).then(function(sendObj) {
                // parameter sendObj didapat dari modalFactory.jabatan
                jabatanFactory.save(sendObj);
            });
        };

        this.hapusData = function(obj) {
            jabatanFactory.del(obj);
        };
    });
