'use strict';

angular.module('jayaMekarApp')
    .directive('ykSidebar', function() {

        function ykSidebarLinkFn() {

        }

        return {
            templateUrl: 'views/directive/sidebar/yk-sidebar.html',
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                filter: '='
            },
            link: ykSidebarLinkFn
        };
    });
