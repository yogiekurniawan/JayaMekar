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

    this.toggleStatus = function(obj) {
    	console.log('toggle status', obj);	
    };

    this.riwayatData = function(obj) {
    	console.log('Riwayat Data', obj);
    };

    this.hapusData = function(obj) {
    	console.log('Hapus Data', obj);
    };
});
