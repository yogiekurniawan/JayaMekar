'use strict';

describe('Service: modaljabatanFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var modaljabatanFactory;
  beforeEach(inject(function (_modaljabatanFactory_) {
    modaljabatanFactory = _modaljabatanFactory_;
  }));

  it('should do something', function () {
    expect(!!modaljabatanFactory).toBe(true);
  });

});
