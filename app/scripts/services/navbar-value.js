'use strict';

angular.module('jayaMekarApp')
    .value('navbarValue', {
        'brandVal': {
            nama: 'Nama Aplikasi',
            icon: 'Icon Aplikasi'
        },
        'menuNavLeftVal': [{
            href: 'home',
            menu: 'Home',
            ngClass: 'fa fa-home'
        }, {
            href: 'jabatan',
            menu: 'Jabatan',
            ngClass: ''
        }, {
            href: 'template',
            menu: 'Template',
            ngClass: ''
        }, {
            href: 'eksperimen',
            menu: 'Eksperimen',
            ngClassD: 'caret',
            dropdown: true,
            submenu: [{
                href: 'eksperimen.yk-table',
                submenu: 'yk-table',
                ngClass: 'glyphicon glyphicon-wrench'
            }]
        }],
        'menuNavRightVal': [{
            href: 'main',
            menu: 'Home',
            ngClass: 'fa fa-home'
        }]
    });
