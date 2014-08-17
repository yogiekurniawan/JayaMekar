'use strict';

angular.module('jayaMekarApp')

/**
* 
* @ngdoc directive
* @nama ykNavbar & ykMenuList
*
* @example
* @html
<yk-navbar brand="root.brand" fixed-top>
    <yk-menu-list menu="root.menuNavLeft" nav></yk-menu-list>
    <yk-menu-list menu="root.menuNavRight" nav right></yk-menu-list>
</yk-navbar>
*
* @ctrl atau service value untuk data menu
{
    'brandTop': {
        nama: 'Nama Aplikasi',
        icon: 'Icon Aplikasi'
    },
    'menuNavLeftTop': [{
        href: 'menu-1',
        menu: 'Menu 1',
        ngClass: 'fa fa-icon'
    },{
        href: 'menu-2',
        menu: 'Menu 2',
        ngClassD: 'caret',
        dropdown: true,
        submenu: [{
            href: 'menu-2.menu-2-1',
            submenu: 'Menu 2.1',
            ngClass: 'glyphicon glyphicon-icon'
        }]
    }],
    'menuNavRightTop': [{
        href: 'menu-1',
        menu: 'Menu 1',
        ngClass: 'fa fa-icon'
    },{
        href: 'menu-2',
        menu: 'Menu 2',
        ngClassD: 'caret',
        dropdown: true,
        submenu: [{
            href: 'menu-2.menu-2-1',
            submenu: 'Menu 2.1',
            ngClass: 'glyphicon glyphicon-icon'
        }]
    }]
})
*
**/

.directive('ykNavbar', function() {

    function ykNavbarLinkFn(scope, element, attrs) {
        if (angular.isDefined(attrs.fixedTop)) element.addClass('navbar-fixed-top');
        if (angular.isDefined(attrs.fixedBottom)) element.addClass('navbar-fixed-bottom');
    }

    return {
        templateUrl: 'views/directive/navbar/yk-navbar.html',
        restrict: 'E',
        scope: {
            brand: '=',
            withSidebar: '=',
            toggleSidebar: '&'
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
