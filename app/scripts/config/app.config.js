'use strict';

angular.module('jayaMekarApp')

    .constant('APP_CONFIG', {
        'brandTop': {
            nama: 'Nama Aplikasi',
            icon: 'Icon Aplikasi'
        }
    })
    
    .config(['APP_CONFIG',
        function(APP_CONFIG) {
            APP_CONFIG.brandTop = {
                nama: 'Jaya Mekar'
            };
            APP_CONFIG.menuNavRightTop = [{
                href: 'dashboard',
                menu: 'Menu',
                ngClass: 'fa fa-home'
            }, {
                href: '#',
                menu: 'Info',
                ngClassD: 'caret',
                dropdown: true,
                submenu: [{
                    href: 'about-app',
                    submenu: 'Tentang Aplikasi',
                    ngClass: 'fa fa-laptop'
                }, {
                    href: 'about-me',
                    submenu: 'Tentang Saya',
                    ngClass: 'glyphicon glyphicon-user'
                }]
            }];
        }
    ]);
