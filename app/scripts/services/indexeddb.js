'use strict';

angular.module('jayaMekarApp')
  .factory('indexeddb', function ($q) {
    
    var setUp = false;
    var db;
    var namaDB = "Penggajian";
    var versi = 2;

    /* S:init */
    var init = function(){

      var defer = $q.defer();

      if(setUp){
        defer.resolve(true);
        return defer.promise;
      }

      var openRequest = window.indexedDB.open( namaDB, versi);

      openRequest.onerror = function(e){
        console.log("init() : Kesalahan membuka DB");
        console.dir(e);
        defer.reject(e.toString());
      };

      openRequest.onupgradeneeded = function(e){
        db = e.target.result;

        if(!db.objectStoreNames.contains("jabatan")){
          var objectStore = db.createObjectStore("jabatan", {keyPath: "idJabatan", autoIncrement: true});
          objectStore.createIndex("namaJabatan", "namaJabatan", {unique: false});
        }
        console.log('init() :Pemberitahuan saat upgrade db');
      };

      openRequest.onsuccess = function(e){
        db = e.target.result;

        db.onerror = function(e){
          defer.reject("init() : Kesalahan DB" + e.target.errorCode);
        }
        console.log('init() : Database siap digunakan');
        defer.resolve(true);
      };

      console.log( "init() : defer.promise" );
      return defer.promise;
    }
    /* E:init */

    /* S:getAllJabatan */
    var getAllJabatan = function(){

      var defer = $q.defer();

      init().then(function(){

        var result = [];

        var handleResult = function(e){
          var cursor = e.target.result;
          if(cursor){
            result.push({
              key:cursor.key,
              namaJabatan: cursor.value.namaJabatan,
              type: cursor.value.type,
              time: {
                create: cursor.value.time.create,
                update: cursor.value.time.update
              },
              namaStatus: cursor.value.namaStatus
            });
            cursor.continue();
          }
        };

        var t = db.transaction(["jabatan"], "readonly");
        var objectStore = t.objectStore("jabatan");
        objectStore.openCursor().onsuccess = handleResult;

        t.oncomplete = function(e){
          defer.resolve(result);
          console.log("indexeddb: getAllJabatan: t.oncomplete")
        }
      });

      console.log("indexeddb : getAllJabatan : defer.promise");
      /*console.log(defer.promise);*/
      return defer.promise;
    }
    /* E:getAllJabatan */

    /* S:saveJabatan */
    var saveJabatan = function(data){

      var defer = $q.defer();

      if(!data.id) data.id = "";

      var t = db.transaction(["jabatan"], "readwrite");

      if (data.id === ""){
        t.objectStore("jabatan")
          .add({
            namaJabatan: data.namaJabatan,
            type: data.type,
            time: { create: data.timeCreate,
                    update: data.timeUpdate
            },
            namaStatus: data.namaStatus
          });
          console.log("saveJabatan() : add : untuk menambah jabatan");
      } else {
        t.objectStore("jabatan")
          .put({
            idJabatan:number(data.id),
            namaJabatan: data.namaJabatan,
            type: data.type,
            time: { create: data.timeCreate,
                    update: data.timeUpdate
            },
            namaStatus: data.namaStatus
          });
          console.log("saveJabatan() : put : untuk merubah jabatan");
      }

      t.oncomplete = function(e){
        defer.resolve();
        console.log("saveJabatan() : oncomplete");
      };

      console.log("saveJabatan() : defer.promise");
      return defer.promise;

    };
    /* E:saveJabatan */

    /* S:Support IDB */
    var idbOK = function (){
      return ("indexedDB" in window);
    };
    /* E:Support IDB */

    return {
      init:init,
      getAllJabatan:getAllJabatan,
      saveJabatan:saveJabatan,
      idbOK:idbOK
    };
  });
