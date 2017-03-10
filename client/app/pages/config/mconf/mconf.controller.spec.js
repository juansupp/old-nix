'use strict';

describe('Controller: MconfCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var MconfCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MconfCtrl = $controller('MconfCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
