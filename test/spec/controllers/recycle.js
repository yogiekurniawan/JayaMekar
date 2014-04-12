'use strict';

describe('Controller: RecycleCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var RecycleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecycleCtrl = $controller('RecycleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});