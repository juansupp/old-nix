'use strict';

describe('Component: AdminTComponent', function() {
  // load the controller's module
  beforeEach(module('nixApp'));

  var AdminTComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AdminTComponent = $componentController('adminT', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
