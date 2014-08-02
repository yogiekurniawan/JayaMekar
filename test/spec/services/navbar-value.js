'use strict';

describe('Service: navbarValue', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var navbarValue;
  beforeEach(inject(function (_navbarValue_) {
    navbarValue = _navbarValue_;
  }));

  it('should do something', function () {
    expect(!!navbarValue).toBe(true);
  });

});
