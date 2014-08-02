'use strict';

angular.module('jayaMekarApp', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.select2',
    'ui.router',
    'ngTable'
])

.run(
    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ui-sref-active="active }"> will set the <li> // to active whenever
            // 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            
        }
    ]
)

.config([
    '$compileProvider',
    function($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        // http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
    }
])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");

        // tutorial : http://scotch.io/quick-tips/js/angular/pretty-urls-in-angularjs-removing-the-hashtag
        // use the HTML5 History API => http://diveintohtml5.info/history.html
        // $locationProvider.html5Mode(true);

        $stateProvider
            .state('dashboard', {
                url: "/",
                templateUrl: "views/dashboard.html",
                controller: "DashboardCtrl"
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
                templateUrl: "views/rumus-gaji/rumus-gaji.html",
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
            .state('penggajian', {
                url: "/penggajian",
                templateUrl: "views/penggajian/penggajian.html",
                controller: "PenggajianCtrl"
            })
            .state('penggajian.karyawan-tenun', {
                url: "/karyawan-tenun",
                templateUrl: "views/penggajian/karyawan-borongan/penggajian-karyawan-tenun.html",
                controller: "PenggajianKaryawanTenunCtrl"
            })
            .state('penggajian.karyawan-harian', {
                url: "/karyawan-harian",
                templateUrl: "views/penggajian/karyawan-harian/penggajian-karyawan-harian.html",
                controller: "PenggajianKaryawanHarianCtrl"
            })
            .state('info', {
                url: "/info",
                templateUrl: "views/info.html",
                controller: "InfoCtrl"
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

        // S:eksperimen
        .state('eksperimen', {
            url: '/eksperimen',
            template: "<ui-view></ui-view>"
        })
        // S:yk-table
        .state('eksperimen.yk-table', {
            url: "/yk-table",
            templateUrl: "views/eksperimen-yk-table.html",
            controller: "EksperimenYkTableCtrl"
        })
        // E:yk-eksperimen
        // E:eksperimen

        // S:ykLib
        .state('waktu', {
            url: "/waktu",
            templateUrl: "views/waktu.html",
            controller: "WaktuCtrl as waktu"
        })
            .state('jabatan2', {
                url: "/jabatan2",
                templateUrl: "views/jabatan2.html",
                controller: "Jabatan2Ctrl as jabatan2"
            });
        // E:ykLib
    }
]);
