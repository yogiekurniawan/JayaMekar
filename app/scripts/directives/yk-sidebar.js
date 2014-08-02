'use strict';

angular.module('jayaMekarApp')
  .directive('ykSidebar', function() {

    function ykSidebarLinkFn(scope, element, attrs) {

        // menjalankan mentis menu untuk sidebar
        // membutuhkan src : jquery.js, bootstrap.js, mentisMenu.js
        $(function() {
            $('#side-menu').metisMenu();
        });
    }

    return {
        templateUrl: 'views/directive/sidebar/yk-sidebar.html',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            filter: "="
        },
        link: ykSidebarLinkFn
    };
})
