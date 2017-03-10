'use strict';

describe('Service: bifrost', function () {

  // load the service's module
  beforeEach(module('nixApp'));

  // instantiate service
  var bifrost;
  beforeEach(inject(function (_bifrost_) {
    bifrost = _bifrost_;
  }));

  it('should do something', function () {
    expect(!!bifrost).toBe(true);
  });

});
