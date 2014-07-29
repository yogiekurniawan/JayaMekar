"use strict";angular.module("jayaMekarApp",["ngAnimate","ui.bootstrap","ui.select2","ui.router","ngTable"]).run(["$rootScope","$state","$stateParams",function(a,b,c){a.$state=b,a.$stateParams=c}]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/)}]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b){b.otherwise("/"),a.state("home",{url:"/",templateUrl:"views/home.html",controller:"HomeCtrl"}).state("jabatan",{url:"/jabatan",templateUrl:"views/jabatan/jabatan.html",controller:"JabatanCtrl"}).state("karyawan",{url:"/karyawan",templateUrl:"views/karyawan/karyawan.html",controller:"KaryawanCtrl"}).state("rumus-gaji",{url:"/rumus-gaji",templateUrl:"views/rumus-gaji/rumus-gaji.html",controller:"RumusGajiCtrl as rg"}).state("rumus-gaji.karyawan-tenun",{url:"/karyawan-tenun",templateUrl:"views/rumus-gaji/rumus-gaji-karyawan-tenun.html",controller:"RumusGajiKaryawanTenunCtrl"}).state("rumus-gaji.karyawan-harian",{url:"/karyawan-harian",templateUrl:"views/rumus-gaji/rumus-gaji-karyawan-harian.html",controller:"RumusGajiKaryawanHarianCtrl"}).state("transaksi",{url:"/transaksi",templateUrl:"views/transaksi/transaksi.html",controller:"TransaksiCtrl"}).state("transaksi.karyawan-tenun",{url:"/karyawan-tenun",templateUrl:"views/transaksi/karyawan-borongan/transaksi-karyawan-tenun.html",controller:"TransaksiKaryawanTenunCtrl"}).state("transaksi.karyawan-harian",{url:"/karyawan-harian",templateUrl:"views/transaksi/karyawan-harian/transaksi-karyawan-harian.html",controller:"TransaksiKaryawanHarianCtrl"}).state("info",{url:"/info",templateUrl:"views/info.html",controller:"InfoCtrl"}).state("info.recycle",{url:"/recycle",templateUrl:"views/recycle.html",controller:"RecycleCtrl"}).state("info.about-me",{url:"/about-me",templateUrl:"views/about-me.html",controller:"AboutMeCtrl"}).state("info.about-app",{url:"/about-app",templateUrl:"views/about-app.html",controller:"AboutAppCtrl"}).state("eksperimen",{url:"/eksperimen",template:"<ui-view></ui-view>"}).state("eksperimen.yk-table",{url:"/yk-table",templateUrl:"views/eksperimen-yk-table.html",controller:"EksperimenYkTableCtrl"}).state("waktu",{url:"/waktu",templateUrl:"views/waktu.html",controller:"WaktuCtrl as waktu"}).state("jabatan2",{url:"/jabatan2",templateUrl:"views/jabatan2.html",controller:"Jabatan2Ctrl as jabatan2"})}]),angular.module("jayaMekarApp").directive("ykNav",function(){return{templateUrl:"views/directive/yk-nav.html",restrict:"EA",replace:!0,controller:["$scope","ykValue",function(a,b){a.perusahaan=b.aboutApp.nama.perusahaan,a.menu=b.menu.navTop}]}}),angular.module("jayaMekarApp").controller("HomeCtrl",["$scope","layananData","indexeddb",function(){$(function(){$("#side-menu").metisMenu()})}]),angular.module("jayaMekarApp").controller("JabatanCtrl",["$scope","indexeddb","$filter",function(a,b){$(function(){$("#side-menu").metisMenu()}),a.jabatan=b.data,a.baru=!1,a.edited=!1,a.type=["Borongan","Harian"],a.status=["Aktif","Tidak aktif"],a.j={status:a.status[0]},b.getAllJabatan().then(function(c){b.data=c,a.jabatan=b.data,console.log("HomeCtrl : getAllJabatan : ",c)}),a.tambah=function(){a.baru=!0},a.add=function(c){var d="jabatan",e={namaJabatan:c.namaJabatan,type:c.type,timeStamps:{create:(new Date).getTime(),update:0},namaStatus:c.status};b.saveJabatan(d,e).then(function(a){console.log("objectStore",d),console.log("Setelah add data",a)}),console.log("data berhasil dimasukan",e),a.baru=!1},a.simpan=function(c){var d="jabatan",e={_id:c._id,namaJabatan:c.namaJabatan,type:c.type,timeStamps:{timeCreate:c.timeStamps.create,timeUpdate:(new Date).getTime()},namaStatus:c.namaStatus};b.saveJabatan(d,e).then(function(){console.log("data berhasil disimpan",e)}),a.edited=!1},a.edit=function(b){a.edited=b},console.log(b.idbOK()?"HomeCtrl : Browser support IDB":"HomeCtrl : Browser tidak support IDB")}]),angular.module("jayaMekarApp").controller("KaryawanCtrl",["$scope","layananData","ngTableParams","$filter",function(a,b,c,d){a.search2="Kerja",b.getJabatan().then(function(b){a.jabatan=b}),b.getKaryawan().then(function(b){var e=b;a.tableKaryawan=new c({page:1,count:10},{total:e.length,getData:function(a,c){var f=c.sorting()?d("orderBy")(e,c.orderBy()):b;c.total(f.length),a.resolve(f.slice((c.page-1)*c.count(),c.page()*c.count()))}})})}]),angular.module("jayaMekarApp").controller("RumusGajiKaryawanTenunCtrl",["$scope","layananData","$filter","ngTableParams",function(a,b,c,d){b.getRumusGaji().then(function(b){var e=b;a.tableRGKaryawanTenun=new d({page:1,count:10,filter:{type:"KaryawanBorongan"},sorting:{idJabatan:"asc"}},{total:e.length,getData:function(a,d){var f=d.filter()?c("filter")(e,d.filter()):b,g=d.sorting()?c("orderBy")(f,d.orderBy()):b;d.total(g.length),a.resolve(g.slice((d.page()-1)*d.count(),d.page()*d.count()))}})}),b.getJabatan().then(function(b){a.jabatan=b})}]),angular.module("jayaMekarApp").controller("RumusGajiKaryawanHarianCtrl",["$scope","layananData","$filter","ngTableParams",function(a,b,c,d){b.getRumusGaji().then(function(b){var e=b;a.tableRGKaryawanTenun=new d({page:1,count:10,filter:{type:"KaryawanHarian"},sorting:{idJabatan:"asc"}},{total:e.length,getData:function(a,d){var f=d.filter()?c("filter")(e,d.filter()):b,g=d.sorting()?c("orderBy")(f,d.orderBy()):b;d.total(g.length),a.resolve(g.slice((d.page()-1)*d.count(),d.page()*d.count()))}})}),b.getJabatan().then(function(b){a.jabatan=b})}]),angular.module("jayaMekarApp").controller("TransaksiKaryawanTenunCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jayaMekarApp").controller("TransaksiKaryawanHarianCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jayaMekarApp").controller("RecycleCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jayaMekarApp").controller("AboutMeCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jayaMekarApp").controller("AboutAppCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jayaMekarApp").filter("status",function(){var a="";return function(b){return a="Aktif"==b?"ok green":"remove red"}}).filter("panelStatus",function(){var a="";return function(b){return a="Aktif"==b?"success":"danger"}}).filter("noTable",function(){var a;return function(b,c){return a=1==c?b+1:c>1?b+1+10*(c-1):"error"}}).filter("bulan",function(){var a;return function(b){var c=b.getMonth(),d=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];return a=d[c]}}).filter("waktu",["$timeout",function(){return function(a){var b=(new Date).getTime()-a;if(6e4>b)var c="baru saja";else c=b/6e4%60;return c}}]),angular.module("jayaMekarApp").controller("WaktuCtrl",["$scope","time","nilai","ykValue",function(a,b,c,d){this.ykValue=d,a.nilai=c,a.date=new Date,a.time=b}]),angular.module("jayaMekarApp").factory("time",["$timeout",function(a){var b={};return function c(){var d=new Date;b.now=d.toString(),a(c,1e3)}(),b}]).factory("nilai",function(){var a={};return function(){a.a}(),a}),angular.module("jayaMekarApp").controller("RumusGajiCtrl",function(){}),angular.module("jayaMekarApp").factory("layananData",["$q","$http","$templateCache",function(a,b,c){var d=function(){var d=a.defer(),e="get",f="json/jabatan.json";return b({method:e,url:f,cache:c}).success(function(a){d.resolve(a)}).error(function(a){a=a||"Permintaan data gagal",d.reject(a)}),d.promise},e=function(){var d=a.defer(),e="get",f="json/karyawan.json";return b({method:e,url:f,cache:c}).success(function(a){d.resolve(a)}).error(function(a){a=a||"Permintaan data gagal",d.reject(a)}),d.promise},f=function(){var d=a.defer(),e="get",f="json/rumusGaji.json";return b({method:e,url:f,cache:c}).success(function(a){d.resolve(a)}).error(function(a){a=a||"Permintaan data gagal",d.reject(a)}),d.promise};return{getJabatan:d,getKaryawan:e,getRumusGaji:f}}]),angular.module("jayaMekarApp").controller("TransaksiCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("jayaMekarApp").factory("indexeddb",["$q",function(a){var b,c=!1,d="Penggajian",e=1,f=[],g=function(){var f=a.defer();if(c)return f.resolve(!0),f.promise;var g=window.indexedDB.open(d,e);return g.onerror=function(a){f.reject(a.toString())},g.onupgradeneeded=function(a){if(b=a.target.result,!b.objectStoreNames.contains("jabatan")){var c=b.createObjectStore("jabatan",{keyPath:"_id",autoIncrement:!0});c.createIndex("namaJabatan","namaJabatan",{unique:!1}),c.createIndex("namaStatus","namaStatus",{unique:!1})}if(!b.objectStoreNames.contains("karyawan")){var c=b.createObjectStore("karyawan",{keyPath:"idKaryawan",autoIncrement:!0});c.createIndex("nama","nama",{unique:!1})}},g.onsuccess=function(a){b=a.target.result,b.onerror=function(a){f.reject("init() : Kesalahan DB"+a.target.errorCode)},f.resolve(!0)},f.promise},h=function(){var c=[],d=a.defer();return g().then(function(){var a=function(a){var b=a.target.result;b&&(c.push(b.value),b.continue())},e=b.transaction(["jabatan"],"readonly"),f=e.objectStore("jabatan");f.openCursor().onsuccess=a,e.oncomplete=function(){d.resolve(c)}}),d.promise},i=function(c,d){var e=a.defer(),f=b.transaction([c],"readwrite");return f.objectStore(c).add(d),f.oncomplete=function(){e.resolve(h())},e.promise},j=function(){return"indexedDB"in window};return{init:g,getAllJabatan:h,saveJabatan:i,data:f,idbOK:j}}]),angular.module("jayaMekarApp").value("ykValue",{aboutApp:{nama:{perusahaan:"PT. Jaya Mekar",deskripsi:"Sistem Informasi Penggajian"},version:"0.0.1",copyright:{href:"about-me",ngClass:"",nama:"{{ykValue.nama.depan}} {{ykValue.nama.belakang}}"}},aboutMe:{nama:{depan:"Yogie",belakang:"Kurniawan"},email:"yogie.jm@gmail.com"},menu:{navTop:[{href:"home",menu:"Home",ngClass:"fa fa-home"},{href:"jabatan",menu:"Jabatan",ngClass:""},{href:"karyawan",menu:"Karyawan",ngClass:""},{href:"rumus-gaji",menu:"Rumus Gaji",ngClassD:"caret",dropdown:!0,submenu:[{href:"rumus-gaji.karyawan-harian",submenu:"Karyawan Harian",ngClass:""},{href:"rumus-gaji.karyawan-tenun",submenu:"Karyawan Tenun",ngClass:""}]},{href:"transaksi",menu:"Transaksi",ngClassD:"caret",dropdown:!0,submenu:[{href:"transaksi.karyawan-harian",submenu:"Karyawan Harian",ngClass:""},{href:"transaksi.karyawan-tenun",submenu:"Karyawan Tenun",ngClass:""}]},{href:"eksperimen",menu:"Eksperimen",ngClassD:"caret",dropdown:!0,submenu:[{href:"eksperimen.yk-table",submenu:"yk-table",ngClass:"glyphicon glyphicon-wrench"}]},{href:"info",menu:"",ngClassD:"glyphicon glyphicon-align-justify",dropdown:!0,submenu:[{href:"info.recycle",submenu:"Recyle",ngClass:"glyphicon glyphicon-trash"},{href:"info.about-me",submenu:"About Me",ngClass:"glyphicon glyphicon-user"},{href:"info.about-app",submenu:"About App",ngClass:"fa fa-laptop"}]}]}}),angular.module("jayaMekarApp").directive("ykTable",function(){return{templateUrl:"views/directive/yk-table.html",restrict:"E",replace:!0,transclude:!0,scope:{ykdata:"=data",yklimit:"=limit",ykstartarray:"=start",ykheader:"=header"},controller:["$scope","$filter",function(a,b){a.header=a.ykheader?a.ykheader:"",a.data=this.data=a.ykdata?a.ykdata:data,a.limit=this.limit=a.yklimit?a.yklimit:5;var c=7;this.start=a.start=a.ykstartarray?a.ykstartarray:0,a.$watch("start",function(){}),a.setPage=function(){a.start=this.item*a.limit},a.prevPage=function(){a.start=a.start>0?a.start-a.limit:a.start},a.nextPage=function(){a.start=a.start<b("filter")(a.data,a.ykfilter).length-a.limit?a.start+a.limit:a.start},a.firstPage=function(){a.start=0},a.lastPage=function(){a.start=(Math.ceil(b("filter")(a.data,a.ykfilter).length/a.limit)-1)*a.limit},a.disabledPrevPage=function(){},a.disabledNextPage=function(){return a.start>=b("filter")(a.data,a.ykfilter).length-a.limit?!0:!1},a.noActive=function(){return a.start/a.limit+1},a.numPagStart=function(){var b,d=Math.ceil(c/2),e=a.data.length/a.limit-3,f=a.start/a.limit+1;return b=f>d&&e>f?f-4:f>=e?e-4:0},a.numPagEnd=function(){var b=Math.ceil(c/2),d=a.start/a.limit+1,e=d>b?d+3:c;return e}}]}}).filter("startArray",function(){return function(a,b){return a.slice(b)}}).filter("lengthArray",function(){return function(a){return a.length}}).filter("sumByKey",function(){return function(a,b){if("undefined"==typeof a||"undefined"==typeof b)return 0;for(var c=0,d=a.length-1;d>=0;d--)c+=parseInt(a[d][b]);return c}}).filter("numberFormat",function(){return function(a,b,c){return Number.prototype.format=function(a,b,c,d){var e="\\d(?=(\\d{"+(b||3)+"})+"+(a>0?"\\D":"$")+")",f=this.toFixed(Math.max(0,~~a));return(d?f.replace(".",d):f).replace(new RegExp(e,"g"),"$&"+(c||","))},b+a.format(c,3,".",",")}}),angular.module("jayaMekarApp").controller("EksperimenYkTableCtrl",["$scope","$filter",function(a){a.data=[];for(var b=1;100>=b;b++)a.data.push({_id:"id"+b,column1:"column1 "+(b+Math.floor(50*Math.random()+1)),column2:"column2 "+(b+Math.floor(50*Math.random()+1)),column3:"column3 "+(b+Math.floor(50*Math.random()+1)),column4:1+b+Math.floor(50*Math.random()+1),column5:1+b+Math.floor(50*Math.random()+1),aksi:"edit "+b});a.ykfilter="",a.dataheader="ini adalah data header",a.maxSize=5,a.bigTotalItems=100,a.bigCurrentPage=1,a.itemsPerPage=7,a.$watch("bigCurrentPage",function(b){a.start=(b-1)*a.itemsPerPage})}]),angular.module("jayaMekarApp").controller("Jabatan2Ctrl",["$scope","indexeddb","$filter",function(a,b){this.jabatan=b.data,this.baru=!1,this.edited=!1,this.type=["Borongan","Harian"],this.status=["Aktif","Tidak aktif"],this.j={status:this.status[0]},b.getAllJabatan().then(function(a){b.data=a,this.jabatan=b.data,console.log("first : ",this.jabatan)}.bind(this)),this.tambah=function(){this.baru=!0},this.add=function(a){a.idJabatan=(new Date).getTime();var c={idJabatan:a.idJabatan,namaJabatan:a.namaJabatan,type:a.type,timeStamps:{timeCreate:(new Date).getTime(),timeUpdate:(new Date).getTime()},namaStatus:"Aktif"};b.saveJabatan(c).then(function(){}),this.baru=!1},this.simpan=function(a){var c={idJabatan:a.idJabatan,namaJabatan:a.namaJabatan,type:a.type,timeStamps:{timeCreate:a.timeStamps.create,timeUpdate:(new Date).getTime()},namaStatus:a.namaStatus};b.saveJabatan(c).then(function(){console.log("data berhasil disimpan",c)}),this.edited=!1},this.edit=function(a){this.edited=a},console.log(b.idbOK()?"HomeCtrl : Browser support IDB":"HomeCtrl : Browser tidak support IDB")}]),angular.module("jayaMekarApp").directive("ykThead",function(){return{templateUrl:"views/directive/yk-thead.html",restrict:"E",replace:!0,require:"^ykTable",link:function(){}}}),angular.module("jayaMekarApp").directive("ykTbody",function(){return{templateUrl:"views/directive/yk-tbody.html",restrict:"E",replace:!0,require:"^ykTable",scope:{},link:function(a,b,c,d){a.data=d.data,a.limit=d.limit,a.start=d.start,console.log(d.start)}}}),angular.module("jayaMekarApp").controller("InfoCtrl",["$scope",function(){$(function(){$("#side-menu").metisMenu()})}]);