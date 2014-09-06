'use strict';

angular.module('jayaMekarApp')
    .controller('RootCtrl', ['$scope', 'APP_CONFIG',
        function($scope, APP_CONFIG) {

            var vm = $scope.RootCtrl = this;
            
            vm.brand = APP_CONFIG.brandTop;
            vm.menuNavRight = APP_CONFIG.menuNavRightTop;

            vm.withSidebar = true;
            vm.toggleSidebar = function() {
                vm.withSidebar = !vm.withSidebar;
            };

        }
    ]);
