'use strict';

describe('Service: send', function () {

  // load the service's module
  beforeEach(module('nixApp'));

  // instantiate service
  var send;
  beforeEach(inject(function (_send_) {
    send = _send_;
  }));

  it('should do something', function () {
    expect(!!send).toBe(true);
  });

});
