'use strict';

/**
* 
* @author : Yogie Kurniawan - yogie.jm@gmail.com
* @url    : scripts/services/indexeddb.js
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
    var versi = 1;
    var data = [];

/*********************************** S:init ***********************************/
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
        //console.log("init() : Kesalahan membuka DB");
        //console.dir(e);
        defer.reject(e.toString());
      };

      /* fungsi di panggil jika upgrade DB */
      openRequest.onupgradeneeded = function(e){
        db = e.target.result;

        /* membuat object store jabatan jika object store jabatan belum dibuat */
        if(!db.objectStoreNames.contains("jabatan")){
          var objectStore = db.createObjectStore("jabatan", {keyPath: "_id", autoIncrement: true});
          objectStore.createIndex("namaJabatan", "namaJabatan", {unique: false});
          objectStore.createIndex("namaStatus", "namaStatus", {unique: false});
        }
        if(!db.objectStoreNames.contains("karyawan")){
          var objectStore = db.createObjectStore("karyawan", {keyPath: "idKaryawan", autoIncrement: true});
          objectStore.createIndex("nama", "nama", {unique: false});
        }
      };

      /* fungsi di panggil jika success */
      openRequest.onsuccess = function(e){
        db = e.target.result;

        db.onerror = function(e){
          defer.reject("init() : Kesalahan DB" + e.target.errorCode);
        }
        defer.resolve(true);
      };

      return defer.promise;
    }
/*********************************** E:init ***********************************/


/**
* 
* @ S:Jabatan
*
*/

/*********************************** S:getAllJabatan ***********************************/
    
    var getAllJabatan = function(d){
      var result = [];
          var defer = $q.defer();
          //result.splice(0, result.length);
      init().then(function(){
        var handleResult = function(e){
          var cursor = e.target.result;
            if(cursor){
          //console.log("MANA NU IEU",d);
              /*result.push({
                idJabatan:cursor.key,
                namaJabatan: cursor.value.namaJabatan,
                type: cursor.value.type,
                timeStamps: {
                  create: cursor.value.timeStamps.create,
                  update: cursor.value.timeStamps.update
                },
                namaStatus: cursor.value.namaStatus,
                modeEdit: cursor.value.modeEdit
              });*/
              //console.log("dipanggil :", cursor.value.idJabatan);
              result.push(cursor.value);
              cursor.continue();
            }
        };

        var t = db.transaction(["jabatan"], "readonly");
        var objectStore = t.objectStore("jabatan");
        objectStore.openCursor().onsuccess = handleResult;

        t.oncomplete = function(e){
          //console.log("defer.resolve 124:", result);
          defer.resolve(result);
        }
      });

      return defer.promise;
    }

    var getAllJabatan2 = function(d){
          var defer = $q.defer();
          //result.splice(0, result.length);
          console.log("getAllJabatan2",d);
      init().then(function(){
        var handleResult = function(e){
          var cursor = e.target.result;
            if(cursor){
              if(cursor.value.idJabatan === d){
                //console.log("dipanggil :", cursor.value.idJabatan);
                result.push(cursor.value);
                console.log("object yg ditambahkan ke result : ", cursor.value);
              }
                cursor.continue();
              /*result.push({
                idJabatan:cursor.key,
                namaJabatan: cursor.value.namaJabatan,
                type: cursor.value.type,
                timeStamps: {
                  create: cursor.value.timeStamps.create,
                  update: cursor.value.timeStamps.update
                },
                namaStatus: cursor.value.namaStatus,
                modeEdit: cursor.value.modeEdit
              });*/
              
            }
        };

        var t = db.transaction(["jabatan"], "readonly");
        var objectStore = t.objectStore("jabatan");
        objectStore.openCursor().onsuccess = handleResult;

        t.oncomplete = function(e){
          
          defer.resolve(result);
        }
      });

      return defer.promise;
    }

/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan dan editJabatan ***********************************/

    var saveJabatan = function(object_store, data){

      var defer = $q.defer();

      //if(!data._id) data._id = "";
      //if(!data.idJabatan) data.modeEdit = new Date().getTime();
      //if(!data.timeStamps.timeCreate) data.timeStamps.timeCreate = new Date().getTime();

      var t = db.transaction([object_store], "readwrite");

      t.objectStore(object_store).add(data);


      // if (data.idJabatan === ""){ /* menambah data baru jika idJabatan = "" */
      //   t.objectStore("jabatan")
      //       //.add(data);
      //     .add({
      //       idJabatan: data.idJabatan,
      //       namaJabatan: data.namaJabatan,
      //       type: data.type,
      //       timeStamps: {
      //         create: data.timeStamps.timeCreate,
      //         update: data.timeStamps.timeUpdate
      //       },
      //       namaStatus: data.namaStatus,
      //       modeEdit: data.modeEdit
      //     });
      //    // getAllJabatan2(data.idJabatan);

      //     console.log("saveJabatan() : add : untuk menambah jabatan");
      //   /* merubah data jabatan yang sudah ada dengan kunci idJabatan */
      // } else { 
      //   t.objectStore("jabatan")
      //     .put({
      //       idJabatan: data.idJabatan,
      //       namaJabatan: data.namaJabatan,
      //       type: data.type,
      //       timeStamps: { 
      //         create: data.timeStamps.timeCreate,
      //         update: data.timeStamps.timeUpdate
      //       },
      //       namaStatus: data.namaStatus,
      //       modeEdit: data.modeEdit
      //     });
      //     console.log("saveJabatan() : put : untuk merubah jabatan");
      // }

      t.oncomplete = function(e){
        defer.resolve(getAllJabatan());

        //console.log("saveJabatan() : oncomplete");
      };

      //console.log("saveJabatan() : defer.promise");
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
    
    return {
      init:init,
      getAllJabatan:getAllJabatan,
      saveJabatan:saveJabatan,
      data:data,
      idbOK:idbOK
    };

/*********************************** E:return ***********************************/

  });
/**
* 
* @ E:indexeddb
*
*/
