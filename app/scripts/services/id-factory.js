'use strict';

// https://github.com/broofa/node-uuid
angular.module('jayaMekarApp')
    .factory('$id', function() {
        var id = uuid.noConflict();
        return function() {
            return id.v4();
        };
    });
