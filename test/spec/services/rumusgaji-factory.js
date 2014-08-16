'use strict';

describe('Service: rumusGajiFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var rumusGajiFactory;
  beforeEach(inject(function (_rumusGajiFactory_) {
    rumusGajiFactory = _rumusGajiFactory_;
  }));

  it('should do something', function () {
    expect(!!rumusGajiFactory).toBe(true);
  });

});
