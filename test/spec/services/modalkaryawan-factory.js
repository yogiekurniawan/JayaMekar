'use strict';

describe('Service: modalKaryawanFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var modalKaryawanFactory;
  beforeEach(inject(function (_modalKaryawanFactory_) {
    modalKaryawanFactory = _modalKaryawanFactory_;
  }));

  it('should do something', function () {
    expect(!!modalKaryawanFactory).toBe(true);
  });

});
