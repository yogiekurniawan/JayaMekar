'use strict';

describe('Filter: kelompokKerja', function () {

  // load the filter's module
  beforeEach(module('jayaMekarApp'));

  // initialize a new instance of the filter before each test
  var kelompokKerja;
  beforeEach(inject(function ($filter) {
    kelompokKerja = $filter('kelompokKerja');
  }));

  it('should return the input prefixed with "kelompokKerja filter:"', function () {
    var text = 'angularjs';
    expect(kelompokKerja(text)).toBe('kelompokKerja filter: ' + text);
  });

});
