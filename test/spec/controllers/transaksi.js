'use strict';

describe('Controller: TransaksiCtrl', function () {

  // load the controller's module
  beforeEach(module('jayaMekarApp'));

  var TransaksiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransaksiCtrl = $controller('TransaksiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
