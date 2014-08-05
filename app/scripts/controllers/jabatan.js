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

});
