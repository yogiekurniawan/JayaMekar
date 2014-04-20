'use strict';

describe('Controller: NumberCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var NumberCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NumberCtrl = $controller('NumberCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
