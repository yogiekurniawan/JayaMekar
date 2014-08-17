'use strict';

angular.module('jayaMekarApp')
    .factory('modalKaryawanFactory', function($q, $log, $modal) {

        var open = function(size, obj) {
            var defer = $q.defer();

            var modalJabatan = $modal.open({
                templateUrl: 'views/karyawan/modal-karyawan.html',
                controller: function($scope, $modalInstance, obj, $log) {

                    var that = $scope.modalKaryawanCtrl = this;

                    if (angular.isUndefined(obj)) {
                        obj = {};
                    }

                    this.obj = angular.copy(obj);
                    this.disabledStatusKaryawan = false;

                    if (angular.isUndefined(this.obj.statusKaryawan)) {
                        this.obj.statusKaryawan = 'Kerja';
                        this.disabledStatusKaryawan = true;
                    }

                    $log.info(this.obj.statusKaryawan);

                    // this.obj.status = this.obj.status || 'Kerja';

                    this.historyObject = angular.copy(obj);
                    $log.info('historyObject', this.historyObject);

                    this.ok = function() {
                        $modalInstance.close(that.obj);
                    };

                    this.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };

                    this.today = function() {
                        this.dt = new Date();
                    };
                    this.today();

                    // Disable weekend selection
                    this.disabled = function(date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    };

                    this.open = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        this.opened = true;
                    };

                    this.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    this.format = 'dd MMMM yyyy';
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
            open: open
        };
    });
