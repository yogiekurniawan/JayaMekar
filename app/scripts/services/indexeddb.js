'use strict';

/**
* 
* @author : Yogie Kurniawan - yogie.jm@gmail.com
* @url    : 
*
*/

angular.module('jayaMekarApp')

/**
* 
* Name      : indexeddb
* Deskripsi : Modul penyimpanan data secara lokal untuk semua data yang ada
*             di sistem informasi penggajian.
*
*/

/*********************************** S:indexeddb ***********************************/

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

      /* membuat dan membuka indexedDB */
      var openRequest = window.indexedDB.open( namaDB, versi);

      /* fungsi di panggil jika error */
      openRequest.onerror = function(e){
        console.log("init() : Kesalahan membuka DB");
        console.dir(e);
        defer.reject(e.toString());
      };

      /* fungsi di panggil jika upgrade DB */
      openRequest.onupgradeneeded = function(e){
        db = e.target.result;

        /* membuat object store jabatan jika object store jabatan belum dibuat */
        if(!db.objectStoreNames.contains("jabatan")){
          var objectStore = db.createObjectStore("jabatan", {keyPath: "idJabatan", autoIncrement: true});
          objectStore.createIndex("namaJabatan", "namaJabatan", {unique: false});
        }
        console.log('init() :Pemberitahuan saat upgrade db');
      };

      /* fungsi di panggil jika success */
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


/**
* 
* @ S:Jabatan
*
*/

/*********************************** S:getAllJabatan ***********************************/

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
              timeStamps: {
                create: cursor.value.timeStamps.create,
                update: cursor.value.timeStamps.update
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
          console.log(result);
          defer.resolve(result);
          console.log("indexeddb: getAllJabatan: t.oncomplete")
        }
      });

      console.log("indexeddb : getAllJabatan : defer.promise");
      console.log(defer.promise);
      return defer.promise;
    }

/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan dan editJabatan ***********************************/

    var saveJabatan = function(data){

      var defer = $q.defer();

      if(!data.id) data.id = "";

      var t = db.transaction(["jabatan"], "readwrite");


      if (data.id === ""){ /* menambah data baru jika id = "" */
        t.objectStore("jabatan")
          .add({
            namaJabatan: data.namaJabatan,
            type: data.type,
            timeStamps: {
              create: data.timeCreate,
              update: data.timeUpdate
            },
            namaStatus: data.namaStatus
          });
          console.log("saveJabatan() : add : untuk menambah jabatan");
      } else { /* merubah data jabatan yang sudah ada dengan kunci id */
        t.objectStore("jabatan")
          .put({
            idJabatan:number(data.id),
            namaJabatan: data.namaJabatan,
            type: data.type,
            timeStamps: { 
              create: data.timeCreate,
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
/*********************************** E:saveJabatan dan editJabatan ***********************************/

/**
* 
* @ E:Jabatan
*
*/




/**
* 
* @ S:StokKomen
*
*/

/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/

/**
* 
* @ E:StokKomen
*
*/




/*********************************** S:Support IDB ***********************************/
    var idbOK = function (){
      return ("indexedDB" in window);
    };
/*********************************** E:Support IDB ***********************************/

/*********************************** S:return ***********************************/
    /* digunakan untuk mengenalkan fungsi yang sudah dibuat ke services */
    return {
      init:init,
      getAllJabatan:getAllJabatan,
      saveJabatan:saveJabatan,
      idbOK:idbOK
    };

/*********************************** E:return ***********************************/

  });
/**
* 
* @ E:indexeddb
*
*/
