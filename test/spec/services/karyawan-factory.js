'use strict';

describe('Service: karyawanFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var karyawanFactory;
  beforeEach(inject(function (_karyawanFactory_) {
    karyawanFactory = _karyawanFactory_;
  }));

  it('should do something', function () {
    expect(!!karyawanFactory).toBe(true);
  });

});
