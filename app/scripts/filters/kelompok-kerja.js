'use strict';

angular.module('jayaMekarApp')
    .filter('kelompokKerja', function() {
        return function(input) {
        	var result;
        	if(input === 'NS'){
            	result = 'Non Shift';
            } else if ( input === 'UM' ){
            	result = 'Ujang Mara ';
            } else {
            	result = 'Uje';
            }
            return result;
        };
    });
