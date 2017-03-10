'use strict';

describe('Controller: PerfilCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var PerfilCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PerfilCtrl = $controller('PerfilCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
