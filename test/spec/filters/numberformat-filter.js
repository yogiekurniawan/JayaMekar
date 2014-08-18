'use strict';

describe('Filter: numberFormatFilter', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var numberFormatFilter;
  beforeEach(inject(function ($filter) {
    numberFormatFilter = $filter('numberFormatFilter');
  }));

  it('should return the input prefixed with "numberFormatFilter filter:"', function () {
    var text = 'angularjs';
    expect(numberFormatFilter(text)).toBe('numberFormatFilter filter: ' + text);
  });

});
