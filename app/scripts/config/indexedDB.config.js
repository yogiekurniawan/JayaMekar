'use strict';

angular.module('jayaMekarApp')

.config(function($indexedDBProvider) {
    $indexedDBProvider.setConfig({
        namaIdb: 'Jaya Mekar',
        versiIdb: 1
    });
})

.run(function($indexedDB) {
    var app = $indexedDB.getConfig();
    console.log(app);
    $indexedDB.init();
});
