'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.newT', {
        url: '/newT',
        templateUrl: 'app/pages/ticket/newT/newT.html',
        controller: 'newTCtrl',
        controllerAs : 'vmnt'
      });
  });
