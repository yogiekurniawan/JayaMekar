'use strict';

angular.module('jayaMekarApp')
  .directive('ngBox', function () {
    return {
      templateUrl: 'views/directive/box/box.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
      	renderBoxFn: '&'
      },
      controller: function($scope){
      	this.renderBoxFn = $scope.renderBoxFn();
      }
    };
  })
  .directive('ngBoxHeader', function () {
    return {
      templateUrl: 'views/directive/box/box-header.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      require: '^ngBox',
      link: function(scope, element, attrs, ngboxCtrl){
        attrs.$observe('title', function(newValue){
        	scope.title = newValue;
        });
      	scope.renderBoxFn = ngboxCtrl.renderBoxFn;
      }
    };
  });
