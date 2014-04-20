'use strict';

describe('Service: ykValue', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var ykValue;
  beforeEach(inject(function (_ykValue_) {
    ykValue = _ykValue_;
  }));

  it('should do something', function () {
    expect(!!ykValue).toBe(true);
  });

});
