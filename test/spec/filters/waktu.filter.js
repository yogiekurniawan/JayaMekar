'use strict';

describe('Filter: waktu', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var waktu;
  beforeEach(inject(function ($filter) {
    waktu = $filter('waktu');
  }));

  it('should return the input prefixed with "waktu filter:"', function () {
    var text = 'angularjs';
    expect(waktu(text)).toBe('waktu filter: ' + text);
  });

});
