'use strict';

describe('Filter: sumByKeyFilter', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var sumByKeyFilter;
  beforeEach(inject(function ($filter) {
    sumByKeyFilter = $filter('sumByKeyFilter');
  }));

  it('should return the input prefixed with "sumByKeyFilter filter:"', function () {
    var text = 'angularjs';
    expect(sumByKeyFilter(text)).toBe('sumByKeyFilter filter: ' + text);
  });

});
