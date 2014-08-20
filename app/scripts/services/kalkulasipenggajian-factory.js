'use strict';

angular.module('jayaMekarApp')
  .factory('kalkulasiPenggajianFactory', function () {
    
    var uangHadir = function(kehadiran, objectRumusGaji){
        return kehadiran >= 6  ? objectRumusGaji.uangHadir: 0;
    };

    var gajiPokokHarian = function(kehadiran, objectRumusGaji){
      if (objectRumusGaji) {
          return kehadiran * ( objectRumusGaji.harga / 6 );
      }
    };

    var totalGaji = function(obj){
      obj.bonus = obj.bonus || 0;
      return obj.uangHadir + obj.gajiPokok + obj.bonus;
    };

    // Public API here
    return {
      uangHadir: uangHadir,
      gajiPokokHarian: gajiPokokHarian,
      totalGaji: totalGaji
    };
  });
