'use strict';

angular.module('jayaMekarApp')
    .directive('ykNavbar', function() {

        function ykNavbarLinkFn(scope, element, attrs) {
            if (angular.isDefined(attrs.fixedTop)) element.addClass('navbar-fixed-top');
            if (angular.isDefined(attrs.fixedBottom)) element.addClass('navbar-fixed-bottom');
        }

        return {
            templateUrl: 'views/directive/navbar/yk-navbar.html',
            restrict: 'E',
            scope: {
                brand: '='
            },
            replace: true,
            transclude: true,
            controller: function($scope) {
                var listMenu = $scope.listMenu = [];
                this.menu = function(menu) {
                    listMenu.push(menu);
                };
            },
            link: ykNavbarLinkFn
        };
    })

.directive('ykMenuList', function() {

    function ykMenuListLinkFn(scope, element, attrs, ykNavbarCtrl) {
        if (angular.isDefined(attrs.nav)) element.addClass("navbar-nav");
        if (angular.isDefined(attrs.right)) element.addClass("navbar-right");

        // ykNavbarCtrl.menu(scope.menu);
    }

    return {
        templateUrl: 'views/directive/menu/yk-menu-list.html',
        restrict: 'E',
        scope: {
            menu: '='
        },
        replace: true,
        require: '^ykNavbar',
        link: ykMenuListLinkFn
    };
});
