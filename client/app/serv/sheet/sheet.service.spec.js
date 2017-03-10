'use strict';

describe('Service: sheet', function() {
  // load the service's module
  beforeEach(module('nixApp'));

  // instantiate service
  var sheet;
  beforeEach(inject(function(_sheet_) {
    sheet = _sheet_;
  }));

  it('should do something', function() {
    expect(!!sheet).toBe(true);
  });
});
