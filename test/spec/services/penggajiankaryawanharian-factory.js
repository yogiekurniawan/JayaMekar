'use strict';

describe('Service: penggajianKaryawanHarianFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var penggajianKaryawanHarianFactory;
  beforeEach(inject(function (_penggajianKaryawanHarianFactory_) {
    penggajianKaryawanHarianFactory = _penggajianKaryawanHarianFactory_;
  }));

  it('should do something', function () {
    expect(!!penggajianKaryawanHarianFactory).toBe(true);
  });

});
