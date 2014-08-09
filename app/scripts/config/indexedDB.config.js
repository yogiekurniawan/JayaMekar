'use strict';

angular.module('jayaMekarApp')

.config(function($indexedDBProvider) {
    $indexedDBProvider.setConfig({
        namaIdb: 'Jaya Mekar',
        versiIdb: 4
    });
})

.run(function($indexedDB) {
    var app = $indexedDB.getConfig();
    console.log(app);
    $indexedDB.init();



})

.run(function($indexedDB, $timeout) {
	var arrObjS = ["jabatan","jabatan2"];
    var arr = [{
        "idJabatan": "J001",
        "jabatan": "Operator Penggajian",
        "waktu": {
            "dibuat": "1407134327233",
            "dirubah": "0"
        },
        "statusJabatan": "Aktif",
        "jenis": "Harian",
        "versi": 1
    }, {
        "idJabatan": "J002",
        "jabatan": "Teknisi Mesin",
        "waktu": {
            "dibuat": "1407134327233",
            "dirubah": "0"
        },
        "statusJabatan": "Aktif",
        "jenis": "Harian",
        "versi": 1
    }, {
        "idJabatan": "J003",
        "jabatan": "Operator Penghanian",
        "waktu": {
            "dibuat": "1407134327233",
            "dirubah": "0"
        },
        "statusJabatan": "Aktif",
        "jenis": "Harian",
        "versi": 1
    }, {
        "idJabatan": "J004",
        "jabatan": "Operator Malet",
        "waktu": {
            "dibuat": "1407134327233",
            "dirubah": "0"
        },
        "statusJabatan": "Aktif",
        "jenis": "Harian",
        "versi": 1
    }, {
        "idJabatan": "J005",
        "jabatan": "Operator Tenun",
        "waktu": {
            "dibuat": "1407134327233",
            "dirubah": "0"
        },
        "statusJabatan": "Aktif",
        "jenis": "Borongan",
        "versi": 1
    }, {
        "idJabatan": "J006",
        "jabatan": "Operator Penggulungan",
        "waktu": {
            "dibuat": "1407134327233",
            "dirubah": "1407334427233"
        },
        "statusJabatan": "Tidak Aktif",
        "jenis": "Harian",
        "versi": 1
    }]

$timeout( function () {
	angular.forEach(arr, function(v) {
        $indexedDB.save(arrObjS, v);
    });
}, 1000);
    

});
