'use strict';

angular.module('jayaMekarApp')

.controller('JabatanCtrl',
    function($scope, $log, modalFactory, jabatanFactory) {

        var that = $scope.JabatanCtrl = this;

        this.jabatan = [];

        this.render = {
            jabatanDipakai: function(object) {
                return object.karyawan.length > 0 || object.rumusGaji.length > 0 ? true : false;
            },
            hapusData: function(object) {
                return object.karyawan.length <= 0 && object.rumusGaji.length <= 0 ? true : false;
            }
        };

        function get() {
            jabatanFactory.get().then(function(result) {
                that.jabatan = result;
            });
        }

        this.suntingData = function(obj, size) {
            modalFactory.jabatan(obj, size).then(function(sendObj) {
                // parameter sendObj didapat dari modalFactory.jabatan
                jabatanFactory.save(sendObj).then(function() {
                    get();
                });
            });
        };

        this.hapusData = function(obj) {
            jabatanFactory.del(obj).then(function() {
                get();
            });
        };

        get();
    });
