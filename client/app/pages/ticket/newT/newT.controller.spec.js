'use strict';

describe('Component: NewTComponent', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var NewTComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NewTComponent = $componentController('NewTComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
