'use strict';

angular.module('jayaMekarApp')

  /* S:Status untuk Jabatan*/
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

  /* S:Panel Status untuk Jabatan*/
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

  /* S:No Table untuk ngTable*/
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

  /* S:Waktu */
  /*.filter('waktu', function ($timeout) {
    var wkt;
    return function (data) {

      var selisih = new Date().getTime() - data;

      if(selisih < 60000){
        var wkt = "baru saja";
      } else {
        wkt = ((selisih / (1000*60)) %60);
      }*/
      
      //var wkt =  ((selisih / (1000*60)) %60);



      /*return wkt;
    }
  })*/
  /* E:Waktu */