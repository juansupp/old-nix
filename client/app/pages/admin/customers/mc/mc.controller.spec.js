'use strict';

describe('Controller: McCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var McCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    McCtrl = $controller('McCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
