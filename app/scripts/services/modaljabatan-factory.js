'use strict';

angular.module('jayaMekarApp')
    .factory('modalJabatanFactory',['$q', '$modal', function($q, $modal) {

        var jabatan = function(size, obj) {
            var defer = $q.defer();

            var modalJabatan = $modal.open({
                templateUrl: 'views/jabatan/modal-jabatan.html',
                controller: function($scope, $modalInstance, obj) {

                    var that = $scope.modalJabatanCtrl = this;

                    this.obj = angular.copy(obj);
                    this.jenis = ['Harian', 'Borongan'];

                    this.save = function() {
                        // that.obj = objek untuk callback modal yang akan
                        // disimpan ke indexedDB
                        $modalInstance.close(that.obj);
                    };

                    this.cancel = function() {
                        $modalInstance.dismiss();
                    };
                },
                size: size,
                backdrop: false,
                resolve: {
                    obj: function() {
                        // objek yang didapat dari parameter fungsi
                        // dan dimasukan ke parameter controller modal
                        // sebagai ketergantungan objek
                        return obj;
                    }
                }
            });

            modalJabatan.result.then(function(result) {
                // result = nilai callback dari >> $modalInstance.close(that.obj)
                defer.resolve(result);
            });

            return defer.promise;
        };

        return {
            jabatan: jabatan
        };
    }]);
