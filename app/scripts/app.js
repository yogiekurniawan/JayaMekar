'use strict';

angular.module('jayaMekarApp', [
    'ui.router',
    'ngAnimate',
    'ngMessages',
    'ui.bootstrap'
])

// .run(['$rootScope', '$state', '$stateParams',
//     function($rootScope, $state, $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ui-sref-active='active }'> will set the <li> // to active whenever
        // 'contacts.list' or one of its decendents is active.
//         $rootScope.$state = $state;
//         $rootScope.$stateParams = $stateParams;

//     }
// ])

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
