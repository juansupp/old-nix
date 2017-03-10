'use strict';

describe('Component: HojaVidaComponent', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var HojaVidaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    HojaVidaComponent = $componentController('HojaVidaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
