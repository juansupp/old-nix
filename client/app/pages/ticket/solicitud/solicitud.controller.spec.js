'use strict';

describe('Controller: SolicitudCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var SolicitudCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitudCtrl = $controller('SolicitudCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
