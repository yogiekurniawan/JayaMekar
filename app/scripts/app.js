'use strict';

angular.module('jayaMekarApp', [
  //'ngRoute',
  'ui.bootstrap',
  'ui.select2',
  'ui.router',
  'ngTable'
])
  /*.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });
    $routeProvider
    .when('/jabatan', {
      templateUrl: 'views/jabatan.html',
      controller: 'JabatanCtrl'
    });
    $routeProvider
    .when('/karyawan', {
      templateUrl: 'views/karyawan.html',
      controller: 'KaryawanCtrl'
    });
    $routeProvider
    .when('/rumus-gaji-karyawan-tenun', {
      templateUrl: 'views/rumus-gaji-karyawan-tenun.html',
      controller: 'RumusGajiKaryawanTenunCtrl'
    });
    $routeProvider
    .when('/rumus-gaji-karyawan-harian', {
      templateUrl: 'views/rumus-gaji-karyawan-harian.html',
      controller: 'RumusGajiKaryawanHarianCtrl'
    });
    $routeProvider
    .when('/transaksi-karyawan-tenun', {
      templateUrl: 'views/transaksi-karyawan-tenun.html',
      controller: 'TransaksiKaryawanTenunCtrl'
    });
    $routeProvider
    .when('/transaksi-karyawan-harian', {
      templateUrl: 'views/transaksi-karyawan-harian.html',
      controller: 'TransaksiKaryawanTenunCtrl'
    });
    $routeProvider
      .when('/recycle', {
      templateUrl: 'views/recycle.html',
      controller: 'RecycleCtrl'
    });
    $routeProvider
      .when('/about-me', {
      templateUrl: 'views/about-me.html',
      controller: 'AboutMeCtrl'
    });
    $routeProvider
      .when('/about-app', {
      templateUrl: 'views/about-app.html',
      controller: 'AboutAppCtrl'
    });
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });*/

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
        templateUrl: "views/home.html"
      })
      .state('jabatan', {
        url: "/jabatan",
        templateUrl: "views/jabatan.html",
        controller: "JabatanCtrl"
      })
      .state('karyawan', {
        url: "/karyawan",
        templateUrl: "views/karyawan.html",
        controller: "KaryawanCtrl"
      })
      .state('rumus-gaji', {
        url: "/rumus-gaji",
        templateUrl:"views/rumus-gaji.html",
        controller: "RumusGajiKaryawanTenunCtrl"
      })
      .state('rumus-gaji.karyawan-tenun', {
        url: "/karyawan-tenun",
        templateUrl: "views/rumus-gaji-karyawan-tenun.html",
        controller: "RumusGajiKaryawanTenunCtrl"
      })
      .state('rumus-gaji.karyawan-harian', {
        url: "/karyawan-harian",
        templateUrl: "views/rumus-gaji-karyawan-harian.html",
        controller: "RumusGajiKaryawanHarianCtrl"
      })
      .state('transaksi', {
        url: "/transaksi",
        template: "<h1>Transaksi</h1><h1>Transaksi</h1><ui-view><h1>Di Dalam UI-VIEW</h1></ui-view>",
        controller: "TransaksiKaryawanTenunCtrl"
      })
      .state('transaksi.karyawan-tenun', {
        url: "/karyawan-tenun",
        templateUrl: "views/transaksi-karyawan-tenun.html",
        controller: "TransaksiKaryawanTenunCtrl"
      })
      .state('transaksi.karyawan-harian', {
        url: "/karyawan-harian",
        templateUrl: "views/transaksi-karyawan-harian.html",
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


