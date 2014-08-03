'use strict';

angular.module('jayaMekarApp')
    .controller('RootCtrl', ['navbarValue',
        function(navbarValue) {
            this.brand = navbarValue.brandVal;
            this.menuNavRight = navbarValue.menuNavRightVal;

            this.withSidebar = true;
            this.toggleSidebar = function() {
                this.withSidebar = !this.withSidebar;
            };
        }
    ]);
