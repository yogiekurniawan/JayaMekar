'use strict';

angular.module('jayaMekarApp')
  .directive('ykNav', function () {
    return {
      templateUrl:'views/directive/yk-nav.html',
      restrict: 'EA',
      replace: true,
      controller: function ($scope, ykValue) {
        $scope.perusahaan = ykValue.aboutApp.nama.perusahaan;
        $scope.menu = ykValue.menu.navTop;
      }
    };
  });