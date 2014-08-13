'use strict';

angular.module('jayaMekarApp')
    .controller('RootCtrl', ['APP_CONFIG',
        function(APP_CONFIG) {

            var that = this;
            
            this.brand = APP_CONFIG.brandTop;
            this.menuNavRight = APP_CONFIG.menuNavRightTop;

            this.withSidebar = true;
            this.toggleSidebar = function() {
                this.withSidebar = !this.withSidebar;
            };

            this.dataKaryawan = [];

            // data.getKaryawan().then(function(result) {
            //     that.dataKaryawan = result;
            // });
        }
    ]);
