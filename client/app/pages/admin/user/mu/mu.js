'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.mu', {
        templateUrl: 'app/pages/admin/user/mu/mu.html',
        controller: 'MuCtrl'
      });
  });
