'use strict';

angular.module('jayaMekarApp')
    .factory('modalKaryawanFactory', function($q, $log, $modal) {

        var open = function(jabatan, obj) {
            var defer = $q.defer();

            var modalJabatan = $modal.open({
                templateUrl: 'views/karyawan/modal-karyawan.html',
                controller: function($scope, $modalInstance, obj) {

                    var that = $scope.modalKaryawanCtrl = this;

                    // jika parameter obj undifined maka obj kosong dibuat
                    this.obj = angular.copy(obj) || {};
                    this.obj.waktu = this.obj.waktu || {};
                    this.historyObject = angular.copy(obj);
                    this.arrayJabatan = jabatan;
                    this.disabledStatusKaryawan = false;
                    this.objectJabatan = that.obj.detailJabatan;
                    this.objectKelompokKerja = that.obj.kelompokKerja;
                    this.kelompokKerja = ['UM','UJ','NS'];
                    this.statusKaryawan = ['Kerja', 'Keluar'];

                    if (angular.isUndefined(this.obj.statusKaryawan)) {
                        this.obj.statusKaryawan = 'Kerja';
                        this.disabledStatusKaryawan = true;
                    }

                    console.log(that.historyObject);

                    this.add = function(idJabatan, kelompokKerja, pertamaKerja) {
                        this.obj.idJabatan = idJabatan;
                        this.obj.kelompokKerja = kelompokKerja;
                        this.obj.waktu.pertamaKerja = pertamaKerja.getTime();
                        $modalInstance.close(that.obj);
                    };

                    this.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };

                    this.today = function() {
                        this.pertamaKerja = new Date();
                    };
                    this.today();

                    // Disable weekend selection
                    this.disabled = function(date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    };

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
                },
                // size: size,
                backdrop: false,
                resolve: {
                    obj: function() {
                        return obj;
                    }
                }
            });

            modalJabatan.result.then(function(result) {
                defer.resolve(result);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

            return defer.promise;
        };

        return {
            open: open
        };
    });