'use strict';

angular.module('jayaMekarApp')
    .directive('ykThead', function() {
        return {
            templateUrl: 'views/directive/yk-thead.html',
            restrict: 'E',
            replace: true,
            require: '^ykTable',
            link: function postLink(scope, element, attrs) {

            }
        };
    });
