'use strict';

/**
 * @ngdoc modul
 * @name material.component.ng.tabs
 *
 * @descriptiom
 * arahan untuk membuat material desain untuk komponen web tabs
 */

angular.module('jayaMekarApp')

/**
 * @ngdoc directive
 * @name ngTabs
 *
 * @restrict E
 *
 * @description
 *
 * @attrs {titleTabs:@} digunakan untuk menentukan judul tabs
 *
 * @example
 *
 */

.directive('ngTabs', function() {
    return {
        restrict: 'E',
        replace: false,
        transclude: true,
        scope: {
            titleTabs: '@'
        },
        templateUrl: 'views/directive/tabs/ng-tabs.html',
        controller: function($scope) {
            var content = $scope.content = [];

            this.addcontentTabs = function(nav) {
                // tabs yang pertama akan diaktifkan jika array sama dengan nol
                nav.selected = content.length === 0 ? true : false;
                content.unshift(nav);
            };

            $scope.selected = function(nav) {
                // menonaktifkan semua tab
                angular.forEach(content, function(nav) {
                    nav.selected = false;
                });
                // mengaktifkan tab yang dipilih
                nav.selected = true;
            };

        },
        link: function(scope, element, attrs) {
            if (angular.isDefined(attrs.pullBody)) {
                element.addClass('pull-body');
            }
            if (angular.isUndefined(attrs.pullBody)) {
                element.addClass('normal');
            }

            console.log();
        }
    };
})

/**
 * @ngdoc directive
 * @name ngTabsContent
 *
 * @restrict E
 *
 * @description
 *
 * @attrs {titleContent:@} digunakan untuk menentukan judul nav tabs
 *
 * @example
 *
 */

.directive('ngTabsContent', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        require: '^ngTabs',
        scope: {
            titleContent: '@'
        },
        templateUrl: 'views/directive/tabs/ng-tabs-content.html',
        link: function(scope, elm, attrs, tabsCtrl) {
            // menambahkan tabs ke array content direvtive ngTabs
            tabsCtrl.addcontentTabs(scope);
        }
    };
});
