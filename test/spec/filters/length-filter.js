'use strict';

describe('Filter: lengthFilter', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var lengthFilter;
  beforeEach(inject(function ($filter) {
    lengthFilter = $filter('lengthFilter');
  }));

  it('should return the input prefixed with "lengthFilter filter:"', function () {
    var text = 'angularjs';
    expect(lengthFilter(text)).toBe('lengthFilter filter: ' + text);
  });

});
