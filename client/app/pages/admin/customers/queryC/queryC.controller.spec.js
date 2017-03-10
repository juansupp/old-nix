'use strict';

describe('Controller: QueryCCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var QueryCCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QueryCCtrl = $controller('QueryCCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
