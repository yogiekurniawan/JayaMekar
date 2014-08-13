'use strict';

describe('Service: modalFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var modalFactory;
  beforeEach(inject(function (_modalFactory_) {
    modalFactory = _modalFactory_;
  }));

  it('should do something', function () {
    expect(!!modalFactory).toBe(true);
  });

});
