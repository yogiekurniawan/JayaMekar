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
      	scope.title = attrs.title;
      	scope.renderBoxFn = ngboxCtrl.renderBoxFn;
      }
    };
  });
