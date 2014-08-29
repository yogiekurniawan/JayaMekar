'use strict';

angular.module('jayaMekarApp')
// untuk mendapatkan panjangnya array
.filter('length', function() {
    return function(data) {
        if (angular.isDefined(data)) {
	        return data.length;
    	}
    };
});
