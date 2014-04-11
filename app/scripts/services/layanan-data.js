'use strict';

angular.module('jayaMekarApp')
  .factory('layananData', function($q, $http, $templateCache){

    var getJabatan = function(){
      
      var defer = $q.defer();

      var method = "get";
      var url = "json/jabatan.json";
      var data;

      $http({method: method, url: url, cache: $templateCache})
      .success(function(data){
        defer.resolve(data);
      })
      .error(function(data){
        data = data || "Permintaan data gagal";
        defer.reject(data);
      });

      return defer.promise;
      
    };

    var getKaryawan = function(){

      var defer = $q.defer();

      var method = "get";
      var url = "json/karyawan.json";

      $http({method: method, url: url, cache: $templateCache})
        .success(function(data){
          defer.resolve(data);
        })
        .error(function(data){
          data = data || "Permintaan data gagal";
          defer.reject(data);
        });

        return defer.promise;
    };

    var getRumusGaji = function(){

      var defer = $q.defer();

      var method = "get";
      var url = "json/rumusGaji.json";

      $http({method: method, url: url, cache: $templateCache})
        .success(function(data){
          defer.resolve(data);
        })
        .error(function(data){
          data = data || "Permintaan data gagal";
          defer.reject(data);
        });

        return defer.promise;
    };

    return {
      getJabatan:getJabatan,
      getKaryawan:getKaryawan,
      getRumusGaji:getRumusGaji
    };

  });