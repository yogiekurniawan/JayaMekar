'use strict';

angular.module('jayaMekarApp')
  .directive('jmNav', function () {
    return {
      templateUrl:'views/element/jm-nav.html',
      restrict: 'E',
      controller: 'MainCtrl'
    };
  })
  .controller('MainCtrl', function ($scope) {
  	$scope.rumusGaji = [
      {link:'karyawan-harian', menu:'Harian'},
      {link:'karyawan-tenun', menu:'Borongan'}
    ];
    $scope.transaksi = [
      {link:'karyawan-tenun', menu:'Transaksi Karyawan Tenun'},
      {link:'karyawan-harian', menu:'Transaksi Karyawan Harian'}
    ];
    $scope.option = [
      {icon:'glyphicon glyphicon-trash', link:'recycle', des:'Recycle'},
      {icon:'glyphicon glyphicon-user', link:'about-me', des:'About Me'},
      {icon:'fa fa-laptop', link:'about-app', des:'About App'},
      {icon:'fa fa-minus', aksi:'', des:'Minimize'},
      {icon:'fa fa-arrows', aksi:'', des:'Maximize'},
      {icon:'glyphicon glyphicon-fullscreen', aksi:'', des:'Full screen'},
      {icon:'glyphicon glyphicon-remove', aksi:'', des:'Close'}
  	];
  });

