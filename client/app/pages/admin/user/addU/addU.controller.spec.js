'use strict';

describe('Controller: AddUCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var AddUCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddUCtrl = $controller('AddUCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
