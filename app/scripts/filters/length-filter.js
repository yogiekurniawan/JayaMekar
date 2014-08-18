'use strict';

angular.module('jayaMekarApp')
// untuk mendapatkan panjangnya array
.filter('length', function() {
    return function(data) {
        return data.length;
    };
});
