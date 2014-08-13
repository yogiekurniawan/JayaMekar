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

.controller('RumusGajiKaryawanHarianCtrl',
    function($scope, modalFactory, $log, $window) {


        var that = $scope.RumusGajiKaryawanHarianCtrl = this;

        this.itemss = ['item1', 'item2', 'item3', 'item4'];
        this.itemss2 = ['item11', 'item21', 'item31', 'item41'];

        this.open = function(itemss2, itemss, size) {

            modalFactory.open(itemss2, itemss, size).then(function(selectedItem){
                that.selected = selectedItem;
            });
        };

        $log.info("load RumusGajiKaryawanHarianCtrl");

        this.goto = function(){
            $log.info('hello goto');
            $window.location.href = '#/jabatan';
        };
    }
);

/**********************************************************************************
 *
 * @ E:RumusGajiKaryawanHarianCtrl
 *
 ***********************************************************************************/
