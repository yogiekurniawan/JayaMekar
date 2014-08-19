'use strict';

angular.module('jayaMekarApp')
  .factory('modalRumusGajiFactory', function ($q, $log, $modal) {
    
    var open = function(jabatan, obj) {
            var defer = $q.defer();

            var modalRumusGaji = $modal.open({
                templateUrl: 'views/rumus-gaji/modal-rumus-gaji.html',
                controller: function($scope, $modalInstance, obj) {

                    var that = $scope.modalRumusGaji = this;

                    // jika parameter objek undifined maka objek kosong dibuat
                    this.obj = angular.copy(obj) || {};
                    this.obj.waktu = this.obj.waktu || {};
                    this.arrayJabatan = jabatan;
                    this.objectJabatan = that.obj.detailJabatan;
                    this.shift = ['Siang', 'Malam'];


                    this.save = function(objJabatan) {
                        this.obj.idJabatan = objJabatan.idJabatan;
                        this.obj.jenis = objJabatan.jenis;
                        $modalInstance.close(that.obj);
                    };

                    this.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };


                },
                // size: size,
                backdrop: false,
                resolve: {
                    obj: function() {
                        return obj;
                    }
                }
            });

            modalRumusGaji.result.then(function(result) {
                defer.resolve(result);
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

            return defer.promise;
        };

        return {
            open: open
        };
  });
