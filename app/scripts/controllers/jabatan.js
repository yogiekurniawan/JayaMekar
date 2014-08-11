'use strict';

/**********************************************************************************
 *
 * @author : Yogie Kurniawan - yogie.jm@gmail.com
 * @url    : scripts/controllers/jabatan.js
 *
 ***********************************************************************************/

angular.module('jayaMekarApp')

.controller('JabatanCtrl', function(layananData, $indexedDB) {
	var that = this;

	this.jabatan = [];

    // layananData.getJabatan().then(function(data) {
    //     that.jabatan = data;
    // });

    // function getAll() {
    //     var arrObjectStore = ["jabatan"];
    //     $indexedDB.getAll( arrObjectStore ).then(function (result) {
    //         that.jabatan = result;
    //         console.log(that.jabatan);
    //     });
    // }

    // getAll();

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
