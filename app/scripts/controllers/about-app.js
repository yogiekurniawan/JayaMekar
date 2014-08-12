'use strict';

angular.module('jayaMekarApp')

// AboutAppCtrl as aboutapp
.controller('AboutAppCtrl', function($indexedDB, $timeout, layananData) {

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


    this.addContohData = function() {
    	
        angular.forEach(arrJabatan, function(v) {
            $indexedDB.save(["jabatan"], v).then(function(){
            	
            });
        });
        angular.forEach(arrKaryawan, function(v) {
            $indexedDB.save(["karyawan"], v).then(function(){
            	
            });
        });
        angular.forEach(arrRumusGaji, function(v) {
            $indexedDB.save(["rumusgaji"], v).then(function(){
            	
            });
        });

    };

});
