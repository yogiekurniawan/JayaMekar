'use strict';

angular.module('jayaMekarApp')
    .directive('ykWrapper', function() {

        function ykWrapperLink(scope, element, attrs) {

            // binding perubahan ukuran window
            attrs.$observe('windowWidth', function(newValue) {
                if (newValue < 925) {
                    element.removeClass('with-sidebar');
                    scope.ykToggleSidebar = false;
                } else {
                    element.addClass('with-sidebar');
                    scope.ykToggleSidebar = true;
                }
            });

            scope.$watch('ykToggleSidebar', function(newValue) {
                if (newValue) {
                    element.addClass('with-sidebar');
                } else {
                    element.removeClass('with-sidebar');
                }
            });
        }

        return {
            restrict: 'E',
            templateUrl: 'views/directive/wrapper/yk-wrapper.html',
            transclude: true,
            replace: true,
            scope: {
                ykToggleSidebar: '='
            },
            link: ykWrapperLink
        };
    })

.directive('ykWrapperContent', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/directive/wrapper/yk-wrapper-content.html',
        replace: true,
        transclude: true,
        scope: {},
    };
});
