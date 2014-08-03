'use strict';

angular.module('jayaMekarApp')
    .value('navbarValue', {
        'brandVal': {
            nama: 'Nama Aplikasi',
            icon: 'Icon Aplikasi'
        },
        'menuNavRightVal': [{
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
            href: 'info',
            menu: 'Info',
            ngClassD: 'caret',
            dropdown: true,
            submenu: [{
                href: 'info.recycle',
                submenu: 'Recycle',
                ngClass: 'glyphicon glyphicon-trash'
            },{
                href: 'info.about-app',
                submenu: 'About App',
                ngClass: 'fa fa-laptop'
            },{
                href: 'info.about-me',
                submenu: 'About Me',
                ngClass: 'glyphicon glyphicon-user'
            }]
        }]
    });
