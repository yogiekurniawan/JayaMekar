'use strict';

angular.module('jayaMekarApp')
  .directive('ykWindow', ['$window',
    function($window) {
        return function($scope) {
            $scope.initializeWindowSize = function() {
                $scope.windowWidth = $window.innerWidth;
                $scope.windowHeight = $window.innerHeight;
            };
            angular.element($window).bind('resize', function() {
                $scope.initializeWindowSize();
                $scope.$apply();
            });
            $scope.initializeWindowSize();
        };
    }
]);

// Referensi :
// http://microblog.anthonyestebe.com/2013-11-30/window-resize-event-with-angular/
