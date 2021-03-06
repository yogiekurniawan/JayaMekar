'use strict';

angular.module('jayaMekarApp')
    .filter('waktu', ['$filter',function($filter) {
        return function(input) {
            var waktuTerakhir,
                formatTgl = 'd MMM yyyy',
                formatJam = 'H:mm',
                tglDibuat = $filter('date')(input.dibuat, formatTgl),
                tgldirubah = $filter('date')(input.dirubah, formatTgl),
                jamDibuat = $filter('date')(input.dibuat, formatJam),
                jamDirubah = $filter('date')(input.dirubah, formatJam);

            if (input.dirubah > input.dibuat) {
                waktuTerakhir = 'diperbaharui · ' + tgldirubah + ' pukul ' + jamDirubah;
            } else {
                waktuTerakhir = tglDibuat + ' pukul ' + jamDibuat;
            }

            return waktuTerakhir;
        };
    }]);
