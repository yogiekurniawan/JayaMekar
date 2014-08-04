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
* Name      : KaryawanCtrl
* Deskripsi : Semua control untuk karyawan
*
***********************************************************************************/

  .controller('KaryawanCtrl', 
    ['layananData', 
      function (layananData){


/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/
    var that = this;
    this.karyawan = [];

    layananData.getKaryawan().then(function (data) {
      that.karyawan = data;
    });

  }]);
/**********************************************************************************
* 
* @ E:KaryawanCtrl
*
***********************************************************************************/
