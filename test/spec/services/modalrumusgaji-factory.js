'use strict';

describe('Service: modalrumusgajiFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var modalrumusgajiFactory;
  beforeEach(inject(function (_modalrumusgajiFactory_) {
    modalrumusgajiFactory = _modalrumusgajiFactory_;
  }));

  it('should do something', function () {
    expect(!!modalrumusgajiFactory).toBe(true);
  });

});
