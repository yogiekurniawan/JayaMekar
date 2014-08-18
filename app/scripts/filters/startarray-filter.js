'use strict';

angular.module('jayaMekarApp')
// untuk menentukan no start array
.filter('startArray', function() {
    return function(data, start) {
        return data.slice(start);
    };
});
