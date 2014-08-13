'use strict';

describe('Service: uuidFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var uuidFactory;
  beforeEach(inject(function (_uuidFactory_) {
    uuidFactory = _uuidFactory_;
  }));

  it('should do something', function () {
    expect(!!uuidFactory).toBe(true);
  });

});
