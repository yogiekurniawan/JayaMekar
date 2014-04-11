'use strict';

describe('Service: layananData', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var layananData;
  beforeEach(inject(function (_layananData_) {
    layananData = _layananData_;
  }));

  it('should do something', function () {
    expect(!!layananData).toBe(true);
  });

});
