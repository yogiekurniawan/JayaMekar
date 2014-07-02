'use strict';

angular.module('jayaMekarApp')
    .value('ykValue', {
        aboutApp: {
            nama: {
                perusahaan: 'PT. Jaya Mekar',
                deskripsi: 'Sistem Informasi Penggajian'
            },
            version: '0.0.1',
            copyright: {
                href: 'about-me',
                ngClass: '',
                nama: '{{ykValue.nama.depan}} {{ykValue.nama.belakang}}'
            }
        },
        aboutMe: {
            nama: {
                depan: 'Yogie',
                belakang: 'Kurniawan'
            },
            email: 'yogie.jm@gmail.com'
        },
        menu: {
            navTop: [{
                href: 'home',
                menu: 'Home',
                ngClass: 'fa fa-home'
            }, {
                href: 'jabatan',
                menu: 'Jabatan',
                ngClass: ''
            }, {
                href: 'karyawan',
                menu: 'Karyawan',
                ngClass: ''
            }, {
                href: 'rumus-gaji',
                menu: 'Rumus Gaji',
                ngClassD: 'caret',
                dropdown: true,
                submenu: [{
                    href: 'rumus-gaji.karyawan-harian',
                    submenu: 'Karyawan Harian',
                    ngClass: ''
                }, {
                    href: 'rumus-gaji.karyawan-tenun',
                    submenu: 'Karyawan Tenun',
                    ngClass: ''
                }]
            }, {
                href: 'transaksi',
                menu: 'Transaksi',
                ngClassD: 'caret',
                dropdown: true,
                submenu: [{
                    href: 'transaksi.karyawan-harian',
                    submenu: 'Karyawan Harian',
                    ngClass: ''
                }, {
                    href: 'transaksi.karyawan-tenun',
                    submenu: 'Karyawan Tenun',
                    ngClass: ''
                }]
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
            }, {
                href: 'info',
                menu: '',
                ngClassD: 'glyphicon glyphicon-align-justify',
                dropdown: true,
                submenu: [{
                    href: 'info.recycle',
                    submenu: 'Recyle',
                    ngClass: 'glyphicon glyphicon-trash'
                }, {
                    href: 'info.about-me',
                    submenu: 'About Me',
                    ngClass: 'glyphicon glyphicon-user'
                }, {
                    href: 'info.about-app',
                    submenu: 'About App',
                    ngClass: 'fa fa-laptop'
                }]
            }]
        }
    });
