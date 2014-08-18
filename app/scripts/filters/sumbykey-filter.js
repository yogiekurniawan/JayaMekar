'use strict';

angular.module('jayaMekarApp')
    .filter('sumByKey', function() {
        return function(data, key) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var temp = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                temp += parseInt(data[i][key]);
            }

            return temp;
        };
    });
