'use strict';

describe('Filter: eksperiment', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var eksperiment;
  beforeEach(inject(function ($filter) {
    eksperiment = $filter('eksperiment');
  }));

  it('should return the input prefixed with "eksperiment filter:"', function () {
    var text = 'angularjs';
    expect(eksperiment(text)).toBe('eksperiment filter: ' + text);
  });

});
