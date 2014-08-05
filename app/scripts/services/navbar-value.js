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
        }]
    });
