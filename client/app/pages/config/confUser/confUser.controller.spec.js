'use strict';

describe('Controller: ConfUserCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var ConfUserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfUserCtrl = $controller('ConfUserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
