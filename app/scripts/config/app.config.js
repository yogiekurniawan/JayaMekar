'use strict';

angular.module('jayaMekarApp')

.config(['appConfig',
    function(appConfig) {
        appConfig.brandTop = {
            nama: 'Jaya Mekar'
        };
        appConfig.menuNavRightTop = [{
            href: ' ',
            menu: 'Menu',
            ngClass: 'fa fa-home'
        },{
            href: 'eksperimen',
            menu: 'Eksperimen',
            ngClassD: 'caret',
            dropdown: true,
            submenu: [{
                href: 'eksperimen.yk-table',
                submenu: 'yk-table',
                ngClass: 'glyphicon glyphicon-wrench'
            }]
        },{
            href: '#',
            menu: 'Info',
            ngClassD: 'caret',
            dropdown: true,
            submenu: [{
                href: 'recycle',
                submenu: 'Recycle',
                ngClass: 'glyphicon glyphicon-trash'
            },{
                href: 'about-app',
                submenu: 'About App',
                ngClass: 'fa fa-laptop'
            },{
                href: 'about-me',
                submenu: 'About Me',
                ngClass: 'glyphicon glyphicon-user'
            }]
        }];
    }
])

.config(function($indexedDBProvider) {
    $indexedDBProvider.setConfig({
        namaIdb: 'Jaya Mekar',
        versiIdb: 1
    });
})

.run(function($indexedDB) {
    var app = $indexedDB.getConfig();
    console.log(app);
    $indexedDB.openDB();
});
