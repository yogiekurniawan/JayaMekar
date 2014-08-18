'use strict';

angular.module('jayaMekarApp')
  .filter('bulan', function(){
    return function(input){

      var bulan = input.getMonth();
      var arrayBulan = [
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

      return arrayBulan[bulan];
    };
  });
