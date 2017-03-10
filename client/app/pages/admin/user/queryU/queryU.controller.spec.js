'use strict';

describe('Controller: QueryUCtrl', function () {

  // load the controller's module
  beforeEach(module('nixApp'));

  var QueryUCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QueryUCtrl = $controller('QueryUCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
