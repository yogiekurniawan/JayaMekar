'use strict';

describe('Directive: ykSidebar', function () {

  // load the directive's module
  beforeEach(module('jayaMekarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<yk-sidebar></yk-sidebar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ykSidebar directive');
  }));
});
