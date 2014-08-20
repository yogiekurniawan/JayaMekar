'use strict';


angular.module('jayaMekarApp')

.controller('PenggajianKaryawanHarianCtrl', ['$scope', 'penggajianKaryawanHarianFactory',
    function($scope, penggajianKaryawanHarianFactory) {


        var that = $scope.PenggajianKaryawanHarianCtrl = this;

        this.sampleCallbackSucces = {};

        this.add = function() {
            var newSchema = {
                    'idPenggajian': 'PG001',
                    'nip': 'P001',
                    'idJabatan': 'J001',
                    'kelompokKerja': 'Operator Malet',
                    'jenis': 'Harian',
                    'shift': 'obj.shift',
                    'detailRumusGaji': 'obj.detailRumusGaji',
                    'bonus': 'obj.bonus',
                    'gapok': 'obj.gapok',
                    'totalGaji': 'obj.totalGaji',
                    'waktu': {
                        'dibuat': 'dibuat',
                        'dirubah': 'dirubah',
                    },
                    'versi': 'versi'
                };
            penggajianKaryawanHarianFactory.addSample(newSchema).then(function(success) {
                that.sampleCallbackSucces = success;
            });
        };
        this.add();


    }
]);
