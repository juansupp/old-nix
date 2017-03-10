'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.mc', {
        templateUrl: 'app/pages/admin/customers/mc/mc.html',
        controller: 'McCtrl'
      });
  });
