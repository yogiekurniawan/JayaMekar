'use strict';

describe('Service: indexeddb2', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var indexeddb2;
  beforeEach(inject(function (_indexeddb2_) {
    indexeddb2 = _indexeddb2_;
  }));

  it('should do something', function () {
    expect(!!indexeddb2).toBe(true);
  });

});
