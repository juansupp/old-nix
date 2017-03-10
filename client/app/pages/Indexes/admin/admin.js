'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.admin', {
        url: '/admin',
        templateUrl: 'app/pages/Indexes/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
