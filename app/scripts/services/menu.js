'use strict';

angular.module('jayaMekarApp')
  .factory('menu', function(){
    var menu = {};
      (function conf(){
        menu.logoAplikasi = '';
        menu.namaAplikasi = 'Jaya Mekar';
        menu.rumusGaji = [
          {link:'karyawan-harian', menu:'Harian' },
          {link:'karyawan-tenun', menu:'Borongan'}
        ];
        menu.transaksi = [
          {link:'karyawan-tenun', menu:'Transaksi Karyawan Tenun'},
          {link:'karyawan-harian', menu:'Transaksi Karyawan Harian'}
        ];
      })();
    return menu;
  });
