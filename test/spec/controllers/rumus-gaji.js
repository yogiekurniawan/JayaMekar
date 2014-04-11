'use strict';

describe('Controller: RumusGajiCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var RumusGajiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RumusGajiCtrl = $controller('RumusGajiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
