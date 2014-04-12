'use strict';

angular.module('jayaMekarApp')

  /* S:Status */
  .filter('status', function () {
    var status ="";
    return function (data) {
      if ( data == "Aktif") {
        status = "ok green";
      } else {
        status = "remove red";
      };
     return status;
    };
  })
  /* E:Status */

  /* S:Panel Status */
  .filter('panelStatus', function(){
    var status ="";
    return function (data){
      if ( data == "Aktif") {
        status = "success";
      } else {
        status = "danger";
      };
     return status;
    }
  })
  /* E:Panel Status */

  /* S:No Table*/
  .filter('noTable', function(){
    var no;
    return function (data, key){
      if ( key == 1 ){
        no = data + 1;
      } else if ( key > 1){
        no = ( data + 1 ) + ( ( key - 1 ) * 10 );
      } else {
        no = "error";
      };
    return no;
    }
  })
  /* E:No Table*/

  /* S:Bulan */
  .filter('bulan', function(){
    var bln;
    return function(data){

      var data2 = data.getMonth();
      var namabln = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
      ];

      bln = namabln[data2];

      return bln;
    }
  });
  /* E:Bulan */