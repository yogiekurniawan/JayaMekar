'use strict';

angular.module('jayaMekarApp')
    .factory('modalFactory', function($modal, $q, $log, $window) {

        var open = function(itemss2, itemss, size) {
            var defer = $q.defer();
            $window.location.href = '#/rumus-gaji/karyawan-harian';
            var modalInstance = $modal.open({
                templateUrl: 'views/rumus-gaji/modal-rumus-gaji.html',
                controller: 'tesModalCtrl',
                size: size,
                backdrop: false,
                resolve: {
                    items: function() {
                        return itemss;
                    },
                    itemss2: function() {
                        return itemss2;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                // that.selected = selectedItem;
                defer.resolve(selectedItem);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

            return defer.promise;
        };

        var jabatan = function(obj, size) {
            var defer = $q.defer();
            //$window.location.href = '#/jabatan';
            var modalJabatan = $modal.open({
                templateUrl: 'views/jabatan/modal-jabatan.html',
                controller: 'modalJabatanCtrl',
                size: size,
                backdrop: false,
                resolve: {
                    obj: function() {
                        return obj;
                    }
                }
            });

            modalJabatan.result.then(function(selectedItem) {
                // that.selected = selectedItem;
                defer.resolve(selectedItem);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

            return defer.promise;
        };

        // Public API here
        return {
            open: open,
            jabatan: jabatan
        };
    })
    .controller('tesModalCtrl', function($scope, $modalInstance, items, itemss2) {

        var that = $scope.tesModal = this;

        console.log(itemss2);

        this.items = items;
        this.selected = {
            item: this.items[0]
        };

        this.ok = function() {
            $modalInstance.close(that.selected.item);
        };

        this.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('modalJabatanCtrl', function($scope, $modalInstance, obj) {

        var that = $scope.modalJabatanCtrl = this;

        this.obj = obj;
        this.jenis = ['Harian', 'Borongan'];

        this.ok = function() {
            $modalInstance.close(that.obj);
        };

        this.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
