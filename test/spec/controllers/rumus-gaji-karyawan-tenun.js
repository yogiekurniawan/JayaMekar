'use strict';

describe('Controller: RumusGajiKaryawanTenunCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var RumusGajiKaryawanTenunCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RumusGajiKaryawanTenunCtrl = $controller('RumusGajiKaryawanTenunCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
