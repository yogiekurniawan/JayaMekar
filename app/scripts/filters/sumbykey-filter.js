'use strict';

angular.module('jayaMekarApp')
    .filter('sumByKey', function() {
        return function(data, key, key2) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var temp = 0;
            var i;
            if (key2) {
                for ( i = data.length - 1; i >= 0; i--) {
                    temp += parseFloat(data[i][key][key2]);
                }
            } else {
                for ( i = data.length - 1; i >= 0; i--) {
                    temp += parseFloat(data[i][key]);

                }
            }

            return temp;
        };
    });
