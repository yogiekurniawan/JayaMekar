'use strict';

/**********************************************************************************
 *
 * @author : Yogie Kurniawan - yogie.jm@gmail.com
 * @url    : scripts/controllers/jabatan.js
 *
 ***********************************************************************************/

angular.module('jayaMekarApp')

.controller('JabatanCtrl', function(layananData) {
	var that = this;

	this.jabatan = [];

    layananData.getJabatan().then(function(data) {
        that.jabatan = data;
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
