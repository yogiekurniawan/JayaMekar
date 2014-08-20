'use strict';

angular.module('jayaMekarApp')
    .factory('modalJabatanFactory',['$q', '$log', '$modal', function($q, $log, $modal) {

        var jabatan = function(size, obj) {
            var defer = $q.defer();

            var modalJabatan = $modal.open({
                templateUrl: 'views/jabatan/modal-jabatan.html',
                controller: function($scope, $modalInstance, obj, $log) {

                    var that = $scope.modalJabatanCtrl = this;

                    this.obj = angular.copy(obj);
                    this.historyObject = angular.copy(this.obj);
                    $log.info('historyObject', this.historyObject);
                    this.jenis = ['Harian', 'Borongan'];

                    this.renderEdit = function(){
                      if (that.historyObject) {
                        $log.info( that.obj === that.historyObject );
                        return that.obj === that.historyObject;
                      }
                    };

                    this.ok = function() {
                        $modalInstance.close(that.obj);
                    };

                    this.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                backdrop: false,
                resolve: {
                    obj: function() {
                        return obj;
                    }
                }
            });

            modalJabatan.result.then(function(result) {
                defer.resolve(result);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

            return defer.promise;
        };

        return {
            jabatan: jabatan
        };
    }]);
