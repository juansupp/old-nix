'use strict';

describe('Controller: NewTicketCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var NewTicketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewTicketCtrl = $controller('NewTicketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
