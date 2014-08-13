'use strict';

angular.module('jayaMekarApp')

.config(['APP_CONFIG',
    function(APP_CONFIG) {
        APP_CONFIG.brandTop = {
            nama: 'Jaya Mekar'
        };
        APP_CONFIG.menuNavRightTop = [{
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
]);