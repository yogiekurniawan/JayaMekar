'use strict';

angular.module('jayaMekarApp')

.config(function($indexedDBProvider) {
    $indexedDBProvider.setConfig({
        namaIdb: 'Jaya Mekar',
        versiIdb: 7
    });
});

// .run(function($indexedDB) {
    // var app = $indexedDB.getConfig();
    // console.log(app);
    // $indexedDB.init();
// });