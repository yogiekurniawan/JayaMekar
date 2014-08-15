'use strict';

describe('Service: jabatanFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var jabatanFactory;
  beforeEach(inject(function (_jabatanFactory_) {
    jabatanFactory = _jabatanFactory_;
  }));

  it('should do something', function () {
    expect(!!jabatanFactory).toBe(true);
  });

});
