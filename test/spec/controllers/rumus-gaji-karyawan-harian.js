'use strict';

describe('Controller: RumusGajiKaryawanHarianCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var RumusGajiKaryawanHarianCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RumusGajiKaryawanHarianCtrl = $controller('RumusGajiKaryawanHarianCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
