'use strict';

angular.module('jayaMekarApp')

.controller('JabatanCtrl', function($scope, $indexedDB, modalFactory, jabatanFactory, $log) {

    var that = $scope.JabatanCtrl = this;

    this.objectStore = 'jabatan';
    this.jabatan = [];

    jabatanFactory.get().then(function(result) {
        that.jabatan = result;
    });

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
        modalFactory.jabatan(obj, size).then(function(kirimData) {
            $log.info(kirimData);
            $indexedDB.save(['jabatan'], kirimData).then(function(sukses) {
                $log.info(sukses);
            });
        });

    };

    this.hapusData = function(obj) {
        console.log('Hapus Data', obj);
    };
});
