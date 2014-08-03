'use strict';

angular.module('jayaMekarApp')
    .directive('ykTbody', function() {
        return {
            templateUrl: 'views/directive/yk-tbody.html',
            restrict: 'E',
            replace: true,
            require: '^ykTable',
            scope: {},
            link: function(scope, element, attrs, ykTableCtrl) {
                scope.data = ykTableCtrl.data;
                scope.limit = ykTableCtrl.limit;
                scope.start = ykTableCtrl.start;
                console.log(ykTableCtrl.start);
            }
        };
    });
