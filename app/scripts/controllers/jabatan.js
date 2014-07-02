'use strict';

/**********************************************************************************
 *
 * @author : Yogie Kurniawan - yogie.jm@gmail.com
 * @url    : scripts/controllers/jabatan.js
 *
 ***********************************************************************************/

angular.module('jayaMekarApp')

/**********************************************************************************
 *
 * Name Controller       : JabatanCtrl
 * Deskripsi             : Semua control untuk jabatan
 *
 ***********************************************************************************/

.controller('JabatanCtrl', ['$scope', 'indexeddb', '$filter',
    function($scope, indexeddb, $filter) {

        // menjalankan mentis menu
        $(function() {
            $('#side-menu').metisMenu();
        });

        /*********************************** S:getAllJabatan ***********************************/
        $scope.jabatan = indexeddb.data;

        $scope.baru = false;
        $scope.edited = false;
        $scope.type = ["Borongan", "Harian"];
        $scope.status = ["Aktif", "Tidak aktif"];
        $scope.j = {
            status: $scope.status[0]
        };

        /*var getAllJabatan = function(){
        dari services indexeddb 
        indexeddb.getAllJabatan().then(function(data){
            $scope.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : ", data);
        });
    };*/

        indexeddb.getAllJabatan().then(function(data) {
            indexeddb.data = data;
            $scope.jabatan = indexeddb.data;
            console.log("HomeCtrl : getAllJabatan : ", data);
        });

        /*********************************** E:getAllJabatan ***********************************/

        /*********************************** S:saveJabatan ***********************************/

        $scope.tambah = function() {
            $scope.baru = true;
        };

        $scope.add = function(j) {

            var objectStore = "jabatan",
                data = {

                    namaJabatan: j.namaJabatan,
                    type: j.type,
                    timeStamps: {
                        create: new Date().getTime(),
                        update: 0
                    },
                    namaStatus: j.status,
                };

            /*  dari services indexeddb  */
            indexeddb.saveJabatan(objectStore, data).then(function(data) {
                //$scope.jabatan = data;
                console.log("objectStore", objectStore);
                console.log("Setelah add data", data);
            });
            console.log("data berhasil dimasukan", data);
            //$scope.jabatan.push(data)

            $scope.baru = false;
            //$scope.j = {};
        }

        $scope.simpan = function(j) {

            var objectStore = "jabatan",
                data = {
                    _id: j._id,
                    namaJabatan: j.namaJabatan,
                    type: j.type,
                    timeStamps: {
                        timeCreate: j.timeStamps.create,
                        timeUpdate: new Date().getTime()
                    },
                    namaStatus: j.namaStatus,
                };

            /*  dari services indexeddb  */
            indexeddb.saveJabatan(objectStore, data).then(function() {
                console.log("data berhasil disimpan", data);
            });
            //console.log(data);
            $scope.edited = false;
        }
        /*********************************** E:saveJabatan ***********************************/


        /*********************************** S:edit ***********************************/
        $scope.edit = function(j) {
            $scope.edited = j;
        };
        /*********************************** E:edit ***********************************/

        /*********************************** S:StokKomen ***********************************/
        /*********************************** E:StokKomen ***********************************/


        if (indexeddb.idbOK()) {
            //getAllJabatan();
            console.log("HomeCtrl : Browser support IDB");
        } else {
            console.log("HomeCtrl : Browser tidak support IDB");
        }

    }
]);
/**********************************************************************************
 *
 * @ E:JabatanCtrl
 *
 ***********************************************************************************/
