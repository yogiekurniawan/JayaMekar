'use strict';

angular.module('jayaMekarApp')

.controller('JabatanCtrl', ['$scope', '$log', 'modalJabatanFactory', 'jabatanFactory',
    function($scope, $log, modalJabatanFactory, jabatanFactory) {

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

        this.add = function(size){
            modalJabatanFactory.jabatan(size).then(function(sendObj) {
                jabatanFactory.add(sendObj).then(function(){
                    get();
                });
            });
        };

        this.edit = function(size, obj) {
            modalJabatanFactory.jabatan(size, obj).then(function(sendObj) {
                // parameter sendObj didapat dari modalJabatanFactory.jabatan
                jabatanFactory.save(sendObj).then(function() {
                    get();
                });
            });
        };

        this.delete = function(obj) {
            jabatanFactory.del(obj).then(function() {
                get();
            });
        };

        get();
    }]);
