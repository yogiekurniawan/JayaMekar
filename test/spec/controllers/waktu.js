'use strict';

describe('Controller: WaktuCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var WaktuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WaktuCtrl = $controller('WaktuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
