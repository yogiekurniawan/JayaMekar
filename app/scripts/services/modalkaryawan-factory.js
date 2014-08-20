'use strict';

angular.module('jayaMekarApp')
    .factory('modalKaryawanFactory', ['$q', '$log', '$modal',
        function($q, $log, $modal) {

            var open = function(jabatan, obj) {
                var defer = $q.defer();

                var modalKaryawan = $modal.open({
                    templateUrl: 'views/karyawan/modal-karyawan.html',
                    controller: function($scope, $modalInstance, obj) {

                        var that = $scope.modalKaryawanCtrl = this;

                        // jika parameter objek undifined maka objek kosong dibuat
                        this.obj = angular.copy(obj) || {};
                        this.obj.waktu = this.obj.waktu || {};
                        this.arrayJabatan = jabatan;
                        this.disabledStatusKaryawan = false;
                        this.objectJabatan = that.obj.rincianJabatan;
                        this.objectKelompokKerja = that.obj.kelompokKerja;
                        this.kelompokKerja = ['UM', 'UJ', 'NS'];
                        this.statusKaryawan = ['Kerja', 'Keluar'];

                        // jika obj.statusKaryawan undefined yang berarti sedang
                        // melakukan penambahan data.
                        if (angular.isUndefined(this.obj.statusKaryawan)) {
                            this.obj.statusKaryawan = 'Kerja';
                            this.disabledStatusKaryawan = true;
                        }

                        this.save = function(idJabatan, kelompokKerja, pertamaKerja) {
                            this.obj.idJabatan = idJabatan;
                            this.obj.kelompokKerja = kelompokKerja;
                            this.obj.waktu.pertamaKerja = pertamaKerja.getTime();
                            $modalInstance.close(that.obj);
                        };

                        this.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };


                        // S: Config untuk date
                        this.today = function() {
                            this.pertamaKerja = new Date();
                        };
                        this.today();


                        this.open = function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();

                            this.opened = true;
                        };

                        this.dateOptions = {
                            formatYear: 'yy',
                            startingDay: 1
                        };

                        this.format = 'dd MMMM yyyy';
                        // E: Config untuk date
                    },
                    backdrop: false,
                    resolve: {
                        obj: function() {
                            return obj;
                        }
                    }
                });

                modalKaryawan.result.then(function(result) {
                    defer.resolve(result);
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });

                return defer.promise;
            };

            return {
                open: open
            };
        }
    ]);
