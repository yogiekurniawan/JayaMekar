'use strict';

describe('Service: kalkulasiPenggajianFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var kalkulasiPenggajianFactory;
  beforeEach(inject(function (_kalkulasiPenggajianFactory_) {
    kalkulasiPenggajianFactory = _kalkulasiPenggajianFactory_;
  }));

  it('should do something', function () {
    expect(!!kalkulasiPenggajianFactory).toBe(true);
  });

});
