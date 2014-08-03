'use strict';

angular.module('jayaMekarApp')
    .value('navbarValue', {
        'brandVal': {
            nama: 'Nama Aplikasi',
            icon: 'Icon Aplikasi'
        },
        'menuNavRightVal': [{
            href: ' ',
            menu: 'Home',
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
        }]
    });
