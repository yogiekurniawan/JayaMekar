'use strict';

describe('Service: $indexedDB', function () {

  // load the service's module
  beforeEach(module('jayaMekarApp'));

  // instantiate service
  var $indexedDB;
  beforeEach(inject(function (_$indexedDB_) {
    $indexedDB = _$indexedDB_;
  }));

  it('should do something', function () {
    expect(!!$indexedDB).toBe(true);
  });

});
