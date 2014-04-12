'use strict';

describe('Controller: TransaksiKaryawanHarianCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var TransaksiKaryawanHarianCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiKaryawanHarianCtrl = $controller('TransaksiKaryawanHarianCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
