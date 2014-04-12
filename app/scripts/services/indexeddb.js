'use strict';

<<<<<<< HEAD
/**********************************************************************************
* 
* @author : Yogie Kurniawan - yogie.jm@gmail.com
* @url    : 
*
***********************************************************************************/

angular.module('jayaMekarApp')

/**********************************************************************************
* 
* Name      : indexeddb
* Deskripsi : Modul penyimpanan data secara lokal untuk semua data yang ada
*             di sistem informasi penggajian.
*
***********************************************************************************/

/*********************************** S:indexeddb ***********************************/
=======
angular.module('jayaMekarApp')
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
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

<<<<<<< HEAD
      /* membuat dan membuka indexedDB */
      var openRequest = window.indexedDB.open( namaDB, versi);

      /* fungsi di panggil jika error */
=======
      var openRequest = window.indexedDB.open( namaDB, versi);

>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
      openRequest.onerror = function(e){
        console.log("init() : Kesalahan membuka DB");
        console.dir(e);
        defer.reject(e.toString());
      };

<<<<<<< HEAD
      /* fungsi di panggil jika upgrade DB */
      openRequest.onupgradeneeded = function(e){
        db = e.target.result;

        /* membuat object store jabatan jika object store jabatan belum dibuat */
=======
      openRequest.onupgradeneeded = function(e){
        db = e.target.result;

>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
        if(!db.objectStoreNames.contains("jabatan")){
          var objectStore = db.createObjectStore("jabatan", {keyPath: "idJabatan", autoIncrement: true});
          objectStore.createIndex("namaJabatan", "namaJabatan", {unique: false});
        }
        console.log('init() :Pemberitahuan saat upgrade db');
      };

<<<<<<< HEAD
      /* fungsi di panggil jika success */
=======
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
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

<<<<<<< HEAD
/**********************************************************************************
* 
* @ S:Jabatan
*
***********************************************************************************/

/*********************************** S:getAllJabatan ***********************************/
=======
    /* S:getAllJabatan */
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
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
<<<<<<< HEAD
/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan dan editJabatan ***********************************/
=======
    /* E:getAllJabatan */

    /* S:saveJabatan */
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
    var saveJabatan = function(data){

      var defer = $q.defer();

      if(!data.id) data.id = "";

      var t = db.transaction(["jabatan"], "readwrite");

<<<<<<< HEAD
      if (data.id === ""){ /* menambah data baru jika id = "" */
=======
      if (data.id === ""){
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
        t.objectStore("jabatan")
          .add({
            namaJabatan: data.namaJabatan,
            type: data.type,
<<<<<<< HEAD
            time: {
              create: data.timeCreate,
              update: data.timeUpdate
=======
            time: { create: data.timeCreate,
                    update: data.timeUpdate
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
            },
            namaStatus: data.namaStatus
          });
          console.log("saveJabatan() : add : untuk menambah jabatan");
<<<<<<< HEAD
      } else { /* merubah data jabatan yang sudah ada dengan kunci id */
=======
      } else {
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
        t.objectStore("jabatan")
          .put({
            idJabatan:number(data.id),
            namaJabatan: data.namaJabatan,
            type: data.type,
<<<<<<< HEAD
            time: { 
              create: data.timeCreate,
              update: data.timeUpdate
=======
            time: { create: data.timeCreate,
                    update: data.timeUpdate
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
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
<<<<<<< HEAD
/*********************************** E:saveJabatan dan editJabatan ***********************************/

/**********************************************************************************
* 
* @ E:Jabatan
*
***********************************************************************************/




/**********************************************************************************
* 
* @ S:StokKomen
*
***********************************************************************************/

/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/

/**********************************************************************************
* 
* @ E:StokKomen
*
***********************************************************************************/




/*********************************** S:Support IDB ***********************************/
    var idbOK = function (){
      return ("indexedDB" in window);
    };
/*********************************** E:Support IDB ***********************************/

/*********************************** S:return ***********************************/
    /* digunakan untuk mengenalkan fungsi yang sudah dibuat ke services */
=======
    /* E:saveJabatan */

    /* S:Support IDB */
    var idbOK = function (){
      return ("indexedDB" in window);
    };
    /* E:Support IDB */

>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
    return {
      init:init,
      getAllJabatan:getAllJabatan,
      saveJabatan:saveJabatan,
      idbOK:idbOK
    };
<<<<<<< HEAD
/*********************************** E:return ***********************************/

  });
/**********************************************************************************
* 
* @ E:indexeddb
*
***********************************************************************************/
=======
  });
>>>>>>> 2355092096ad6d992284b467f5bd6dbeb4815d46
