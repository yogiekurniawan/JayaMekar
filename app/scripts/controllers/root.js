'use strict';

angular.module('jayaMekarApp')
    .controller('RootCtrl', ['appConfig',
        function(appConfig) {
            this.brand = appConfig.brandTop;
            this.menuNavRight = appConfig.menuNavRightTop;

            this.withSidebar = true;
            this.toggleSidebar = function() {
                this.withSidebar = !this.withSidebar;
            };
        }
    ]);
