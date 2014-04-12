'use strict';

angular.module('jayaMekarApp', [
  'ui.bootstrap',
 // 'ui.select2',
  'ui.router',
  'ngTable'
])

  .config( [
      '$compileProvider',
      function( $compileProvider )
      {   
          $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
          // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
          // http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
      }
  ])

  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "views/home.html",
        controller: "HomeCtrl"
      })
      .state('jabatan', {
        url: "/jabatan",
        templateUrl: "views/jabatan/jabatan.html",
        controller: "JabatanCtrl"
      })
      .state('karyawan', {
        url: "/karyawan",
        templateUrl: "views/karyawan/karyawan.html",
        controller: "KaryawanCtrl"
      })
      .state('rumus-gaji', {
        url: "/rumus-gaji",
        templateUrl:"views/rumus-gaji/rumus-gaji.html",
        controller: "RumusGajiCtrl as rg"
      })
      .state('rumus-gaji.karyawan-tenun', {
        url: "/karyawan-tenun",
        templateUrl: "views/rumus-gaji/rumus-gaji-karyawan-tenun.html",
        controller: "RumusGajiKaryawanTenunCtrl"
      })
      .state('rumus-gaji.karyawan-harian', {
        url: "/karyawan-harian",
        templateUrl: "views/rumus-gaji/rumus-gaji-karyawan-harian.html",
        controller: "RumusGajiKaryawanHarianCtrl"
      })
      .state('transaksi', {
        url: "/transaksi",
        templateUrl: "views/transaksi/transaksi.html",
        controller: "TransaksiCtrl"
      })
      .state('transaksi.karyawan-tenun', {
        url: "/karyawan-tenun",
        templateUrl: "views/transaksi/karyawan-borongan/transaksi-karyawan-tenun.html",
        controller: "TransaksiKaryawanTenunCtrl"
      })
      .state('transaksi.karyawan-harian', {
        url: "/karyawan-harian",
        templateUrl: "views/transaksi/karyawan-harian/transaksi-karyawan-harian.html",
        controller: "TransaksiKaryawanHarianCtrl"
      })
      .state('recycle', {
        url: "/recycle",
        templateUrl: "views/recycle.html",
        controller: "RecycleCtrl"
      })
      .state('about-me', {
        url: "/about-me",
        templateUrl: "views/about-me.html",
        controller: "AboutMeCtrl"
      })
      .state('about-app', {
        url: "/about-app",
        templateUrl: "views/about-app.html",
        controller: "AboutAppCtrl"
      })
      .state('waktu', {
        url: "/waktu",
        templateUrl: "views/waktu.html",
        controller: "WaktuCtrl"
      })
  }]);
