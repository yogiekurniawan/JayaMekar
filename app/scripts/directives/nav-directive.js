'use strict';

angular.module('jayaMekarApp')
  .directive('jmNav', function () {
    return {
      templateUrl:'views/element/jm-nav.html',
      restrict: 'E',
      controller: 'NavbarCtrl as nav'
    };
  })
  .controller('NavbarCtrl', function (menu) {
    
    /* include factory menu */
    this.perusahaan = menu.namaAplikasi;
    this.rumusGaji = menu.rumusGaji;
    this.transaksi = menu.transaksi;
    this.menu = menu.menuNav;

    /*this.option = [
      {icon:'glyphicon glyphicon-trash', link:'recycle', des:'Recycle'},
      {icon:'glyphicon glyphicon-user', link:'about-me', des:'About Me'},
      {icon:'fa fa-laptop', link:'about-app', des:'About App'},
      {icon:'fa fa-minus', aksi:'', des:'Minimize'},
      {icon:'fa fa-arrows', aksi:'', des:'Maximize'},
      {icon:'glyphicon glyphicon-fullscreen', aksi:'', des:'Full screen'},
      {icon:'glyphicon glyphicon-remove', aksi:'', des:'Close'}
    ];*/


  });


