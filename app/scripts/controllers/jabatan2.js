'use strict';

/**********************************************************************************
* 
* @author : Yogie Kurniawan - yogie.jm@gmail.com
* @url    : 
*
***********************************************************************************/

angular.module('jayaMekarApp')

/**********************************************************************************
* 
* Name      : JabatanCtrl
* Deskripsi : Semua control untuk jabatan
*
***********************************************************************************/

  .controller('JabatanCtrl2', 
    ['$scope', 'indexeddb2', 'ngTableParams', '$filter', 
        function ($scope, indexeddb2, ngTableParams, $filter) {

/*********************************** S:getAllJabatan ***********************************/
    var getAllJabatan = function(){
        /*  dari services indexeddb2  */
        indexeddb2.getAllJabatan().then(function(data){
            $scope.jabatan = data;
            console.log("HomeCtrl : getAllJabatan : data");

            $filter('limitTo')($scope.jabatan, 10)

            // S:with ng-table
		      //var jb = data;

			     /*var getData = function() {
			        return $scope.dataset === data;
			    };

			    $scope.$watch("dataset", function () {
			        $scope.tableJabatan.reload();
			    });

		       	$scope.tableJabatan = new ngTableParams({
			        page: 1,            // show first page
			        count: 10           // count per page
			    }, {
			        total:  function () { return getData().length; }, // length of data
			        getData: function($defer, params) {
			            $defer.resolve( data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			        },
			        $scope: { $data: {} }
			    });*/

		      // $scope.tableJabatan = new  ngTableParams({
		      // 	page: 1,
		      // 	count: 10
		      // },{
		      // 	total: jb.length,
		      // 	getData: function($defer, params){
		      // 		var orderedData = params.sorting() ? $filter('orderBy')(jb, params.orderBy()) : data;

		      // 		params.total(orderedData.length);
		      // 		$defer.resolve(orderedData.slice((params.page - 1) * params.count(), params.page() * params.count()));
		      // 	}
		      // });
            // E:with ng-table

        });
    };
/*********************************** E:getAllJabatan ***********************************/

/*********************************** S:saveJabatan ***********************************/

    $scope.saveJabatan = function(){

    	var date = new Date();
        var data = {
            //idJabatan: "",
            namaJabatan: "Operator Malet",
            type: "Harian",
            timeStamps: {
            	create: "",
            	update: ""
            },
            namaStatus: "Aktif"
        }
        
        // data.id = "";
        // data.namaJabatan = "Operator Malet";
        // data.type = "Harian";
        // data.timeCreate = new Date().getTime();
        // data.timeUpdate = new Date().getTime();
        // data.namaStatus = "Tidak aktif";

        /*  dari services indexeddb2  */
        indexeddb2.saveJabatan(data).then(function(){
            console.log("data berhasil dimasukan");
            getAllJabatan();
        });

    };

    $scope.saveJabatan3 = function () {
    	 for (var i = 0; i < 25; i++) {
    	 	seribu();
         };
    	 console.log('Penyimpanan data 500 record selesai');
    }

	function seribu(){

    	var date = new Date();
        var data = {
            //idJabatan: "",
            namaJabatan: "Operator Malet",
            type: "Harian",
            timeStamps: {
            	create: "",
            	update: ""
            },
            namaStatus: "Aktif"
        };
        
        // data.id = "";
        // data.namaJabatan = "Operator Malet";
        // data.type = "Harian";
        // data.timeCreate = new Date().getTime();
        // data.timeUpdate = new Date().getTime();
        // data.namaStatus = "Tidak aktif";

        /*  dari services indexeddb2  */
        indexeddb2.saveJabatan(data).then(function(){
            console.log("data berhasil dimasukan");
            getAllJabatan();
        });

    };

/*********************************** E:saveJabatan ***********************************/


/*********************************** S:hapus ***********************************/

	$scope.hapus = function (key) {
		indexeddb2.hapus(key).then(function () {
			getAllJabatan();
			console.log('Data jabatan dengan key '+ key +' berhasil dihapus ');
		});
	}

/*********************************** E:hapus ***********************************/


/*********************************** S:rest with ng-table ***********************************/

/*********************************** E:rest with ng-table ***********************************/


/*********************************** S:StokKomen ***********************************/
/*********************************** E:StokKomen ***********************************/

    
    if(indexeddb2.idbOK()){
        getAllJabatan();
        console.log("HomeCtrl : Browser support IDB");
    } else {
        console.log("HomeCtrl : Browser tidak support IDB");
    }

    $scope.edit = function(key){
        key = false;
        console.log("function edit click "+  $scope.key);
    };

    $scope.save = function(key){
        this.j.key = true;
        console.log("function save click "+ this.j.key);
    };

    $scope.ngIfView = function(key){
        return key;
        console.log( key );
    }

    $scope.ngIfEdit = function(key){
        return "!"+key ;
        console.log( key );
    }

  }]);
/**********************************************************************************
* 
* @ E:JabatanCtrl
*
***********************************************************************************/
