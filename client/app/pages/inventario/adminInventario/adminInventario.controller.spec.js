'use strict';

describe('Component: AdminInventarioComponent', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var AdminInventarioComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AdminInventarioComponent = $componentController('AdminInventarioComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
