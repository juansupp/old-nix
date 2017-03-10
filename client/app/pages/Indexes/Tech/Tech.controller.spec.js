'use strict';

describe('Controller: TechCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var TechCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TechCtrl = $controller('TechCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
