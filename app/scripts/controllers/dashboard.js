'use strict';

angular.module('jayaMekarApp')
    .controller('DashboardCtrl', function($scope, layananData, indexeddb) {

        // menjalankan mentis menu
        $(function() {
            $('#side-menu').metisMenu();
        });

    });
