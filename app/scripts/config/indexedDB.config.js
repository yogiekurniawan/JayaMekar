'use strict';

angular.module('jayaMekarApp')

.config(function($indexedDBProvider) {
    $indexedDBProvider.setConfig({
        namaIdb: 'Jaya Mekar',
        versiIdb: 7
    });
})

.run(function($indexedDB) {
    var app = $indexedDB.getConfig();
    console.log(app);
    $indexedDB.init();
})

// run untuk memasukan contoh data
.run(function($indexedDB, $timeout, layananData) {

    var arrJabatan = [],
        arrKaryawan = [],
        arrRumusGaji = [];

    layananData.getJabatan().then(function(data) {
        arrJabatan = data;
    });

    layananData.getKaryawan().then(function(data) {
        arrKaryawan = data;
    });

    layananData.getRumusGaji().then(function(data) {
        arrRumusGaji = data;
    });

    $timeout(function() {
        angular.forEach(arrJabatan, function(v) {
            $indexedDB.save(["jabatan"], v);
        });
        angular.forEach(arrKaryawan, function(v) {
            $indexedDB.save(["karyawan"], v);
        });
        angular.forEach(arrRumusGaji, function(v) {
            $indexedDB.save(["rumusgaji"], v);
        });
    }, 1000);

});
