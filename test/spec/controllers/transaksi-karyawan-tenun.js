'use strict';

describe('Controller: TransaksiKaryawanTenunCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var TransaksiKaryawanTenunCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiKaryawanTenunCtrl = $controller('TransaksiKaryawanTenunCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
