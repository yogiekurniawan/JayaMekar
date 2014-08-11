'use strict';

angular.module('jayaMekarApp')
    .filter('kelompokKerja', function() {
        return function(input) {
            var result;
            if (input === "NS") result = "Non Shift";
            if (input === "UM") result = "Ujang Mara ";
            if (input === "UJ") result = "Uje";
            return result;
        };
    });
