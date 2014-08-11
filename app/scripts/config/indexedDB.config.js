'use strict';

angular.module('jayaMekarApp')

.config(function($indexedDBProvider) {
    $indexedDBProvider.setConfig({
        namaIdb: 'Jaya Mekar',
        versiIdb: 6
    });
})

.run(function($indexedDB) {
    var app = $indexedDB.getConfig();
    console.log(app);
    $indexedDB.init();



})

.run(function($indexedDB, $timeout, layananData, data) {

    var arrJabatan = [],
        arrKaryawan = [],
        arrKaryawanFillText = [];

    var arrObjStoreJabatan = ["jabatan"];
    var arrObjStoreKaryawan = ["karyawan"];

    // layananData.getJabatan().then(function(data) {
    //     arrJabatan = data;
    // });

    // layananData.getKaryawan().then(function(data) {
    //     arrKaryawan = data;
    //     console.log(arrKaryawan);
    // });


    // layananData.getKaryawanFillText().then(function(data) {
        // arrKaryawanFillText = data;
        // console.log(data);
        /*angular.forEach(data, function(v) {
            console.log("arrKaryawanFillText",v);
            $indexedDB.save(arrObjStoreJabatan, v);
        });*/
    // });


    $timeout(function() {
        angular.forEach(arrJabatan, function(v) {
            $indexedDB.save(arrObjStoreJabatan, v);
        });
        angular.forEach(arrKaryawan, function(v) {
            $indexedDB.save(arrObjStoreKaryawan, v);
        });
        /*angular.forEach(arrKaryawanFillText, function(v) {
            console.log("arrKaryawanFillText",v);
            $indexedDB.save(arrObjStoreKaryawan, v);
        });*/

    }, 1000);

    // data.getKaryawan();
});
