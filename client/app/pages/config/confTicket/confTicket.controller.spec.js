'use strict';

describe('Controller: ConfTicketCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var ConfTicketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfTicketCtrl = $controller('ConfTicketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
