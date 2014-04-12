'use strict';

describe('Controller: JabatanCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var JabatanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JabatanCtrl = $controller('JabatanCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
