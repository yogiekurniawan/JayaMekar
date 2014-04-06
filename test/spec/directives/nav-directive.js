'use strict';

describe('Directive: navDirective', function () {

  // load the directive's module
  beforeEach(module('jayaMekarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nav-directive></nav-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navDirective directive');
  }));
});
