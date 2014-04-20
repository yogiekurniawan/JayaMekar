'use strict';

angular.module('jayaMekarApp', [
  'ui.bootstrap',
  'ui.select2',
  'ui.router',
  'ngTable'
])

  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ui-sref-active="active }"> will set the <li> // to active whenever
      // 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      }
    ]
  )

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
      .state('info', {
        url: "/info",
        template: "<ui-view></ui-view>"
      })
      .state('info.recycle', {
        url: "/recycle",
        templateUrl: "views/recycle.html",
        controller: "RecycleCtrl"
      })
      .state('info.about-me', {
        url: "/about-me",
        templateUrl: "views/about-me.html",
        controller: "AboutMeCtrl"
      })
      .state('info.about-app', {
        url: "/about-app",
        templateUrl: "views/about-app.html",
        controller: "AboutAppCtrl"
      })
      // S:yk-eksperimen
      .state('yk-table', {
        url: "/yk-table",
        templateUrl: "views/eksperimen-yk-table.html",
        controller: "EksperimenCtrl"
      })
      // E:yk-eksperimen
      // S:ykLib
      .state('jabatan2', {
        url: "/jabatan2",
        templateUrl: "views/jabatan/jabatan2.html",
        controller: "JabatanCtrl2"
      })
      .state('jabatan3', {
        url: "/jabatan3",
        templateUrl: "views/jabatan/jabatan3.html",
        controller: "JabatanCtrl2"
      })
      .state('waktu', {
        url: "/waktu",
        templateUrl: "views/waktu.html",
        controller: "WaktuCtrl as waktu"
      })
      .state('input', {
        url: "/input",
        templateUrl: "views/input.html",
        controller: "NumberCtrl"
      })
      // E:ykLib
  }]);
