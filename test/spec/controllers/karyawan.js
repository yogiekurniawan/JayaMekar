'use strict';

describe('Controller: KaryawanCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var KaryawanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KaryawanCtrl = $controller('KaryawanCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
