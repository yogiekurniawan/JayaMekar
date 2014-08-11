'use strict';

angular.module('jayaMekarApp')
    .controller('RootCtrl', ['appConfig', 'data',
        function(appConfig, data) {

            var that = this;
            
            this.brand = appConfig.brandTop;
            this.menuNavRight = appConfig.menuNavRightTop;

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
