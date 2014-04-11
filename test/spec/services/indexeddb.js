'use strict';

describe('Service: indexeddb', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var indexeddb;
  beforeEach(inject(function (_indexeddb_) {
    indexeddb = _indexeddb_;
  }));

  it('should do something', function () {
    expect(!!indexeddb).toBe(true);
  });

});
