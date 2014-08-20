'use strict';

describe('Service: modalPenggajianFactory', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var modalPenggajianFactory;
  beforeEach(inject(function (_modalPenggajianFactory_) {
    modalPenggajianFactory = _modalPenggajianFactory_;
  }));

  it('should do something', function () {
    expect(!!modalPenggajianFactory).toBe(true);
  });

});
