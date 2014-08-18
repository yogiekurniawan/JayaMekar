'use strict';

describe('Filter: startArrayFilter', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var startArrayFilter;
  beforeEach(inject(function ($filter) {
    startArrayFilter = $filter('startArrayFilter');
  }));

  it('should return the input prefixed with "startArrayFilter filter:"', function () {
    var text = 'angularjs';
    expect(startArrayFilter(text)).toBe('startArrayFilter filter: ' + text);
  });

});
