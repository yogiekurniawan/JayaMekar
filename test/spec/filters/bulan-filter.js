'use strict';

describe('Filter: bulanFilter', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var bulanFilter;
  beforeEach(inject(function ($filter) {
    bulanFilter = $filter('bulanFilter');
  }));

  it('should return the input prefixed with "bulanFilter filter:"', function () {
    var text = 'angularjs';
    expect(bulanFilter(text)).toBe('bulanFilter filter: ' + text);
  });

});
