'use strict';

angular.module('jayaMekarApp', [
    'ui.router',
    'ngMessages',
    'ui.bootstrap'
])

// .config(['$compileProvider',
    // function($compileProvider) {
    //     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        // http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
    //}
// ])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/jabatan');

        $stateProvider
            .state('jabatan', {
                url: '/jabatan',
                templateUrl: 'views/jabatan/jabatan.html',
                controller: 'JabatanCtrl'
            })
            .state('karyawan', {
                url: '/karyawan',
                templateUrl: 'views/karyawan/karyawan.html',
                controller: 'KaryawanCtrl'
            })
            .state('rumus-gaji', {
                url: '/rumus-gaji',
                templateUrl: 'views/rumus-gaji/rumus-gaji.html',
                controller: 'RumusGajiCtrl'
            })
            .state('penggajian', {
                url: '/penggajian',
                templateUrl: 'views/penggajian/penggajian.html',
                controller: 'PenggajianCtrl'
            })
            .state('penggajian.karyawan-tenun', {
                url: '/karyawan-tenun',
                templateUrl: 'views/penggajian/karyawan-borongan/penggajian-karyawan-tenun.html',
                controller: 'PenggajianKaryawanTenunCtrl'
            })
            .state('penggajian.karyawan-harian', {
                url: '/karyawan-harian',
                templateUrl: 'views/penggajian/karyawan-harian/penggajian-karyawan-harian.html',
                controller: 'PenggajianKaryawanHarianCtrl'
            })
            .state('about-me', {
                url: '/about-me',
                templateUrl: 'views/about-me.html',
                controller: 'AboutMeCtrl'
            })
            .state('about-app', {
                url: '/about-app',
                templateUrl: 'views/about-app.html',
                controller: 'AboutAppCtrl'
            });
    }
]);
