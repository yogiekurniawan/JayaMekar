'use strict';

/**********************************************************************************
 *
 * @author : Yogie Kurniawan - yogie.jm@gmail.com
 * @url    :
 *
 ***********************************************************************************/

angular.module('jayaMekarApp')

/**********************************************************************************
 *
 * Name      : RumusGajiKaryawanHarianCtrl
 * Deskripsi : Semua control untuk Rumus Gaji Karyawan Harian
 *
 ***********************************************************************************/

// .controller('ModalInstanceCtrl',

// )

.controller('RumusGajiKaryawanHarianCtrl', ['$scope', '$modal', '$log',
    function($scope, $modal, $log) {


        /*********************************** S:StokKomen ***********************************/
        /*********************************** E:StokKomen ***********************************/

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function(size) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: function($scope, $modalInstance, items) {

                    $scope.items = items;
                    $scope.selected = {
                        item: $scope.items[0]
                    };

                    $scope.ok = function() {
                        $modalInstance.close($scope.selected.item);
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
]);

/**********************************************************************************
 *
 * @ E:RumusGajiKaryawanHarianCtrl
 *
 ***********************************************************************************/
