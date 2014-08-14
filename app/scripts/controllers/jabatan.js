'use strict';

angular.module('jayaMekarApp')

.controller('JabatanCtrl', function($scope, $indexedDB, modalFactory, $log) {

    var that = $scope.JabatanCtrl = this;

    this.objectStore = 'jabatan';
    this.jabatan = [];

    $indexedDB.getJabatan()
        .then(
            function(result) {
                that.jabatan = result;

                // untuk validasi keakuratan objek yang digabungkan
                // for (var i = 0; i < result.length; i++) {
                //     var res = result[i];
                //     for (var j = 0; j < res.karyawan.length; j++) {
                //         console.log(res.idJabatan === res.karyawan[j].idJabatan);
                //     }
                // };

            }
    );

    this.render = {
        jabatanDipakai: function(object) {
            return object.karyawan.length > 0 || object.rumusGaji.length > 0 ? true : false;
        },
        hapusData: function(object) {
            return object.statusJabatan === 'Tidak Aktif' && object.karyawan.length <= 0 && object.rumusGaji.length <= 0 ? true : false;
        }
    };

    this.riwayatData = function(obj) {
        console.log('Riwayat Data : ', that.objectStore, obj);
    };

    this.suntingData = function(obj, size) {
        obj.aksi = 'Sunting';
        modalFactory.jabatan(obj, size).then(function(result) {
            $log.info(result);
        });

    };

    this.hapusData = function(obj) {
        console.log('Hapus Data', obj);
    };
});
