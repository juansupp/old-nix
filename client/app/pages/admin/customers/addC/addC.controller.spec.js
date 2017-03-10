'use strict';

describe('Controller: AddCCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var AddCCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddCCtrl = $controller('AddCCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
