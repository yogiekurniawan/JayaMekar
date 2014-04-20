'use strict';

describe('Directive: number', function () {

  // load the directive's module
  beforeEach(module('jayaMekarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<number></number>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the number directive');
  }));
});
