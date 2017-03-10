'use strict';

describe('Service: XLSXReaderService', function () {

  // load the service's module
  beforeEach(module('nixApp'));

  // instantiate service
  var excel;
  beforeEach(inject(function (_excel_) {
    excel = _excel_;
  }));

  it('should do something', function () {
    expect(!!excel).toBe(true);
  });

});
