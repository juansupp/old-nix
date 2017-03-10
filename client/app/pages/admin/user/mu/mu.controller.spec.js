'use strict';

describe('Controller: MuCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var MuCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MuCtrl = $controller('MuCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
