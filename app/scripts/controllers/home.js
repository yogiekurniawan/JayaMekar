'use strict';

angular.module('jayaMekarApp')
    .controller('HomeCtrl', function($scope, layananData, indexeddb) {

        // menjalankan mentis menu
        $(function() {
            $('#side-menu').metisMenu();
        });

    });
