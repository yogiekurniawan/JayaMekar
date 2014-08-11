'use strict';

/**********************************************************************************
 *
 * @author : Yogie Kurniawan - yogie.jm@gmail.com
 * @url    : scripts/controllers/jabatan.js
 *
 ***********************************************************************************/

angular.module('jayaMekarApp')

.controller('JabatanCtrl', function($indexedDB) {
    var that = this;

    var jabatan = this.jabatan = [];

    $indexedDB.getJabatan().then(function(result) {
        that.jabatan = result;

        // untuk validasi keakuratan objek yang digabungkan
        // (function() {
        //     for (var i = 0; i < result.length; i++) {
        //         var res = result[i];
        //         for (var j = 0; j < res.karyawan.length; j++) {
        //             console.log(res.idJabatan === res.karyawan[j].idJabatan);
        //         }
        //     };
        // })();

    });


    this.aktifkanStatus = function(obj) {
        console.log('aktifkan status', obj);
    };

    this.tidakAktifkanStatus = function(obj) {
        console.log('tidak aktifkan status', obj);
    };

    this.riwayatData = function(obj) {
        console.log('Riwayat Data', obj);
    };

    this.hapusData = function(obj) {
        console.log('Hapus Data', obj);
    };
});
