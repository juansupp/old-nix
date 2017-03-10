'use strict';

describe('Controller: AdminTicketCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var AdminTicketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminTicketCtrl = $controller('AdminTicketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
