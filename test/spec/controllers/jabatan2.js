'use strict';

describe('Controller: Jabatan2Ctrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var Jabatan2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Jabatan2Ctrl = $controller('Jabatan2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
